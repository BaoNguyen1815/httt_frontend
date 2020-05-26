import { createActions } from "redux-actions";

const actions = createActions({
  // Bank
  GET_ACCOUNTS_ACTION: (user_id, callBack) => ({ user_id, callBack }),
  SET_ACCOUNTS_ACTION: null,
  ADD_BANK_ACCOUNT_ACTION: (bankDetail, apiEndPoint, callBack) => ({ bankDetail, apiEndPoint, callBack }),
  UPDATE_BANK_WALLET_ACCOUNT_ACTION: (accountDetail, callBack) => ({ accountDetail, callBack }),
  EDIT_BANK_ACCOUNT_ACTION: (bankDetail, callBack) => ({ bankDetail, callBack }),
  REMOVE_ACCOUNT_ACTION: (user_id, distribution_id, hideModal) => ({ user_id, distribution_id, hideModal }),
  CONFIRM_BANK_ACCOUNT_ACTION: (user_id, pending_distribution_id, two_factor_token, callBack ) => ({ user_id, pending_distribution_id, two_factor_token, callBack  }),
  // Wallet
  GET_WALLET_ACCOUNTS_ACTION: user_id => ({ user_id }),
  SET_WALLET_ACCOUNTS_ACTION: null,
  ADD_WALLET_ACCOUNT_ACTION: (walletDetail, apiEndPoint, callBack) => ({ walletDetail, apiEndPoint, callBack }),
  EDIT_WALLET_ACCOUNT_ACTION: (walletDetail, callBack) => ({ walletDetail, callBack }),
  REMOVE_WALLET_ACCOUNT_ACTION: (user_id, cryptocurrencywallet_id, hideModal) => ({ user_id, cryptocurrencywallet_id, hideModal }),
  CONFIRM_WALLET_ACCOUNT_ACTION: (user_id, pending_distribution_id, two_factor_token, callBack ) => ({ user_id, pending_distribution_id, two_factor_token, callBack  }),
  CLEAR_BANK_AND_CRYPTO_DATA_ACTION: null,
  RESEND_CODE_ADD_BANK_ACTION: (uuid, username, callBack) => ({ uuid, username, callBack })
});

export const {
  getAccountsAction,
  setAccountsAction,
  addBankAccountAction,
  updateBankWalletAccountAction,
  removeAccountAction,
  confirmBankAccountAction,
  setWalletAccountsAction,
  addWalletAccountAction,
  editWalletAccountAction,
  removeWalletAccountAction,
  confirmWalletAccountAction,
  clearBankAndCryptoDataAction,
  resendCodeAddBankAction
} = actions;
