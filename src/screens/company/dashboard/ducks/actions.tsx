import { createActions } from "redux-actions";

const actions = createActions({
  EDIT_COM_BASIC_ACTION: (userDetail, detail, fileUpload) => ({ userDetail, detail, fileUpload }),
  EDIT_COM_ADVANCE_ACTION: (userAdvance, userInfo) => ({ userAdvance, userInfo }),
  EDIT_USER_INFORMATION: null,
  GET_COMPANY_PROFILE_ACTION: (user_id, company_id, isReload) => ({ user_id, company_id, isReload }),
  SET_COMPANY_PROFILE_ACTION: companyDetail => companyDetail,
  GET_ADMIN_PROFILE_ACTION: (user_id, company_id) => ({ user_id, company_id }),
  SET_COMPANY_ADVANCE_ACTION: companyAdv => companyAdv,
  SET_ADMIN_ADVANCE_ACTION: adminAdv => adminAdv,
  SET_ADMIN_PROFILE_ACTION: adminDetail => adminDetail,
  GET_COMPANY_ADVANCE_ACTION: (user_id, company_id, isReload) => ({ user_id, company_id, isReload }),
  GET_ADMIN_ADVANCE_ACTION: user_id => user_id,
  EDIT_ADMIN_PROFILE_ACTION: (userAdvance, listImages) => ({ userAdvance, listImages }),
  CLEAR_COMPANY_DATA_ACTION: null,
});

export const {
  editComBasicAction,
  editComAdvanceAction,
  editUserInformation,
  getCompanyProfileAction,
  setCompanyProfileAction,
  setCompanyAdvanceAction,
  setAdminAdvanceAction,
  getAdminProfileAction,
  setAdminProfileAction,
  getCompanyAdvanceAction,
  getAdminAdvanceAction,
  editAdminProfileAction,
  clearCompanyDataAction
} = actions;
