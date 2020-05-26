import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, takeLatest } from "redux-saga/effects";
import { getAllCustomers } from "../services";
import { getAllCustomersAction, setListCustomersAction } from "./actions";

function* getAllCustomersActionWatcher() {
  yield takeLatest(getAllCustomersAction, function*() {
    try {
      yield put(onLoadingAction());
      const result = yield call(getAllCustomers);
      if (result.success === true) {
        yield put(setListCustomersAction(result.data));
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

export default { getAllCustomersActionWatcher };
