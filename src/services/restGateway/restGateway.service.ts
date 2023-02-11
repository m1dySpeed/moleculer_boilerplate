import { logger } from '../../logger';
import { createHttpServer } from './httpServer';
import { HTTP_PORT } from '../../global.config';

module.exports = {
  name: 'restGateway',

  created() {
    Object.assign(this, {
      logger: logger({ name: this.name }),
    });
  },

  async started() {
    const app = await createHttpServer(this.broker);

    app.listen(HTTP_PORT);
  },
};
