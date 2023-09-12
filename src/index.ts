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

  server.on('listening', () => {
    console.info(`Server started and is listening on ${config.hostname}:${config.port}`);
  });

  server.on('error', (err: unknown) => {
    console.error('Server did not start properly.', { err });

    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
};

start({ port: serverConfig.port, hostname: serverConfig.hostname });
