import {
  logErrorAction,
  offLoadingAction,
  onLoadingAction,
  offSuccessAction,
  onSuccessAction
  // onSuccessAction,
  // offSuccessAction
} from "containers/redux/actions";
import { call, put, takeLatest, delay } from "redux-saga/effects";
import {
  getAccountsAction,
  setAccountsAction,
  addBankAccountAction,
  updateBankWalletAccountAction,
  removeAccountAction,
  addWalletAccountAction,
  confirmBankAccountAction,
  resendCodeAddBankAction,
  editWalletAccountAction,
  removeWalletAccountAction
} from "./actions";
import {
  getBankAccounts,
  createBankAccount,
  updateBankWalletAccount,
  removeBankWalletAccount,
  createCryptoWallet,
  createListCryptoWallet,
  bankAccountTwoFA,
  editCryptoWalletAccount,
  removeCryptoAccount
} from "../services";
import { reSendVerifyCode } from "screens/auth/login/services";

function* getListBankWalletAccountsWatcher() {
  yield takeLatest(getAccountsAction, function*({ payload }) {
    try {
      yield put(onLoadingAction());
      const { user_id, callBack } = payload;
      const resultAccounts = yield call(getBankAccounts, user_id);
      if (resultAccounts) {
        yield put(setAccountsAction(resultAccounts.distributions));
        if (callBack) {
          yield call(callBack(true));
        }
      }
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* addBankAccountWatcher() {
  yield takeLatest(addBankAccountAction, function*({ payload }) {
    try {
      yield put(onLoadingAction());
      yield put(offSuccessAction("", false));
      let result = null;
      const { bankDetail, apiEndPoint, callBack } = payload;
      result = yield call(createBankAccount, bankDetail, apiEndPoint);
      if (result && result.isvalid && result.distribution_id) {
        yield put(onSuccessAction(bankDetail.distribution_id ? "Update Bank Success!" : "Created Bank Success!", true));
        yield call(callBack(result.distribution_id));
        yield put(offLoadingAction());
        yield put(offSuccessAction("", false));
      } else {
        let messErr = "";
        if (result.errorMessage.indexOf("already exists") !== -1) {
          messErr = "This Bank Account already exists, Please check again!";
        }
        yield call(callBack(false, messErr ? messErr : null));
      }
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* updateBankWalletAccountWatcher() {
  yield takeLatest(updateBankWalletAccountAction, function*({ payload }) {
    try {
      yield put(onLoadingAction());
      yield put(offSuccessAction("", false));
      let result = null;
      const { accountDetail, callBack } = payload;
      result = yield call(updateBankWalletAccount, accountDetail);
      if (result) {
        yield put(getAccountsAction(accountDetail.user_id));
        yield put(offLoadingAction());
        yield delay(1000);
        yield put(offSuccessAction("", false));
        yield call(callBack(true));
      } else {
        yield put(offLoadingAction());
        yield call(callBack(false));
      }
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* removeBankAccountWatcher() {
  yield takeLatest(removeAccountAction, function*({ payload }) {
    try {
      const { distribution_id, user_id, hideModal } = payload;
      yield put(offSuccessAction("", false));
      yield put(onLoadingAction());
      const result = yield call(removeBankWalletAccount, user_id, distribution_id);
      if (result) {
        yield put(onSuccessAction("Remove Employer Success!", true));
        yield put(offLoadingAction());
        yield delay(1000);
        yield call(hideModal(false, true));
      }
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offSuccessAction("", false));
      yield put(offLoadingAction());
    }
  });
}

function* verifyTwoFaBankAccountWatcher() {
  yield takeLatest(confirmBankAccountAction, function*({ payload }) {
    try {
      yield put(onLoadingAction());
      yield put(offSuccessAction("", false));
      let result = null;
      const { user_id, pending_distribution_id, two_factor_token, callBack } = payload;
      result = yield call(bankAccountTwoFA, user_id, pending_distribution_id, two_factor_token);
      if (result) {
        // yield put(getAccountsAction(user_id, null));
        yield call(callBack(true));
      } else {
        yield call(callBack(false));
      }
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

// Crypto
function* addCryptoWalletWatcher() {
  yield takeLatest(addWalletAccountAction, function*({ payload }) {
    try {
      yield put(onLoadingAction());
      yield put(offSuccessAction("", false));
      let result = null;
      const { walletDetail, callBack, apiEndPoint } = payload;
      if (walletDetail.address_list) {
        result = yield call(createListCryptoWallet, walletDetail, apiEndPoint);
      } else {
        result = yield call(createCryptoWallet, walletDetail, apiEndPoint);
      }
      if (result && result.isvalid && result.distribution_id) {
        yield put(onSuccessAction(result.distribution_id ? "Update Crypto Success!" : "Created Crypto Success!", true));
        yield call(callBack(result.distribution_id));
        yield put(offLoadingAction());
        yield put(offSuccessAction("", false));
      } else {
        let messErr = "";
        if (result.errorMessage.indexOf("already exists") !== -1) {
          messErr = "This Crypto wallet already exists, Please check again!";
        }
        yield call(callBack(false, messErr ? messErr : null));
      }
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* editCryptoWalletWatcher() {
  yield takeLatest(editWalletAccountAction, function*({ payload }) {
    try {
      yield put(onLoadingAction());
      yield put(offSuccessAction("", false));
      let result = null;
      const { walletDetail, callBack } = payload;
      result = yield call(editCryptoWalletAccount, walletDetail);
      if (result) {
        yield put(getAccountsAction(walletDetail.user_id));
        yield put(
          onSuccessAction(
            walletDetail.employer_id ? "Update walletDetail Success!" : "Created walletDetail Success!",
            true
          )
        );
        yield put(offLoadingAction());
        yield delay(1000);
        yield put(offSuccessAction("", false));
        yield call(callBack(true));
      } else {
        yield put(offLoadingAction());
        yield call(callBack(false));
      }
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* removeCryptoWalletWatcher() {
  yield takeLatest(removeWalletAccountAction, function*({ payload }) {
    try {
      const { cryptocurrencywallet_id, user_id, hideModal } = payload;
      yield put(offSuccessAction("", false));
      yield put(onLoadingAction());
      const result = yield call(removeCryptoAccount, user_id, cryptocurrencywallet_id);
      if (result) {
        yield put(offLoadingAction());
        yield delay(1000);
        yield call(hideModal(false, false));
      }
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offSuccessAction("", false));
      yield put(offLoadingAction());
    }
  });
}

// \\

function* resendCodeBankWatcher() {
  yield takeLatest(resendCodeAddBankAction, function*({ payload }) {
    try {
      yield put(onLoadingAction());
      const { uuid, username, callBack } = payload;
      const result = yield call(reSendVerifyCode, uuid, username);
      if (result && result.uuid) {
        yield call(callBack(result["2fa_count"]));
        yield put(offLoadingAction());
      } else {
        yield call(callBack(false));
      }
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

export default {
  getListBankWalletAccountsWatcher,
  addBankAccountWatcher,
  updateBankWalletAccountWatcher,
  removeBankAccountWatcher,
  addCryptoWalletWatcher,
  verifyTwoFaBankAccountWatcher,
  resendCodeBankWatcher,
  editCryptoWalletWatcher,
  removeCryptoWalletWatcher
};
