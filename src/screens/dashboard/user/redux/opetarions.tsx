import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, takeLatest } from "redux-saga/effects";
import { getAllUsers } from "../services";
import { getAllUsersAction, setListUsersAction } from "./actions";

function* getAllUsersActionWatcher() {
  yield takeLatest(getAllUsersAction, function*() {
    try {
      yield put(onLoadingAction());
      const result = yield call(getAllUsers);
      if (result.success === true) {
        yield put(setListUsersAction(result.data));
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

export default { getAllUsersActionWatcher };
