'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Toaster } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import type { EmailRenderingResult } from '../../../actions/render-email-by-path';
import { CodeContainer } from '../../../components/code-container';
import {
  ResizableWarpper,
  makeIframeDocumentBubbleEvents,
} from '../../../components/resizable-wrapper';
import { Shell } from '../../../components/shell';
import { Tooltip } from '../../../components/tooltip';
import { useClampedState } from '../../../hooks/use-clamped-state';
import { useEmailRenderingResult } from '../../../hooks/use-email-rendering-result';
import { useHotreload } from '../../../hooks/use-hot-reload';
import { useRenderingMetadata } from '../../../hooks/use-rendering-metadata';
import { RenderingError } from './rendering-error';
import { flushSync } from 'react-dom';

interface PreviewProps {
  slug: string;
  emailPath: string;
  pathSeparator: string;
  serverRenderingResult: EmailRenderingResult;
}

const Preview = ({
  slug,
  emailPath,
  pathSeparator,
  serverRenderingResult,
}: PreviewProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeView = searchParams.get('view') ?? 'preview';
  const activeLang = searchParams.get('lang') ?? 'jsx';

  const renderingResult = useEmailRenderingResult(
    emailPath,
    serverRenderingResult,
  );

  const renderedEmailMetadata = useRenderingMetadata(
    emailPath,
    renderingResult,
    serverRenderingResult,
  );

  if (process.env.NEXT_PUBLIC_IS_BUILDING !== 'true') {
    // this will not change on runtime so it doesn't violate
    // the rules of hooks
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHotreload((changes) => {
      const changeForThisEmail = changes.find((change) =>
        change.filename.includes(slug),
      );

      if (typeof changeForThisEmail !== 'undefined') {
        if (changeForThisEmail.event === 'unlink') {
          router.push('/');
        }
      }
    });
  }

  const handleViewChange = (view: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('view', view);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLangChange = (lang: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('view', 'source');
    params.set('lang', lang);
    router.push(`${pathname}?${params.toString()}`);
  };

  const hasNoErrors = typeof renderedEmailMetadata !== 'undefined';

  let maxWidth = Number.POSITIVE_INFINITY;
  let maxHeight = Number.POSITIVE_INFINITY;
  const minWidth = 350;
  const minHeight = 600;
  const storedWidth = searchParams.get('width');
  const storedHeight = searchParams.get('height');
  const [width, setWidth] = useClampedState(
    storedWidth ? Number.parseInt(storedWidth) : 600,
    350,
    Number.POSITIVE_INFINITY,
  );
  const [height, setHeight] = useClampedState(
    storedHeight ? Number.parseInt(storedHeight) : 1024,
    600,
    Number.POSITIVE_INFINITY,
  );

  const handleSaveViewSize = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set('width', width.toString());
    params.set('height', height.toString());
    router.push(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Shell
      activeView={activeView}
      currentEmailOpenSlug={slug}
      markup={renderedEmailMetadata?.markup}
      pathSeparator={pathSeparator}
      setActiveView={handleViewChange}
      setViewHeight={(height) => {
        setHeight(height);
        flushSync(() => {
          handleSaveViewSize();
        });
      }}
      setViewWidth={(width) => {
        setWidth(width);
        flushSync(() => {
          handleSaveViewSize();
        });
      }}
      viewHeight={height}
      viewWidth={width}
    >
      {/* This relative is so that when there is any error the user can still switch between emails */}
      <div
        className="relative flex h-full"
        ref={(element) => {
          if (element) {
            maxWidth = element?.clientWidth;
            maxHeight = element?.clientWidth;
          }
        }}
      >
        {'error' in renderingResult ? (
          <RenderingError error={renderingResult.error} />
        ) : null}

        {hasNoErrors ? (
          <>
            {activeView === 'preview' && (
              <ResizableWarpper
                minHeight={minHeight}
                minWidth={minWidth}
                maxHeight={maxHeight}
                maxWidth={maxWidth}
                height={height}
                onResizeEnd={() => {
                  handleSaveViewSize();
                }}
                onResize={(difference, direction) => {
                  switch (direction) {
                    case 'north':
                      setHeight((h) => h + 2 * difference);
                      break;
                    case 'south':
                      setHeight((h) => h + 2 * difference);
                      break;
                    case 'east':
                      setWidth((w) => w + 2 * difference);
                      break;
                    case 'west':
                      setWidth((w) => w + 2 * difference);
                      break;
                  }
                }}
                width={width}
              >
                <iframe
                  className="max-h-full rounded-lg bg-white"
                  ref={(iframe) => {
                    if (iframe) {
                      return makeIframeDocumentBubbleEvents(iframe);
                    }
                  }}
                  srcDoc={renderedEmailMetadata.markup}
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                  }}
                  title={slug}
                />
              </ResizableWarpper>
            )}

            {activeView === 'source' && (
              <div className="mx-auto flex max-w-3xl gap-6 p-6">
                <Tooltip.Provider>
                  <CodeContainer
                    activeLang={activeLang}
                    markups={[
                      {
                        language: 'jsx',
                        content: renderedEmailMetadata.reactMarkup,
                      },
                      {
                        language: 'markup',
                        content: renderedEmailMetadata.markup,
                      },
                      {
                        language: 'markdown',
                        content: renderedEmailMetadata.plainText,
                      },
                    ]}
                    setActiveLang={handleLangChange}
                  />
                </Tooltip.Provider>
              </div>
            )}
          </>
        ) : null}

        <Toaster />
      </div>
    </Shell>
  );
};

export default Preview;
