import { DB_URL } from '../global.config';
import SqlAdapter from 'moleculer-db-adapter-sequelize';
import DbService from 'moleculer-db';

export function createDbMixin(model) {
  return {
    name: model.name,
    adapter: new SqlAdapter(DB_URL),
    model,
    mixins: [DbService],
  };
}
