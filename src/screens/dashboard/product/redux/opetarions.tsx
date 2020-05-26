import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, takeLatest } from "redux-saga/effects";
import { getAllProduct } from "../services";
import { getAllProductsAction, setListProductsAction } from "./actions";

function* getAllProductsActionWatcher() {
  yield takeLatest(getAllProductsAction, function*() {
    try {
      yield put(onLoadingAction());
      const result = yield call(getAllProduct);
      if (result.success === true) {
        yield put(setListProductsAction(result.data));
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

export default { getAllProductsActionWatcher };
