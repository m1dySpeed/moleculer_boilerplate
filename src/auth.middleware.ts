import { ActionHandler, ActionSchema, Context } from 'moleculer';
import { ReqAuthMeta } from './services/restGateway/interfaces';

export const AuthMiddleware = {
  localAction(next: ActionHandler, action: ActionSchema) {
    return async function (ctx: Context<any, ReqAuthMeta>) {};
  },
};
