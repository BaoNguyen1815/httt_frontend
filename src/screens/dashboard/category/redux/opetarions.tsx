import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { addNewCategory, deleteCategory, editCategory, getAllCategory } from "../services";
import {
  addNewCategoryAction,
  deleteCategoryAction,
  editCategoryAction,
  getAllCategoryAction,
  setListCategoryAction
} from "./actions";

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

function* addNewCategoryActionWatcher() {
  yield takeLatest(addNewCategoryAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { name, description } = payload;
      const result = yield call(addNewCategory, name, description);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.category);
        data.data.unshift(result.data);
        yield put(setListCategoryAction(data.data));
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
  yield takeLatest(editCategoryAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id, name, description } = payload;
      const result = yield call(editCategory, id, name, description);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.category);
        data.data.map(x => {
          if (x.id === id) {
            x.name = name;
            x.description = description;
          }
        });
        yield put(setListCategoryAction(data.data));
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

function* deleteCategoryActionWatcher() {
  yield takeLatest(deleteCategoryAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id } = payload;
      const result = yield call(deleteCategory, id);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.category);
        console.log(data);
        if (data) {
          data.data.map((x, index) => {
            if (x.id === id) {
              data.data.splice(index, 1);
            }
          });
        }
        yield put(setListCategoryAction(data.data));
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
  getAllCategoryActionWatcher,
  addNewCategoryActionWatcher,
  editCategoryActionWatcher,
  deleteCategoryActionWatcher
};
