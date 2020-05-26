import { onLoadingAction, offLoadingAction } from "containers/redux/actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { sendInvoiceAction } from "./actions";
import { sendInvoice } from "../services";

function* sendInvoiceWatcher() {
  yield takeLatest(sendInvoiceAction, function*({ payload }) {
    try {
      yield put(onLoadingAction());
      const { username, email, subject, message } = payload;
      console.log("send")
      const result = yield call(sendInvoice, { username, email, subject, message });
      if (result) {
      }
      yield put(onLoadingAction());
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

export default { sendInvoiceWatcher };
