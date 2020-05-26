import {
  logErrorAction,
  offLoadingAction,
  onLoadingAction,
  onSuccessAction,
  offSuccessAction
} from "containers/redux/actions";
import { call, put, takeLatest, delay } from "redux-saga/effects";
import {
  getDataEmployeeAction,
  setDataEmployeeAction,
  addEmployeeAction,
  uploadCvsAction,
  editEmployeeAction,
  sendReminderAction,
  updateEmployeeAction,
  removeEmployeeAction,
  removeEmployeeNotRegAction
} from "./actions";
import {
  getDataEmployee,
  uploadCvs,
  editEmployee,
  updateEmployee,
  removeEmployee,
  removeEmployeeNotReg
} from "../services";

function* getDataEmployeeWatcher() {
  yield takeLatest(getDataEmployeeAction, function* ({ payload }) {
    try {
      yield put(onLoadingAction());
      const { user_id, company_id } = payload;
      yield put(logErrorAction(false, ""));
      const result = yield call(getDataEmployee, user_id, company_id);
      if (result) {
        yield put(setDataEmployeeAction(result));
      }
      yield put(onLoadingAction());
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* addEmployeeWatcher() {
  yield takeLatest(addEmployeeAction, function* ({ payload }) {
    try {
      yield put(offSuccessAction("", false));
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      console.log(payload)
      // const result = yield call(addEmployee, email, "role");
      // if (result) {
      //   yield put(onSuccessAction("Add Employee Success !", true));
      //   yield put(getDataEmployeeAction("user_Id"));
      // }
      yield put(onLoadingAction());
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* editEmployeeWatcher() {
  yield takeLatest(editEmployeeAction, function* ({ payload }) {
    try {
      yield put(offSuccessAction("", false));
      const { user_id, company_id, employee_id, role, job_role } = payload;
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(editEmployee, user_id, company_id, employee_id, role, job_role);
      if (result) {
        yield put(onSuccessAction("Edit Employee Success !", true));
        yield put(getDataEmployeeAction(user_id, company_id));
        yield delay(5000);
        yield put(offSuccessAction("", false));
      }
      yield put(onLoadingAction());
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* updateEmployeeWatcher() {
  yield takeLatest(updateEmployeeAction, function* ({ payload }) {
    try {
      yield put(offSuccessAction("", false));
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const { workerid, name, surname, dateOfBirth, address, email, phone, jobrole, role } = payload;
      const result = yield call(
        updateEmployee,
        workerid,
        name,
        surname,
        dateOfBirth,
        address,
        email,
        phone,
        jobrole,
        role
      );
      if (result) {
        yield put(onSuccessAction("Edit Employee Success !", true));
        // yield put(getDataEmployeeAction(user_id, company_id));
        // yield put(setDataEmployeeAction(result));
      }
      yield put(onLoadingAction());
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* deleteWorkerWatcher() {
  yield takeLatest(removeEmployeeAction, function* ({ payload }) {
    try {
      const { user_id, company_id, employee_id, hideModal } = payload;
      console.log(user_id, company_id, employee_id);
      yield put(offSuccessAction("", false));
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(removeEmployee, user_id, company_id, employee_id);
      if (result) {
        yield put(getDataEmployeeAction(user_id, company_id));
        yield put(onSuccessAction("Add Employee Success !", true));
        yield put(offLoadingAction());
        yield delay(1000);
        yield call(hideModal);
        yield put(offSuccessAction("", false));
      }
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      
      yield put(offSuccessAction("", false));
      yield put(offLoadingAction());
    }
  });
}

function* deleteWorkerNotRegisteredWatcher() {
  yield takeLatest(removeEmployeeNotRegAction, function* ({ payload }) {
    try {
      const { user_id, company_id, email, role, hideModal } = payload;
      yield put(offSuccessAction("", false));
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(removeEmployeeNotReg, user_id, company_id, email, role);
      if (result) {
        yield put(getDataEmployeeAction(user_id, company_id));
        yield put(onSuccessAction("Add Employee Success !", true));
        yield delay(1000);
        yield call(hideModal);
        yield put(offSuccessAction("", false));
      }
      yield put(offSuccessAction("", false));
    } catch (error) {
      yield put(logErrorAction(true, ""));
      yield put(offSuccessAction("", false));
    } finally {
      yield put(logErrorAction(true, ""));
      yield put(offSuccessAction("", false));
    }
  });
}

function* uploadCvsWatcher() {
  yield takeLatest(uploadCvsAction, function* ({ payload }) {
    try {
      yield put(offSuccessAction("", false));
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      const result = yield call(uploadCvs, payload);
      if (result) {
        yield put(onSuccessAction("Upload Cvs Success !", true));
        // yield put(getDataEmployeeAction(user_id, company_id));
        // yield put(setDataEmployeeAction(result));
      }
      yield put(onLoadingAction());
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* sendReminderWatcher() {
  yield takeLatest(sendReminderAction, function* ({ payload }) {
    try {
      yield put(offSuccessAction("", false));
      yield put(onLoadingAction());
      yield put(logErrorAction(false, ""));
      console.log(payload);
      // const result = yield call(sendReminder, payload);
      // if (result) {
      //   yield put(onSuccessAction("Send Reminder Success !", true));
      // }
      yield put(onLoadingAction());
    } catch (error) {
      yield put(logErrorAction(true, ""));
    } finally {
      yield put(offLoadingAction());
    }
  });
}

export default {
  getDataEmployeeWatcher,
  addEmployeeWatcher,
  editEmployeeWatcher,
  updateEmployeeWatcher,
  deleteWorkerWatcher,
  uploadCvsWatcher,
  sendReminderWatcher,
  deleteWorkerNotRegisteredWatcher
};
