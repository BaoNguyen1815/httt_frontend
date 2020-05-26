import {
  logErrorAction,
  offLoadingAction,
  onLoadingAction,
  onSuccessAction,
  offSuccessAction,
  onLoadingDataAction,
  offLoadingDataAction,
  nextPageAction,
} from "containers/redux/actions";
import { setUserDetailAction } from "containers/redux/user/actions";
import { call, put, takeLatest, delay } from "redux-saga/effects";
import { addFirstProfileBasic, editProfileBasic, userProfileBasic } from "../services";
import {
  setAlertAction,
  setUserSecurityAction,
  alertEmailPreferenceEditAction,
  securityEmailPrivacyEditAction,
  editUserAction,
  getProfileAction,
  updateUserBasicAction,
  changePasswordAction,
  securityAction,
  alertAction,
  updatePhoneUserAction,
  setPhoneUserAction,
  setGauthUserAction
} from "./actions";
import { sendChangePassWord, securityBasic, securityEmailPrivacyEdit } from "../security-setting/services";
import { alertBasic, alertEmailPreference } from "../alert-setting/services";
import { setPhoneUser, updatePhoneUser } from "../verification-setting/services";
import { userGauthSet } from "../api-setting/services";
import { RESPONSE_STATUS } from "containers/contants";
function* getProfileWatcher() {
  yield takeLatest(getProfileAction, function* ({ payload }) {
    try {
      // yield put(onLoadingAction());
      const { user_id, callBack } = payload;
      yield put(logErrorAction(false, ""));
      yield put(offSuccessAction());
      const result = yield call(userProfileBasic, user_id);
      if (result && result.user) {
        yield put(setUserDetailAction(result.user));
        yield call(callBack);
      }
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* editUserDetailWatcher() {
  yield takeLatest(editUserAction, function* ({ payload }) {
    try {
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(addFirstProfileBasic, payload.userDetail);
      if (result) {
        yield put(offLoadingAction());
      }
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* changePasswordWatcher() {
  yield takeLatest(changePasswordAction, function* ({ payload }) {
    try {
      const { user_id, old_password, new_password, new_password_repeat } = payload;
      yield put(onLoadingDataAction());
      yield put(logErrorAction(false, ""));
      yield put(offSuccessAction("", false));
      const result = yield call(sendChangePassWord, user_id, old_password, new_password, new_password_repeat);
      if (result && !result.error) {
        yield put(onSuccessAction("", true));
      } else {
        yield put(logErrorAction(true, ""));
      }
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingDataAction());
    }
  });
}

function* securityWatcher() {
  yield takeLatest(securityAction, function* ({ payload }) {
    try {
      const { user_id } = payload;
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(securityBasic, user_id);
      if (result) {
        yield put(setUserSecurityAction(result.user[0]));
      }
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* updateUserWatcher() {
  yield takeLatest(updateUserBasicAction, function* ({ payload }) {
    try {
      yield put(onLoadingAction());
      yield put(onSuccessAction("", false));
      yield put(logErrorAction(false, ""));
      const result = yield call(editProfileBasic, payload);
      if (result && result.user_id) {
        yield put(onSuccessAction("", true));
        yield put(offLoadingAction());
        delay(200);
        yield put(offSuccessAction());
        if (sessionStorage.getItem("invoiceWorkflow") !== null) {
          yield put(nextPageAction("/individual/create-invoice"));
        }
      } else if (
        result.status === RESPONSE_STATUS.BAD_REQUEST ||
        result.status === RESPONSE_STATUS.INTERNAL_SERVER_ERROR
      ) {
        const messErr = result.error.substring(result.error.indexOf(":") + 1);
        yield put(logErrorAction(true, messErr));
      } else {
        // add case message
      }
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
      delay(200);
      yield put(offSuccessAction());
    }
  });
}

function* alertWatcher() {
  yield takeLatest(alertAction, function* ({ payload }) {
    try {
      const { user_id } = payload;
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(alertBasic, user_id);
      if (result) {
        yield put(setAlertAction(result.user[0]));
      }
    } catch (error) {
      put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingAction());
    }
  });
}


function* updatePhoneWatcher() {
  yield takeLatest(updatePhoneUserAction, function* ({ payload }) {
    try {
      const { user_id, phone_country, phone_number } = payload;
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(updatePhoneUser, user_id, phone_country, phone_number);
      if (result && result.user_id) {
      }
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingAction());
    }
  });
}


function* setPhoneWatcher() {
  yield takeLatest(setPhoneUserAction, function* ({ payload }) {
    try {
      const { user_id, uuid_str, twofa_old, twofa_new_phone } = payload;
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(setPhoneUser, user_id, uuid_str, twofa_old, twofa_new_phone);
      console.log(result);
      if (result && result.user_id) {
      }
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingAction());
    }
  });
}

// function* updateGauthWatcher() {
//   yield takeLatest(updateGauthUserAction, function* ({ payload }) {
//     try {
//       const { user_id, gauth_key } = payload;
//       yield put(onLoadingAction());
//       yield put(logErrorAction(false, ""));
//       const result = yield call(userGauthUpdate, user_id, gauth_key);
//       console.log(result);
//       if (result && result.user_id) {
//         yield put(onSuccessAction("Update Gauth success !", true));
//         yield delay(2000);
//         yield put(offSuccessAction());
//       }
//       yield put(onLoadingAction());
//     } catch (error) {
//       const messageErr = error.response.data.error;
//       if (messageErr) {
//         yield put(logErrorAction(true, messageErr.substring(messageErr.indexOf(":") + 1)));
//       }
//     } finally {
//       yield put(offLoadingAction());
//     }
//   });
// }

function* setGauthWatcher() {
  yield takeLatest(setGauthUserAction, function* ({ payload }) {
    try {
      const { user_id, uuid_str, twofa } = payload;
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(userGauthSet, user_id, uuid_str, twofa);
      if (result && result.user_id) {
      }
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* securityEmailPrivacyEditWatcher() {
  yield takeLatest(securityEmailPrivacyEditAction, function* ({ payload }) {
    try {
      const { user_id, hidepayrolldetails } = payload;
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(securityEmailPrivacyEdit, user_id, hidepayrolldetails);
      if (result && result.user_id) {
      }
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* alertEmailPreferenceEditWatcher() {
  yield takeLatest(alertEmailPreferenceEditAction, function* ({ payload }) {
    try {
      const { user_id, blockemailloginfromnewipaddress } = payload;
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(alertEmailPreference, user_id, blockemailloginfromnewipaddress);
      if (result && result.user_id) {
      }
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingAction());
    }
  });
}

export default {
  getProfileWatcher,
  editUserDetailWatcher,
  updateUserWatcher,
  securityWatcher,
  changePasswordWatcher,
  alertWatcher,
  updatePhoneWatcher,
  setPhoneWatcher,
  setGauthWatcher,
  securityEmailPrivacyEditWatcher,
  alertEmailPreferenceEditWatcher
};
