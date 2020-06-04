import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { addNewProduct, deleteProduct, editProduct, getAllProduct } from "../services";
import {
  addNewProductAction,
  deleteProductAction,
  editProductAction,
  getAllProductsAction,
  setListProductsAction
} from "./actions";

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

function* addNewProductActionWatcher() {
  yield takeLatest(addNewProductAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { name, code, description, quantity, price, author, publisher, categoryId } = payload;
      const result = yield call(addNewProduct, name, code, description, quantity, price, author, publisher, categoryId);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.product);
        console.log(result.data, "rê");
        data.data.unshift(result.data);
        yield put(setListProductsAction(data.data));
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

function* editCategoryActionWatcher() {
  yield takeLatest(editProductAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id, name, code, description, quantity, price, author, publisher, categoryId } = payload;
      const result = yield call(
        editProduct,
        id,
        name,
        code,
        description,
        quantity,
        price,
        author,
        publisher,
        categoryId
      );
      if (result && result.success === true) {
        const data = yield select(state => state.screen.product);
        data.data.map(x => {
          if (x.id === id) {
            x.name = name;
            x.code = code;
            x.description = description;
            x.quantity = quantity;
            x.price = price;
            x.author = author;
            x.publisher = publisher;
            x.categoryId = categoryId;
          }
        });
        yield put(setListProductsAction(data.data));
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

function* deleteProductActionWatcher() {
  yield takeLatest(deleteProductAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id } = payload;
      const result = yield call(deleteProduct, id);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.product);
        console.log(data);
        if (data) {
          data.data.map((x, index) => {
            if (x.id === id) {
              data.data.splice(index, 1);
            }
          });
        }
        yield put(setListProductsAction(data.data));
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
  getAllProductsActionWatcher,
  deleteProductActionWatcher,
  editCategoryActionWatcher,
  addNewProductActionWatcher
};
