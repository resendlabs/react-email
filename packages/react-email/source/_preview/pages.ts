export const pages = [
  {
    title: '_app.tsx',
    content:
      "import '../styles/globals.css';\nimport type { AppProps } from 'next/app';\nimport { Inter } from '@next/font/google';\nimport classnames from 'classnames';\nimport Head from 'next/head';\n\nconst inter = Inter({\n  subsets: ['latin'],\n  variable: '--font-inter',\n});\n\nfunction MyApp({ Component, pageProps }: AppProps) {\n  return (\n    <div className={classnames(inter.variable, 'font-sans')}>\n      <Head>\n        <title>React Email</title>\n        <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n        <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" />\n        <link\n          href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap\"\n          rel=\"stylesheet\"\n        />\n      </Head>\n      <Component {...pageProps} />\n    </div>\n  );\n}\n\nexport default MyApp;\n",
  },
  {
    title: '_document.tsx',
    content:
      'import { Html, Head, Main, NextScript } from \'next/document\';\n\nexport default function Document() {\n  return (\n    <Html lang="en">\n      <Head />\n      <body className="bg-black text-slate-12 font-sans">\n        <Main />\n        <NextScript />\n      </body>\n    </Html>\n  );\n}\n',
  },
  {
    title: 'index.tsx',
    content:
      "import { promises as fs } from 'fs';\nimport path from 'path';\nimport { Heading } from '../components';\nimport { Layout } from '../components/layout';\n\ninterface HomeProps {}\n\nexport const CONTENT_DIR = 'emails';\n\nconst getEmails = async () => {\n  const emailsDirectory = path.join(process.cwd(), CONTENT_DIR);\n  const filenames = await fs.readdir(emailsDirectory);\n  const emails = filenames.map((file) => file.replace('.tsx', ''));\n\n  return emails;\n};\n\nexport async function getStaticProps({ params }) {\n  try {\n    const emails = await getEmails();\n    return emails ? { props: { navItems: emails } } : { notFound: true };\n  } catch (error) {\n    console.error(error);\n    return { notFound: true };\n  }\n}\n\nconst Home: React.FC<Readonly<HomeProps>> = ({ navItems }: any) => {\n  return (\n    <Layout navItems={navItems}>\n      <Heading>Hi</Heading>\n    </Layout>\n  );\n};\n\nexport default Home;\n",
  },
  {
    dir: 'preview',
    title: '[slug].tsx',
    content:
      "import { promises as fs } from 'fs';\nimport path from 'path';\nimport { render } from '@react-email/render';\nimport { GetStaticPaths } from 'next';\nimport { Layout } from '../../components/layout';\nimport * as React from 'react';\nimport { Code } from '../../components';\n\ninterface PreviewProps {}\n\nexport const CONTENT_DIR = 'emails';\n\nconst getEmails = async () => {\n  const emailsDirectory = path.join(process.cwd(), CONTENT_DIR);\n  const filenames = await fs.readdir(emailsDirectory);\n  const emails = filenames.map((file) => file.replace('.tsx', ''));\n\n  return emails;\n};\n\nexport const getStaticPaths: GetStaticPaths = async () => {\n  const emails = await getEmails();\n\n  const paths = emails.map((email) => {\n    return { params: { slug: email } };\n  });\n  return { paths, fallback: true };\n};\n\nexport async function getStaticProps({ params }) {\n  try {\n    const emails = await getEmails();\n    const Email = (await import(`../../../emails/${params.slug}`)).default;\n    const markup = render(<Email />, { pretty: true });\n\n    return emails\n      ? { props: { navItems: emails, slug: params.slug, markup } }\n      : { notFound: true };\n  } catch (error) {\n    console.error(error);\n    return { notFound: true };\n  }\n}\n\nconst Preview: React.FC<Readonly<PreviewProps>> = ({\n  navItems,\n  markup,\n  slug,\n}: any) => {\n  const [viewMode, setViewMode] = React.useState('desktop');\n\n  return (\n    <Layout\n      navItems={navItems}\n      title={slug}\n      viewMode={viewMode}\n      setViewMode={setViewMode}\n    >\n      {viewMode === 'desktop' ? (\n        <iframe srcDoc={markup} width=\"600\" height=\"800\" frameBorder=\"0\" />\n      ) : (\n        <Code>{markup}</Code>\n      )}\n    </Layout>\n  );\n};\n\nexport default Preview;\n",
  },
];
