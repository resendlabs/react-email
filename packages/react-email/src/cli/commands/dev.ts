import fs from 'node:fs';
import { startDevServer, setupHotreloading } from '../utils';

interface Args {
  dir: string;
  port: string;
  skipInstall: boolean;
}

export const dev = async ({ dir: emailsDirRelativePath, port }: Args) => {
  try {
    if (!fs.existsSync(emailsDirRelativePath)) {
      throw new Error(`Missing ${emailsDirRelativePath} folder`);
    }

    const devServer = await startDevServer(
      emailsDirRelativePath,
      parseInt(port),
    );

    setupHotreloading(devServer, emailsDirRelativePath);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
