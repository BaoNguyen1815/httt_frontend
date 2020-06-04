import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { addNewCustomer, deleteCustomer, editCustomer, getAllCustomers } from "../services";
import {
  addNewCustomerAction,
  deleteCustomerAction,
  editCustomerAction,
  getAllCustomersAction,
  setListCustomersAction
} from "./actions";

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

function* addNewCustomerActionWatcher() {
  yield takeLatest(addNewCustomerAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { name, phone, age, sex, username, password } = payload;
      const result = yield call(addNewCustomer, name, phone, age, sex, username, password);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.customer);
        data.data.unshift(result.data);
        yield put(setListCustomersAction(data.data));
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

function* editCustomerActionWatcher() {
  yield takeLatest(editCustomerAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id, name, phone, age, sex, username, password } = payload;
      const result = yield call(editCustomer, id, name, phone, age, sex, username, password);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.customer);
        data.data.map(x => {
          if (x.id === id) {
            x.name = name;
            x.phone = phone;
            x.age = age;
            x.sex = sex;
            x.username = username;
            x.password = password;
          }
        });
        yield put(setListCustomersAction(data.data));
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

function* deleteCustomerActionWatcher() {
  yield takeLatest(deleteCustomerAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id } = payload;
      const result = yield call(deleteCustomer, id);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.customer);
        if (data) {
          data.data.map((x, index) => {
            if (x.id === id) {
              data.data.splice(index, 1);
            }
          });
        }
        yield put(setListCustomersAction(data.data));
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
  getAllCustomersActionWatcher,
  addNewCustomerActionWatcher,
  editCustomerActionWatcher,
  deleteCustomerActionWatcher
};
