import { handleActions } from "redux-actions";
import {
  editUserInformation,
  setCompanyProfileAction,
  setAdminProfileAction,
  setCompanyAdvanceAction,
  setAdminAdvanceAction,
  clearCompanyDataAction
} from "./actions";

export default handleActions<any>(
  {
    [editUserInformation.toString()]: (state, { payload }) => ({ ...state, dashboardInfo: payload }),
    [setCompanyProfileAction.toString()]: (state, { payload }) => ({ ...state, companyDetail: payload }),
    [setAdminProfileAction.toString()]: (state, { payload }) => ({ ...state, adminDetail: payload }),
    [setAdminAdvanceAction.toString()]: (state, { payload }) => ({ ...state, adminAdvance: payload }),
    [setCompanyAdvanceAction.toString()]: (state, { payload }) => ({ ...state, companyAdvance: payload }),
    [clearCompanyDataAction.toString()]: () => ({})
  },
  {
    dashboardInfo: {
      isCompleted: false,
      isStep1: true,
      isStep2: false
    },
    companyDetail: null,
    adminAdvance: null,
    companyAdvance: null
  }
);
