import winston, { Logger } from 'winston';

export default function logger(level: string): Logger {
  const wlogger = winston.createLogger({
    level,
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

  return wlogger;
}
