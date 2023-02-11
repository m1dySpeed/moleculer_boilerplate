import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Context, ServiceBroker } from 'moleculer';
import { RegisterRoutes } from '../../../dist/services/restGateway/routes';
import { authMiddleware } from './auth.middleware';

export async function createHttpServer(broker: ServiceBroker) {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    bodyParser.json({
      limit: '10MB',
    }),
  );
  app.use(cors());
  app.use((req, res, next) => {
    req['ctx'] = Context.create(broker);
    req['broker'] = broker;
    next();
  });
  app.use((req, res, next) => {
    const meta = req['ctx']['meta'];

    req['ctx']['meta'] = { ...meta, clientIp: req['clientIp'] };

    next();
  });

  app.use(authMiddleware);

  RegisterRoutes(app);

  return app;
}
