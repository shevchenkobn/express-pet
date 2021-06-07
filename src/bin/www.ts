import '../import-side-effects';
import { createServer } from 'http';
import { createApp } from '../apis/v1/app';
import { disposeContainer, isContainerCreated } from '../di/container';
import { config, isNotProduction } from '../lib/config';
import { bindOnExitHandler, exitGracefully } from '../lib/exit-handler';
import { logger } from '../lib/logger';

async function main() {
  logger.info(
    (isNotProduction() ? 'Not production' : 'Production') + ' environment'
  );

  const { app } = await createApp();
  if (isContainerCreated()) {
    bindOnExitHandler(() => {
      return disposeContainer();
    });
  }

  const server = createServer(app);
  server.listen(config.port, config.host, () => {
    logger.info(`Listening at ${config.host}:${config.port}`);
  });
}

main().catch((err) => {
  logger.fatal('Process crashed with exception!', err);
  exitGracefully(1);
});
