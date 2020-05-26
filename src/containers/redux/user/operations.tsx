import { push } from "connected-react-router";
import {
  logErrorAction,
  offLoadingAction,
  onLoadingAction,
  offLoadingDataAction,
  nextPageAction,
} from "containers/redux/actions";
import localStorage from "redux-persist/es/storage";
import { call, put, takeLatest, delay, cancelled } from "redux-saga/effects";
import { sendVerifyCode, reSendVerifyCode, reSendVerifyCodeSignUp } from "screens/auth/login/services";
import { authTwo, resendCode, setUserAction, signUpResendCode } from "./actions";
import { editUserInformation } from "screens/company/dashboard/ducks/actions";
import { getProfileAction } from "screens/individual/settings/ducks/actions";
function* verifyCodeWatcher() {
  yield takeLatest(authTwo, function* ({ payload }) {
    try {
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const isRememberMe = localStorage.getItem("remember_me");
      const { uuid, username, access_token } = payload;
      const response = yield call(sendVerifyCode, uuid, username, access_token);
      if (response && response.apikey && response.apisecret) {
        const userInfo = {
          username,
          uuid,
          user_id: response.user_id,
          apikey: response.apikey,
          apisecret: response.apisecret,
          company_id: response.company_id === "" ? null : response.company_id
        };
        yield put(setUserAction(userInfo));
        if (isRememberMe) {
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
        const role = yield localStorage.getItem("role");
        const dashboardInfo = {
          isCompleted: userInfo.company_id !== null ? true : false,
          isStep1: userInfo.company_id === null ? true : false,
          isStep2: userInfo.company_id === null ? false : true
        };
        yield put(editUserInformation(dashboardInfo));
        yield put(getProfileAction(response.user_id));
        if (role === "admin") {
          yield put(push("/company/dashboard"));
        } else {
          yield put(push("/individual/dashboard"));
        }
        yield put(offLoadingAction());
      }
      if (response.error) {
        if (response.error.indexOf("user already exists") !== -1) {
          yield put(logErrorAction(true, "user already exists"));
        }
        yield put(logErrorAction(true, ""));
      }
    } catch (error) {
      yield put(offLoadingAction());
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingAction());
      yield put(offLoadingDataAction());
    }
  });
}

function* resendCodeWatcher() {
  yield takeLatest(resendCode, function* ({ payload }) {
    try {
      yield put(onLoadingAction());
      const { uuid, username, isCompany } = payload;
      const result = yield call(reSendVerifyCode, uuid, username);
      const role = localStorage.getItem("role");
      if (result && result.uuid) {
        const userInfo = yield localStorage.getItem("userInfo");
        if (userInfo) {
          let user = JSON.parse(userInfo);
          user && user.sms_count ? user.sms_count = result["2fa_count"] : null;
          localStorage.setItem("userInfo", JSON.stringify(user));
        }
        if (result["2fa_count"] === 0) {
          localStorage.setItem("userInfo", null);
          sessionStorage.setItem("userInfo", null);
          if (isCompany) {
            yield put(push("/company/login"));
          } else {
            yield put(push(`/${role}/login`));
          }
          return;
        }
        yield put(offLoadingAction());
      } else {
        if (result.error) {
          localStorage.setItem("userInfo", null);
          sessionStorage.setItem("userInfo", null);
          if (isCompany) {
            yield put(push("/company/login"));
          } else {
            yield put(push(`/${role}/login`));
          }
          return;
        }
      }
    } catch (error) {
      yield put(offLoadingAction());
      if (error.data) {
        localStorage.setItem("userInfo", null);
        sessionStorage.setItem("userInfo", null);
        yield put(push("/"));
        return;
      }
      // yield put(logErrorAction(true, ''));
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* resendCodeSignupWatcher() {
  yield takeLatest(signUpResendCode, function* ({ payload }) {
    try {
      yield put(onLoadingAction());
      const { uuid } = payload;
      const result = yield call(reSendVerifyCodeSignUp, uuid);
      if (result && result.uuid) {
        const userInfo = yield localStorage.getItem("userInfo");
        if (userInfo) {
          let user = JSON.parse(userInfo);
          user && user.sms_count ? user.sms_count = result["2fa_count"] : null;
          localStorage.setItem("userInfo", JSON.stringify(user));
        }
        if (result.sms_count === 0) {
          localStorage.setItem("userInfo", null);
          sessionStorage.setItem("userInfo", null);
          yield put(push("/home"));
          return;
        }
        yield put(offLoadingAction());
      }
    } catch (error) {
      yield put(offLoadingAction());
      if (error.data) {
        localStorage.setItem("userInfo", null);
        sessionStorage.setItem("userInfo", null);
        yield put(logErrorAction(false, ''));
        yield put(push("/home"));
        return;
      }
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* logErrActionWatcher() {
  yield takeLatest(logErrorAction, function* ({ payload }) {
    try {
      const { errorMessShow } = payload;
      if (errorMessShow) {
        yield delay(5000);
        yield put(logErrorAction(false, ""));
      }

    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield cancelled();
    }
  });
}
function* nextPageChangeWatcher() {
  yield takeLatest(nextPageAction, function* ({ payload }) {
    try {
      const { pageEndPoint } = payload;
      sessionStorage.setItem("invoiceWorkflow", null);
      yield put(push(pageEndPoint));
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield cancelled();
    }
  });
}


export default {
  verifyCodeWatcher,
  resendCodeWatcher,
  resendCodeSignupWatcher,
  logErrActionWatcher,
  nextPageChangeWatcher
};
