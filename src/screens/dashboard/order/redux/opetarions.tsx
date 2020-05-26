import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, takeLatest } from "redux-saga/effects";
import { getAllOrder } from "../services";
import { getAllOrderAction, setListOrderAction } from "./actions";

function* getAllOrderActionWatcher() {
  yield takeLatest(getAllOrderAction, function*() {
    try {
      yield put(onLoadingAction());
      const result = yield call(getAllOrder);
      if (result.success === true) {
        yield put(setListOrderAction(result.data));
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

export default { getAllOrderActionWatcher };
