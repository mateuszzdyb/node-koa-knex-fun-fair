import Logger from './services/logger';
import httpLoader from './interface/http';
import serverConfig from './config/server';
import PsqlStore from './services/db-stores/psqlStore';

type ListenConfig = {
  port: number;
  hostname: string;
};

const start = async (config: ListenConfig): Promise<void> => {
  const app = await httpLoader();
  const server = app.listen(config.port);

  // Adding to context
  app.context.db = new PsqlStore();
  app.context.logger = Logger(process.env.LOGGER || 'info');

  server.on('listening', () => {
    app.context.logger.info(`Server started and is listening on ${config.hostname}:${config.port}`);
    app.context.logger.debug('debugging logs enabled');
  });

  server.on('error', (err: unknown) => {
    app.context.logger.error('Server did not start properly.', { err });
    app.context.logger.debug('debugging logs enabled');

    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
};

start({ port: serverConfig.port, hostname: serverConfig.hostname });
