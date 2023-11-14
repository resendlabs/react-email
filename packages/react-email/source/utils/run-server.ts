import path from 'node:path';
import { findRoot } from '@manypkg/find-root';
import {
  detect as detectPackageManager,
  type PM,
} from 'detect-package-manager';
import shell from 'shelljs';
import { createWatcherInstance, watcher } from './watcher';
import {
  buildProdServer,
  convertToAbsolutePath,
  CURRENT_PATH,
  generateEmailsPreview,
  installDependencies,
  REACT_EMAIL_ROOT,
  startDevServer,
  startProdServer,
  syncPkg,
} from '.';

/**
 * Utility function to run init/sync for the server in dev, build or start mode.
 *
 * @param type - dev | build | start
 * @param dir - Directory in which the emails are located, only for dev and build, unused for start.
 * @param port - The port on which the server will run, only for dev and start, unused for build.
 */
export const setupServer = async (
  type: 'dev' | 'build' | 'start',
  dir: string,
  port: string,
  skipInstall = false,
) => {
  const cwd = await findRoot(CURRENT_PATH).catch(() => ({
    rootDir: CURRENT_PATH,
  }));
  const emailDir = convertToAbsolutePath(dir);
  const packageManager: PM = await detectPackageManager({
    cwd: cwd.rootDir,
  }).catch(() => 'npm');

  // when starting, we dont need to worry about these because it should've already happened during the build stage.
  if (type !== 'start') {
    await generateEmailsPreview(emailDir);
    await syncPkg();
    if (!skipInstall) {
      installDependencies(packageManager);
    }
  }

  if (type === 'dev') {
    const watcherInstance = createWatcherInstance(emailDir);

    startDevServer(packageManager, port);
    watcher(watcherInstance, emailDir);
  } else if (type === 'build') {
    buildProdServer(packageManager);
  } else {
    shell.cd(path.join(REACT_EMAIL_ROOT));

    startProdServer(packageManager, port);
  }
};
