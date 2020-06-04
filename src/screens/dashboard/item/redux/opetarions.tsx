import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { addNewItem, deleteItem, editItem, getAllItems } from "../services";
import { addNewItemAction, deleteItemAction, editItemAction, getAllItemsAction, setListItemsAction } from "./actions";

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

function* addNewItemActionWatcher() {
  yield takeLatest(addNewItemAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { sale, sellingPrice, productId } = payload;
      const result = yield call(addNewItem, sale, sellingPrice, productId);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.item);
        data.data.unshift(result.data);
        yield put(setListItemsAction(data.data));
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

function* editItemActionWatcher() {
  yield takeLatest(editItemAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id, sale, sellingPrice, productId } = payload;
      const result = yield call(editItem, id, sale, sellingPrice, productId);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.product);
        data.data.map(x => {
          if (x.id === id) {
            x.name = name;
            x.sale = sale;
            x.sellingPrice = sellingPrice;
            x.productId = productId;
          }
        });
        yield put(setListItemsAction(data.data));
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

function* deleteItemActionWatcher() {
  yield takeLatest(deleteItemAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id } = payload;
      const result = yield call(deleteItem, id);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.item);
        console.log(data);
        if (data) {
          data.data.map((x, index) => {
            if (x.id === id) {
              data.data.splice(index, 1);
            }
          });
        }
        yield put(setListItemsAction(data.data));
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

export default { getAllItemsActionWatcher, addNewItemActionWatcher, editItemActionWatcher, deleteItemActionWatcher };
