import {
  logErrorAction,
  offLoadingAction,
  onLoadingAction,
  offSuccessAction
} from "containers/redux/actions";
import { put, takeLatest, call, delay, takeEvery, fork } from "redux-saga/effects";
import {
  uploadDocumentTypeAction, getProfileAdvanceAction, setUserAdvanceAction, addUserAdvanceAction
} from "./actions";
import { uploadIDsByType, userProfileAdvance, uploadMultipleAdvance } from "screens/individual/settings/services";

function* uploadDocByTypeWatcher() {


  yield takeEvery(uploadDocumentTypeAction, function* ({ payload }) {
    try {
      const { user_adv } = payload;
      yield put(onLoadingAction());
      yield put(offSuccessAction("", false));
      yield put(logErrorAction(false, ""));
      const res1 = yield fork(uploadIDsByType, user_adv[0]);
      yield delay(1000);
      const res2 = yield fork(uploadIDsByType, user_adv[1]);
      yield delay(1000);
      const res3 = yield fork(uploadIDsByType, user_adv[2]);
      yield delay(1000);
      const res4 = yield call(uploadIDsByType, user_adv[3]);
      if (res1 && res2 && res3 && res4) {
        console.log("success");
      } else {
        console.log("Err");
      }
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* getProfileAdvWatcher() {
  yield takeLatest(getProfileAdvanceAction, function* ({ payload }) {
    try {
      const user_id = payload;
      yield put(offSuccessAction("", false));
      yield put(logErrorAction(false, ""));
      const result = yield call(userProfileAdvance, user_id);
      if (result && result.user) {
        yield put(setUserAdvanceAction(result.user));
      }
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* addUserAdvWatcher() {
  yield takeLatest(addUserAdvanceAction, function* ({ payload }) {
    try {
      yield put(onLoadingAction());
      const userAdv = payload;
      yield put(logErrorAction(false, ""));
      const result = yield call(uploadMultipleAdvance, userAdv);
      if (result && result.user) {
        yield put(getProfileAdvanceAction(userAdv.user_id));
        // yield put(setUserAdvanceAction(result.user));
      }
    } catch (error) {
      yield put(offLoadingAction());
      // const messageErr = error.response.data.error;
      // if (messageErr) {
      //   yield put(logErrorAction(true, messageErr.substring(messageErr.indexOf(":") + 1)));
      // }
    } finally {
      yield put(offLoadingAction());
    }
  });
};


export default {
  uploadDocByTypeWatcher,
  getProfileAdvWatcher,
  addUserAdvWatcher
};
