import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { push } from "react-router-redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { signUp } from "../services";
import { signUpAction } from "./actions";

function* signUpWatcher() {
  yield takeLatest(signUpAction, function*({ payload }: any) {
    const { username, password, fullName, role } = payload;
    try {
      yield put(onLoadingAction());
      const result = yield call(signUp, username, password, fullName, role);
      console.log(result, "1");
      if (result.success) {
        yield put(push("/login"));
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

export default { signUpWatcher };
