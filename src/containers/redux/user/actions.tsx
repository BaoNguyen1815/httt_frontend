import { createActions } from "redux-actions";

const actions = createActions({
  INVALID_TOKEN_ACTION: null,
  SET_USER_ACTION: userInfo => userInfo,
  GET_USER_ACTION: null,
  LOG_OUT_ACTION: null,
  AUTH_TWO: (uuid, username, access_token, isCompany) => ({ uuid, username, access_token, isCompany }),
  NEW_USER_AUTH_TWO: (uuid, access_token, isCompany) => ({ uuid, access_token, isCompany }),
  RESEND_CODE: (expiredCount, uuid, username, isCompany) => ({ expiredCount, uuid, username, isCompany }),
  SET_USER_DETAIL_ACTION: userDetail => userDetail,
  CLEAN_USER_ACTIONS: null,
  SIGN_UP_RESEND_CODE: (expiredCount, uuid, isCompany) => ({ expiredCount, uuid , isCompany}),
});

export const {
  invalidTokenAction,
  setUserAction,
  getUserAction,
  logOutAction,
  authTwo,
  newUserAuthTwo,
  resendCode,
  setUserDetailAction,
  cleanUserAction,
  signUpResendCode
} = actions;
