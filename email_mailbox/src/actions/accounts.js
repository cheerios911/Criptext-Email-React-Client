import { Account } from './types';
import { defineBadgeAccounts } from './../utils/AccountUtils';

export const updateAccounts = accounts => {
  return {
    type: Account.UPDATE_ACCOUNTS,
    accounts
  };
};

export const reloadAccounts = () => {
  return {
    type: Account.RELOAD_ACCOUNTS
  };
};

export const updateBadgeAccounts = () => {
  return async dispatch => {
    const accounts = await defineBadgeAccounts();
    dispatch(updateAccounts(accounts));
  };
};
