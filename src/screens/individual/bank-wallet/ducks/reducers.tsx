import { handleActions } from "redux-actions";
import {
  setAccountsAction, clearBankAndCryptoDataAction
} from "./actions";

export default handleActions<any>(
  {
    [setAccountsAction.toString()]: (state, { payload }) => ({
      ...state,
      listBankAndWalletAccounts: payload
    }),
    [clearBankAndCryptoDataAction.toString()]: () => ({
      listBankAndWalletAccounts: []
    })
  },
  {
    listBankAndWalletAccounts: [],
    listBankAccounts: [],
    listCryptoWallets: []
  }
);
