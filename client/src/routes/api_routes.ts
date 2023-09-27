const prefix = "api";
const authTag = "auth";
const cardTag = "card";
const currencyTag = "currency";
const storeTag = "store";
const transactionsTag = "transactions";

export const API_PATH = {
  auth: {
    login: `${prefix}/${authTag}/login`,
    register: `${prefix}/${authTag}/register`,
    refresh: `${prefix}/${authTag}/refresh`,
    logout: `${prefix}/${authTag}/logout`,
  },
  card: {
    index: `${prefix}/${cardTag}`
  },
  currency: {
    index: `${prefix}/${currencyTag}`
  },
  store: {
    index: `${prefix}/${storeTag}`
  },
  transactions: {
    deposit: `${prefix}/${transactionsTag}/deposit`,
    withdraw: `${prefix}/${transactionsTag}/withdraw`
  }
};
