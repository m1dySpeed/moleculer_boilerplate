import pino, { LogFn } from 'pino';
import { ENVIRONMENT } from './global.config';
import { omit } from 'lodash';

export const loggerOptions = {
  level: ENVIRONMENT === 'develop' ? 'debug' : 'error',
  options: {
    name: 'main',
    formatters: {
      log(object: any): object {
        return {
          ...omit(object, ['ctx']),
        };
      },
    },
    hooks: {
      logMethod(inputArgs: any[], method: LogFn) {
        if (inputArgs.length >= 2) {
          const arg1 = inputArgs.shift();
          const arg2 = inputArgs.shift();

          return method.apply(this, [arg2, arg1, ...inputArgs]);
        }

        return method.apply(this, inputArgs as any);
      },
    },
    prettyPrint: {
      colorize: true,
      translateTime: 'HH:MM:ss',
    },
  },
};
export const logger = (options: any) => {
  const logger = pino(loggerOptions);

  return logger.child({
    ...options,
    project: 'moleculer_boilerplate',
    environment: ENVIRONMENT,
    hostname: `moleculer_boilerplate:${ENVIRONMENT}`,
  });
};
