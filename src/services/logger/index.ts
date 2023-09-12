import winston, { Logger } from 'winston';

const { createLogger, format, transports } = winston;

export default function logger(level: string): Logger {
  const myFormat = format.printf((log) =>
    format
      .colorize()
      .colorize(log.level, `${log.timestamp} - ${log.label} - ${log.level}: ${log.message}`)
  );
  const wlogger = createLogger({
    format: format.combine(format.label({ label: '[server]' }), format.timestamp(), myFormat),
    level,
    transports: [new transports.Console()],
  });

  return wlogger;
}
