import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { deleteUser, getAllUsers } from "../services";
import { deleteUserAction, getAllUsersAction, setListUsersAction } from "./actions";

function* getAllUsersActionWatcher() {
  yield takeLatest(getAllUsersAction, function*() {
    try {
      yield put(onLoadingAction());
      const result = yield call(getAllUsers);
      if (result.success === true) {
        yield put(setListUsersAction(result.data));
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

function* deleteUserActionWatcher() {
  yield takeLatest(deleteUserAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id } = payload;
      const result = yield call(deleteUser, id);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.customer);
        if (data) {
          data.data.map((x, index) => {
            if (x.id === id) {
              data.data.splice(index, 1);
            }
          });
        }
        yield put(setListUsersAction(data.data));
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

export default { getAllUsersActionWatcher, deleteUserActionWatcher };
