import { RequestWithMCtx } from './interfaces';
import { User } from '../users/interfaces';
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../../global.config';
import { NextFunction } from 'express';

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}
export async function authMiddleware(req: RequestWithMCtx, res: Response, next: NextFunction) {
  const [type, token] = req.header('authorization')?.split(' ') ?? [];

  if (type !== 'Bearer') {
    throw new Error('UNEXPECTED_TOKEN');
  }

  try {
    const tokenData = checkToken(token);

    const user: User = await req.broker.call('users.get', { id: tokenData.id });

    req.accountId = user.id;

    next();
  } catch (error) {
    req.accountId = undefined;
    next();
  }
}

const checkToken = (token: string) => jwt.verify(token, jwtSecret) as TokenPayload;
