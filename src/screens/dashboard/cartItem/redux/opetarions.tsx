import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, takeLatest } from "redux-saga/effects";
import { getAllItems } from "../services";
import { getAllItemsAction, setListItemsAction } from "./actions";

function* getAllItemsActionWatcher() {
  yield takeLatest(getAllItemsAction, function*() {
    try {
      yield put(onLoadingAction());
      const result = yield call(getAllItems);
      if (result.success === true) {
        yield put(setListItemsAction(result.data));
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

export default { getAllItemsActionWatcher };
