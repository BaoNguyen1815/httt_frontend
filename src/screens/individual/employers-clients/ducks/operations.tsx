import {
  logErrorAction,
  offLoadingAction,
  onLoadingAction,
  onSuccessAction,
  offSuccessAction
} from "containers/redux/actions";
import { call, put, takeLatest, delay } from "redux-saga/effects";
import {
  individualGetEmployersAction,
  individualSetBpiContractsAction,
  individualRemoveClientAction,
  individualRemoveEmployerAction,
  individualEditEmployerAction,
  individualGetBpiContractsAction,
  individualEditClientAction,
  individualSetCurrentClientAction
} from "./actions";
import {
  getListEmployers,
  removeClient,
  removeEmployer,
  editEmployer,
  createEmployer,
  getListBpiContracts,
  createClient,
  editClient
} from "../services";

function* getListEmployersWatcher() {
  yield takeLatest(individualGetEmployersAction, function* ({ payload }) {
    try {
      yield put(onLoadingAction());
      const { user_id } = payload;
      yield put(logErrorAction(false, ""));
      const result = yield call(getListEmployers, user_id);
      if (result) {

        yield put(individualSetBpiContractsAction(result));
      }
      yield put(onLoadingAction());
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* getListBpiContractsWatcher() {
  yield takeLatest(individualGetBpiContractsAction, function* ({ payload }) {
    try {

      yield put(onLoadingAction());
      const { user_id } = payload;
      yield put(logErrorAction(false, ""));
      const result = yield call(getListBpiContracts, user_id);
      if (result) {

        yield put(individualSetBpiContractsAction(result));
      }
      yield put(onLoadingAction());
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* deleteClientWatcher() {
  yield takeLatest(individualRemoveClientAction, function* ({ payload }) {
    try {
      const { client_id, user_id, hideModal } = payload;
      yield put(offSuccessAction("", false));
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(removeClient, user_id, client_id);
      if (result) {
        yield put(individualGetBpiContractsAction(user_id));
        yield put(onSuccessAction("Remove Client Success !", true));
        yield put(offLoadingAction());
        yield delay(1000);
        yield call(hideModal);
      }
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offSuccessAction("", false));
      yield put(offLoadingAction());
    }
  });
}

function* deleteEmployerWatcher() {
  yield takeLatest(individualRemoveEmployerAction, function* ({ payload }) {
    try {
      const { employer_id, user_id, hideModal } = payload;
      yield put(offSuccessAction("", false));
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(removeEmployer, user_id, employer_id);
      if (result) {
        yield put(individualGetBpiContractsAction(user_id));
        yield put(onSuccessAction("Remove Employer Success!", true));
        yield put(offLoadingAction());
        yield delay(1000);
        yield call(hideModal);
      }
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offSuccessAction("", false));
      yield put(offLoadingAction());
    }
  });
}

function* editEmployersWatcher() {
  yield takeLatest(individualEditEmployerAction, function* ({ payload }) {
    try {

      yield put(onLoadingAction());
      yield put(offSuccessAction("", false));
      let result = null;
      const { employerDetail, callBack } = payload;
      yield put(logErrorAction(false, ""));
      if (employerDetail.employer_id === null) {
        delete employerDetail.employer_id;
        result = yield call(createEmployer, employerDetail);
      } else {
        result = yield call(editEmployer, employerDetail);
      }
      if (result) {
        yield put(individualGetBpiContractsAction(employerDetail.user_id));
        yield put(
          onSuccessAction(employerDetail.employer_id ? "Update Employer Success!" : "Created Employer Success!", true)
        );
        yield put(offLoadingAction());
        yield delay(1000);
        yield put(offSuccessAction("", false));
        yield call(callBack);
      }
      yield put(onLoadingAction());
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* editClientWatcher() {
  yield takeLatest(individualEditClientAction, function* ({ payload }) {
    try {
      yield put(onLoadingAction());
      yield put(offSuccessAction("", false));
      let result = null;
      const { clientDetail, callBack } = payload;
      yield put(logErrorAction(false, ""));
      if (clientDetail.client_id === null) {
        delete clientDetail.client_id;
        result = yield call(createClient, clientDetail);
      } else {
        result = yield call(editClient, clientDetail);
      }
      if (result) {
        if (clientDetail.client_id) {
          yield put(individualSetCurrentClientAction(clientDetail));
        } else {
          yield put(individualGetBpiContractsAction(clientDetail.user_id));
        }
        yield put(offLoadingAction());
        yield delay(1000);
        yield put(offSuccessAction("", false));
        yield call(callBack);
      }
      yield put(onLoadingAction());
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

export default {
  getListEmployersWatcher,
  deleteClientWatcher,
  deleteEmployerWatcher,
  editEmployersWatcher,
  getListBpiContractsWatcher,
  editClientWatcher
};
