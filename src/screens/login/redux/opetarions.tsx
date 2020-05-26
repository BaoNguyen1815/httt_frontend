import { SYSTEM } from "containers/contants";
import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { push } from "react-router-redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { checkLogin } from "../services";
import { logInAction } from "./actions";

function* logInWatcher() {
  yield takeLatest(logInAction, function*({ payload }: any) {
    const { username, password } = payload;
    console.log(payload);
    try {
      yield put(onLoadingAction());
      const result = yield call(checkLogin, username, password);
      if (result.success === 1) {
        yield localStorage.setItem(SYSTEM.TOKEN, result.access_token);
        yield put(push("/dashboard"));
      } else {
        logError(result.message);
      }
    } catch (error) {
      logError(error);
    } finally {
      yield put(offLoadingAction());
    }
  });
}

export default { logInWatcher };
