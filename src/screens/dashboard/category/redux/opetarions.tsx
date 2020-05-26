import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, takeLatest } from "redux-saga/effects";
import { getAllCategory } from "../services";
import { getAllCategoryAction, setListCategoryAction } from "./actions";

function* getAllCategoryActionWatcher() {
  yield takeLatest(getAllCategoryAction, function*() {
    try {
      yield put(onLoadingAction());
      const result = yield call(getAllCategory);
      if (result.success === true) {
        yield put(setListCategoryAction(result.data));
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

export default { getAllCategoryActionWatcher };
