export interface Wallet {
  id: string;
  accountId: string;
  balance: string;
  type: WALLET_TYPES;
}

export enum WALLET_TYPES {
  USER = 'USER',
  SUPPLIER = 'SUPPLIER',
}
