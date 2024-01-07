import * as React from 'react';
import { cn } from '@/utils';
import type { EmailsDirectory } from '@/utils/actions/get-emails-directory-metadata';
import { Logo } from './logo';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

type ShellElement = React.ElementRef<'div'>;
type RootProps = React.ComponentPropsWithoutRef<'div'>;

interface ShellProps extends RootProps {
  emailsDirectoryMetadata: EmailsDirectory;
  markup?: string;
  currentEmailOpenSlug?: string;
  activeView?: string;
  setActiveView?: (view: string) => void;
}

export const Shell = React.forwardRef<ShellElement, Readonly<ShellProps>>(
  (
    {
      currentEmailOpenSlug,
      emailsDirectoryMetadata,
      children,
      markup,
      activeView,
      setActiveView,
    },
    forwardedRef,
  ) => {
    const [showNav, setShowNav] = React.useState(false);
    return (
      <div className="flex flex-col h-screen overflow-x-hidden">
        <div className="bg-black flex relative items-center px-6 justify-between h-[70px] border-b border-slate-6">
          <div className="h-[70px] flex items-center">
            <Logo />
          </div>
          <button
            className="bg-transparent h-6 w-6 rounded flex items-center justify-center text-white"
            onClick={() => {
              setShowNav(!showNav);
            }}
            type="button"
          >
            <svg
              fill="none"
              height="16"
              stroke="white"
              viewBox="0 0 15 15"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="flex justify-between h-full" ref={forwardedRef}>
          <Sidebar
            className={cn('w-screen max-w-full md:max-w-[275px]', {
              'translate-x-0': showNav,
              'translate-x-[-100%] lg:translate-x-0 absolute lg:relative':
                !showNav,
            })}
            currentEmailOpenSlug={currentEmailOpenSlug}
            emailsDirectoryMetadata={emailsDirectoryMetadata}
          />
          <main
            className={cn('bg-slate-2', {
              'w-[calc(100%_-_275px)]': showNav,
              'w-screen lg:w-[calc(100%_-_275px)]': !showNav,
            })}
          >
            {currentEmailOpenSlug ? (
              <Topbar
                activeView={activeView}
                currentEmailOpenSlug={currentEmailOpenSlug}
                markup={markup}
                setActiveView={setActiveView}
              />
            ) : null}
            <div className="relative h-[calc(100vh_-_140px)] overflow-auto">
              <div className="mx-auto">{children}</div>
            </div>
          </main>
        </div>
      </div>
    );
  },
);

Shell.displayName = 'Shell';
