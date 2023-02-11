import Sequelize, { UUIDV4 } from 'sequelize';
import { UserRoles } from './interfaces';

export const UsersModel = {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: UUIDV4 },
  firstName: Sequelize.STRING,
  secondName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  role: { type: Sequelize.ENUM, values: Object.values(UserRoles) },
};
