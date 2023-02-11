import { Body, Controller, Delete, Get, Path, Post, Request, Route } from 'tsoa';
import { RequestWithMCtx } from '../interfaces';
import { User } from '../../users/users.model';

@Route('users')
export class UsersController extends Controller {
  @Get('{id}')
  getUser(@Request() req: RequestWithMCtx, @Path() id: string): Promise<User> {
    return req.broker.call('users.get', { id });
  }
  @Post()
  createUser(@Request() req: RequestWithMCtx, @Body() userProps: User): Promise<User> {
    return req.broker.call('users.create', { ...userProps });
  }
  @Path('{id}')
  updateUser(
    @Request() req: RequestWithMCtx,
    @Path() id: string,
    @Body() userProps: User,
  ): Promise<User> {
    return req.broker.call('users.update', { id, ...userProps });
  }
  @Delete('{id}')
  deleteUser(@Request() req: RequestWithMCtx, @Path() id: string): Promise<{ success: boolean }> {
    return req.broker.call('users.deleteUser', { id });
  }
}
