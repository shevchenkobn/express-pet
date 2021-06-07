import '../import-side-effects';
import { config, isNotProduction } from '../lib/config';
import { exitGracefully } from '../lib/exit-handler';
import { logger } from '../lib/logger';

async function main() {
  logger.info(
    (isNotProduction() ? 'Not production' : 'Production') + ' environment'
  );
}

main().catch((err) => {
  logger.fatal('Process crashed with exception!', err);
  exitGracefully(1);
});
