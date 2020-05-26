import { createActions } from "redux-actions";

const actions = createActions({
  /*Detail tab*/
  GET_COP_PROFILE_ACTION: user_id => user_id,
  EDIT_USER_ACTION: userDetail => ({ userDetail }),
  GET_VERIFICATION_DETAIL_ACTION: null,
  UPDATE_USER_BASIC_ACTION: user_id => user_id,
  CHANGE_PASSWORD_ACTION: (user_id, old_password, new_password, new_password_repeat) => ({ user_id, old_password, new_password, new_password_repeat }),
  SECURITY_ACTION: (user_id) => ({ user_id }),
  SET_USER_SECURITY_ACTION: (userSecurity) => (userSecurity),
  ALERT_ACTION: (user_id) => ({ user_id }),
  SET_ALERT_ACTION: (alertDetails) => (alertDetails),
  UPDATE_PHONE_USER_ACTION: (user_id, phone_country, phone_number) => ({ user_id, phone_country, phone_number }),
  SET_PHONE_USER_ACTION: (user_id, uuid_str, twofa_old, twofa_new_phone) => ({ user_id, uuid_str, twofa_old, twofa_new_phone }),
  UPDATE_GAUTH_USER_ACTION: (user_id, gauth_key) => ({ user_id, gauth_key }),
  SET_GAUTH_USER_ACTION: (user_id, uuid_str, twofa) => ({ user_id, uuid_str, twofa }),
  SECURITY_EMAIL_PRIVACY_EDIT_ACTION: (user_id, hidepayrolldetails) => ({ user_id, hidepayrolldetails }),
  ALERT_EMAIL_PREFERENCE_EDIT_ACTION: (user_id, blockemailloginfromnewipaddress) => ({ user_id, blockemailloginfromnewipaddress }),
  GET_USER_ALERTS_HISTORY: null,
  GET_USER_SESSION_HISTORY: null,
  SET_USER_ALERTS_HISTORY: null,
  SET_USER_SESSION_HISTORY: null,
  UPDATE_USER_SMS_ACTION: (user_id, gauth_twofa, turnoffsms) => ({ user_id, gauth_twofa, turnoffsms })
});

export const {
  getCopProfileAction,
  editUserAction,
  getVerificationDetailAction,
  updateUserBasicAction,
  changePasswordAction,
  securityAction,
  alertAction,
  setAlertAction,
  updatePhoneUserAction,
  setPhoneUserAction,
  updateGauthUserAction,
  setGauthUserAction,
  securityEmailPrivacyEditAction,
  alertEmailPreferenceEditAction,
  setUserSecurityAction,
  getUserAlertsHistory,
  getUserSessionHistory,
  setUserAlertsHistory,
  setUserSessionHistory,
  updateUserSmsAction
} = actions;
