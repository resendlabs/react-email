import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { cliPacakgeLocation } from '../utils';
import { getEnvVariablesForPreviewApp } from '../utils/preview/get-env-variables-for-preview-app';

interface Args {
  dir: string;
  port: string;
  staticLocation: string;
}

const buildPreviewApp = (absoluteDirectory: string) => {
  return new Promise<void>((resolve, reject) => {
    const nextBuild = spawn('npm', ['run', 'build-preview'], {
      cwd: absoluteDirectory,
    });

    nextBuild.stdout.on('data', (msg: Buffer) => {
      process.stderr.write(msg);
    });
    nextBuild.stderr.on('data', (msg: Buffer) => {
      process.stdout.write(msg);
    });

    nextBuild.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    });
  });
}

export const build = async ({
  dir: emailsDirRelativePath,
  staticLocation: staticBaseDirRelativePath,
}: Args) => {
  try {
    if (!fs.existsSync(emailsDirRelativePath)) {
      throw new Error(`Missing ${emailsDirRelativePath} folder`);
    }

    const emailsDirPath = path.join(process.cwd(), emailsDirRelativePath);
    const staticPath = path.join(
      process.cwd(),
      staticBaseDirRelativePath,
      'static',
    );

    const builtPreviewAppPath = path.join(process.cwd(), '.react-email');

    if (fs.existsSync(builtPreviewAppPath)) {
      await fs.promises.rm(builtPreviewAppPath, { recursive: true });
    }

    // this should also come with the node_modules so there's no need to install it again
    await fs.promises.cp(cliPacakgeLocation, builtPreviewAppPath, {
      recursive: true,
      filter: (source: string) => {
        // do not copy the CLI files
        return !source.includes('/cli/') && !source.includes('/.next/');
      }
    });
    const builtEmailsDirectory = path.join(builtPreviewAppPath, 'emails');
    await fs.promises.cp(emailsDirPath, builtEmailsDirectory, {
      recursive: true,
    });
    const builtStaticDirectory = path.resolve(
      builtPreviewAppPath,
      './public/static',
    );
    await fs.promises.cp(staticPath, builtStaticDirectory, { recursive: true });

    const envVariables = {
      ...getEnvVariablesForPreviewApp('emails', 'PLACEHOLDER', 'PLACEHOLDER'),
      NEXT_PUBLIC_DISABLE_HOT_RELOADING: 'true',
    };
    const nextConfigContents = `/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    ...${JSON.stringify(envVariables)},
    NEXT_PUBLIC_USER_PROJECT_LOCATION: process.cwd(),
    NEXT_PUBLIC_CLI_PACKAGE_LOCATION: process.cwd(),
  },
  // this is needed so that the code for building emails works properly
  webpack: (
    /** @type {import('webpack').Configuration & { externals: string[] }} */
    config,
    { isServer }
  ) => {
    if (isServer) {
      config.externals.push('esbuild');
    }

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: [
      '@react-email/components',
      '@react-email/render',
      '@react-email/tailwind',
    ],
  },
  transpilePackages: [
    '@react-email/components',
    '@react-email/render',
    '@react-email/tailwind',
  ],
}`;
    await fs.promises.writeFile(
      path.resolve(builtPreviewAppPath, './next.config.js'),
      nextConfigContents,
      'utf8',
    );

    await buildPreviewApp(builtPreviewAppPath);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
