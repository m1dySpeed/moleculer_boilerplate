import { createDbMixin } from '../../mixins/db.mixin';
import { WalletsModel } from './wallets.model';
import { WALLET_TYPES } from './interfaces';

const WalletsMixin = createDbMixin(WalletsModel);

module.exports = {
  name: 'wallets',
  mixins: [WalletsMixin],
  settings: {
    fields: ['id', 'accountId', 'type', 'balance'],

    entityValidator: {
      id: 'string',
      accountId: 'string',
      type: { type: 'string', enum: Object.values(WALLET_TYPES) },
      balance: 'number',
    },
  },

  /**
   * Action Hooks
   */
  hooks: {},

  /**
   * Actions
   */
  actions: {},

  /**
   * Methods
   */
  methods: {},
};
