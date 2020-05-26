import {
  logErrorAction,
  offLoadingAction,
  onLoadingAction,
  onSuccessAction,
} from "containers/redux/actions";
import { call, put, takeLatest } from "redux-saga/effects";
// import { RESPONSE_STATUS } from "containers/contants";
import { updateGauthUserAction, getUserSessionHistory, getUserAlertsHistory, setUserAlertsHistory, setUserSessionHistory, updateUserSmsAction } from "screens/individual/settings/ducks/actions";
import { getSessionHistory, getAlertsHistory, userGauthUpdate, userUpdateSMS } from "../services";

function* getSessionHistoryWatcher() {
  yield takeLatest(getUserSessionHistory, function* ({ payload }) {
    try {
      const user_id = payload;
      yield put(logErrorAction(false, ""));
      const result = yield call(getSessionHistory, user_id);
      if (result && result.session_history) {
        yield put(setUserSessionHistory(result.session_history[0]));
      }
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* getAlertsHistoryWatcher() {
  yield takeLatest(getUserAlertsHistory, function* ({ payload }) {
    try {
      const user_id = payload;
      yield put(logErrorAction(false, ""));
      const result = yield call(getAlertsHistory, user_id);
      if (result && result.alerts_history) {
        yield put(setUserAlertsHistory(result.alerts_history[0]));
      }
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* updateGauthWatcher() {
  yield takeLatest(updateGauthUserAction, function* ({ payload }) {
    try {
      const { user_id, gauth_key } = payload;
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(userGauthUpdate, user_id, gauth_key);
      if (result && result.user_id) {
      }
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* updateSMSWatcher() {
  yield takeLatest(updateUserSmsAction, function* ({ payload }) {
    try {
      const { user_id, gauth_twofa, turnoffsms } = payload;
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(userUpdateSMS, user_id, gauth_twofa, turnoffsms);
      if (result && !result.error) {
        yield put(onSuccessAction("", true));
      } else {
        yield put(logErrorAction(true, ""));
      }
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingAction());
    }
  });
}

export default {
  getSessionHistoryWatcher,
  getAlertsHistoryWatcher,
  updateGauthWatcher,
  updateSMSWatcher
};
