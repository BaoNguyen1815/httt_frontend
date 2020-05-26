import {
  logErrorAction,
  offLoadingAction,
  onLoadingAction,
  onSuccessAction,
  onLoadingDataAction,
  offLoadingDataAction,
  offSuccessAction,
} from "containers/redux/actions";
import { call, put, takeLatest, delay } from "redux-saga/effects";
import {
  editComBasicAction,
  editComAdvanceAction,
  getCompanyProfileAction,
  editUserInformation,
  setCompanyProfileAction,
  getCompanyAdvanceAction,
  editAdminProfileAction,
  setCompanyAdvanceAction,
  getAdminAdvanceAction,
  setAdminAdvanceAction
} from "./actions";
import { RESPONSE_STATUS } from "containers/contants";
import { editComProfileBasic, getCompanyProfile, getAdminProfileBasic, uploadFileByComId } from "../services";
import { setUserAction } from "containers/redux/user/actions";
import { editProfileBasic, userProfileAdvance, uploadMultipleAdvance } from "screens/company/settings/services";
import { getProfileAction } from "screens/individual/settings/ducks/actions";
import { getCopProfileAction } from "screens/company/settings/ducks/actions";
function* editCompanyWatcher() {
  yield takeLatest(editComBasicAction, function* ({ payload }) {
    try {
      yield put(onLoadingAction());
      yield put(onSuccessAction("", false));
      yield put(logErrorAction(false, ""));
      const { userDetail, detail, fileUpload } = payload;
      let result = null;
      let resImageUpload = null;
      if (userDetail.company_id) {
        // [result, resImageUpload] = yield all([
        //   call(editComProfileBasic, userDetail),
        //   delay(200),
        //   call(uploadFileByComId, fileUpload)
        // ]);
        result = yield call(editComProfileBasic, userDetail);
        resImageUpload = yield call(uploadFileByComId, fileUpload);
        console.log(resImageUpload);
      } else {
        result = yield call(editComProfileBasic, userDetail);
      }
      if (result && result.user_id) {
        detail.company_id = result.company_id;
        fileUpload.company_id = result.company_id;
        yield put(setUserAction(detail));
        yield put(onSuccessAction("", true));
        yield put(offLoadingAction());
        if (resImageUpload === null) {
          yield call(uploadFileByComId, fileUpload);
        }
        if (!userDetail.company_id) {
          yield put(getCopProfileAction(result.user_id));
          const dashboardInfo = {
            isCompleted: false,
            isStep1: false,
            isStep2: true
          };
          yield put(editUserInformation(dashboardInfo));
        } else { 
          yield put(getCompanyProfileAction(userDetail.user_id, userDetail.company_id, true));
        }
        yield delay(3000);
        yield put(onSuccessAction("", false));
      } else if (
        result.status === RESPONSE_STATUS.BAD_REQUEST ||
        result.status === RESPONSE_STATUS.INTERNAL_SERVER_ERROR
      ) {
        const messErr = result.error.substring(result.error.indexOf(":") + 1);
        yield put(logErrorAction(true, messErr));
      } else {
        // add case message
      }
    } catch (error) {
      yield put(logErrorAction(true, "Some Error of Server"));
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* editComAdvWatcher() {
  yield takeLatest(editComAdvanceAction, function* ({ payload }) {
    try {
      yield put(onLoadingAction());
      const { userAdvance, userInfo } = payload;
      yield put(logErrorAction(false, ""));
      yield put(onSuccessAction("", false));
      const resOfUserInfo = yield call(editProfileBasic, userInfo);
      const result = yield call(uploadMultipleAdvance, userAdvance);
      console.log(result);
      if (resOfUserInfo && resOfUserInfo.user_id) {
        yield put(onSuccessAction("", true));
        yield put(offLoadingAction());
        yield delay(3000);
        const dashboardInfo = {
          isCompleted: true,
          isStep1: false,
          isStep2: false
        };
        yield put(editUserInformation(dashboardInfo));
        yield put(onSuccessAction("", false));
      }
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* getCompanyProfileWatcher() {
  yield takeLatest(getCompanyProfileAction, function* ({ payload }) {
    try {
      const { user_id, company_id, isReload } = payload;
      yield put(offSuccessAction());
      if (!isReload) {
        yield put(onLoadingDataAction());
      }
      yield put(logErrorAction(false, ""));
      const result = yield call(getCompanyProfile, user_id, company_id);
      yield put(getCompanyAdvanceAction(user_id, company_id, isReload));
      if (result && result.company) {
        yield put(setCompanyProfileAction(result.company));
      }
    } catch (error) {
      yield put(offLoadingAction());
      yield put(offLoadingDataAction());
    } finally {
      yield put(offLoadingAction());
      yield put(offLoadingDataAction());
    }
  });
}

function* getAdminProfileWatcher() {
  yield takeLatest(getCompanyAdvanceAction, function* ({ payload }) {
    try {
      yield put(offSuccessAction());
      const { user_id, company_id, isReload } = payload;
      if (!isReload) {
        yield put(onLoadingDataAction());
      }
      yield put(logErrorAction(false, ""));
      // company profile advance.
      const result = yield call(getAdminProfileBasic, user_id, company_id);
      if (result && result.user_id) {
        yield put(setCompanyAdvanceAction(result.company));
        yield put(offLoadingDataAction());
      }
    } catch (error) {
      yield put(offLoadingAction());
      yield put(offLoadingDataAction());
    } finally {
      yield put(offLoadingAction());
      yield put(offLoadingDataAction());
    }
  });
}

function* getCompanyAdvanceActionWatcher() {
  yield takeLatest(getAdminAdvanceAction, function* ({ payload }) {
    try {
      yield put(onLoadingDataAction());
      yield put(logErrorAction(false, ""));
      yield put(offSuccessAction("", false));
      const res = yield call(userProfileAdvance, payload);
      yield put(getProfileAction(payload));
      if (res && res.user) {
        yield put(setAdminAdvanceAction(res.user));
      }
      yield put(offLoadingDataAction());
    } catch (error) {
      yield put(offLoadingAction());
      yield put(offSuccessAction("", false));
    } finally {
      yield put(offLoadingAction());
      yield put(offSuccessAction("", false));
    }
  });
}

function* editAdminWatcher() {
  yield takeLatest(editAdminProfileAction, function* ({ payload }) {
    try {
      yield put(onLoadingAction());
      const { userAdvance, listImages } = payload;
      yield put(logErrorAction(false, ""));
      yield put(onSuccessAction("", false));
      const resOfUserInfo = yield call(editProfileBasic, userAdvance);
      if (resOfUserInfo && resOfUserInfo.user_id) {
        yield put(onSuccessAction("", true));
        yield put(offLoadingAction());
        yield delay(5000);
        yield put(onSuccessAction("", false));
      }
      yield call(uploadFileByComId, listImages[0]);
      yield call(uploadFileByComId, listImages[1]);
      yield call(uploadFileByComId, listImages[2]);
      yield call(uploadFileByComId, listImages[3]);
    } catch (error) {
      yield put(offLoadingAction());
    } finally {
      yield put(offLoadingAction());
    }
  });
}

export default {
  editCompanyWatcher,
  editComAdvWatcher,
  getCompanyProfileWatcher,
  getAdminProfileWatcher,
  getCompanyAdvanceActionWatcher,
  editAdminWatcher
};
