import { SYSTEM } from "containers/contants";
import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { push } from "react-router-redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { checkLogin, getAccountInfo } from "../services";
import { logInAction, setAccountInfoAction } from "./actions";

function* logInWatcher() {
  yield takeLatest(logInAction, function*({ payload }: any) {
    const { username, password } = payload;
    try {
      yield put(onLoadingAction());
      const result = yield call(checkLogin, username, password);
      console.log(result, "1");
      if (result.success) {
        yield localStorage.setItem(SYSTEM.TOKEN, result.access_token);
        const userInfo = yield call(getAccountInfo, result.access_token);
        yield put(setAccountInfoAction(userInfo.user));
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
