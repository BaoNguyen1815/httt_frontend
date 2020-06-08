import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { addNewShipping, deleteShipping, editShipping, getAllShippings } from "../services";
import {
  addNewShippingAction,
  deleteShippingAction,
  editShippingAction,
  getAllShippingsAction,
  setListShippingsAction
} from "./actions";

function* getAllShippingsActionWatcher() {
  yield takeLatest(getAllShippingsAction, function*() {
    try {
      yield put(onLoadingAction());
      const result = yield call(getAllShippings);
      if (result.success === true) {
        yield put(setListShippingsAction(result.data));
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

function* addNewShippingActionWatcher() {
  yield takeLatest(addNewShippingAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { type, cost } = payload;
      const result = yield call(addNewShipping, type, cost);
      console.log(result);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.shipping);
        data.data.unshift(result.data);
        yield put(setListShippingsAction(data.data));
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

function* editShippingActionWatcher() {
  yield takeLatest(editShippingAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id, type, cost } = payload;
      const result = yield call(editShipping, id, type, cost);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.shipping);
        data.data.map(x => {
          if (x.id === id) {
            x.type = type;
            x.cost = cost;
          }
        });
        yield put(setListShippingsAction(data.data));
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

function* deleteShippingActionWatcher() {
  yield takeLatest(deleteShippingAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id } = payload;
      const result = yield call(deleteShipping, id);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.shipping);
        if (data) {
          data.data.map((x, index) => {
            if (x.id === id) {
              data.data.splice(index, 1);
            }
          });
        }
        yield put(setListShippingsAction(data.data));
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

export default {
  getAllShippingsActionWatcher,
  addNewShippingActionWatcher,
  editShippingActionWatcher,
  deleteShippingActionWatcher
};
