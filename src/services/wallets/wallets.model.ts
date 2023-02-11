import Sequelize, { UUIDV4 } from 'sequelize';

export const WalletsModel = {
  name: 'wallets',
  define: {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: UUIDV4 },
    accountId: { type: Sequelize.STRING, allowNull: false },
    balance: { type: Sequelize.STRING, allowNull: false },
    type: { type: Sequelize.STRING, allowNull: false },
  },
  options: {
    tableName: 'wallets',
  },
};
