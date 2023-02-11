import express from 'express';
import { Context, ServiceBroker } from 'moleculer';
import { User } from '../users/interfaces';

export interface ReqAuthMeta {
  token?: string;
  accountId?: string;
  isGraphQL?: boolean;
  clientIp?: string;
}

export interface RequestMeta {
  user: User;
}
export interface RequestWithMCtx extends express.Request {
  broker: ServiceBroker;
  ctx: Context<any, ReqAuthMeta>;
  accountId?: string;
  clientIp?: string;
  getAccountId(): string | undefined;
}
