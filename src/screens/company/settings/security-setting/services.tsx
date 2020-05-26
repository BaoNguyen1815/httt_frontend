import config from "containers/config";
import { postService } from "services/config";

export const sendChangePassWord = async (user_id, old_password, new_password, new_password_repeat) => {
  try {
    return await postService(
      `${config.STAGE}/user/password/update`,
      { user_id, old_password, new_password, new_password_repeat },
      "change password Fail",
      true
    );
  } catch (error) {
    throw error;
  }
};

export const securityBasic = async user_id => {
  try {
    return await postService(`${config.STAGE}/user/security/basic`, { user_id }, "security Fail", true);
  } catch (error) {
    throw error;
  }
};

export const securityEmailPrivacyEdit = async (user_id, hidepayrolldetails) => {
  try {
    return await postService(`${config.STAGE}/user/security/emailprivacy/edit`, { user_id, hidepayrolldetails }, "security EmailPrivacy Fail", true);
  } catch (error) {
    throw error;
  }
};

export const getSessionHistory = async user_id => {
  try {
    return await postService(`${config.STAGE}/user/session/history`, { user_id }, "security Fail", true);
  } catch (error) {
    throw error;
  }
};

export const getAlertsHistory = async user_id => {
  try {
    return await postService(`${config.STAGE}/user/alerts/history`, { user_id }, "security EmailPrivacy Fail", true);
  } catch (error) {
    throw error;
  }
};

export const userGauthUpdate = async (user_id, gauth_key) => {
  try {
    return await postService(`${config.STAGE}/user/gauth/update`, { user_id, gauth_key }, "User Gauth Update Fail", true);
  } catch (error) {
    if (error.status === 400 || error.status === 500) {
      return false;
    }
    throw error;
  }
};

export const userGauthSet = async (user_id, uuid_str, twofa) => {
  try {
    return await postService(`${config.STAGE}/user/gauth/set`, { user_id, uuid_str, twofa }, "User Gauth Set Fail", true);
  } catch (error) {
    if (error.status) {
      return false;
    }
    throw error;
  }
};

export const disableGauth = async (user_id, current_gauth_totp) => {
  try {
    return await postService(`${config.STAGE}/user/gauth/remove`, { user_id, current_gauth_totp}, "User Gauth Set Fail", true);
  } catch (error) {
    if (error.status === 400 || error.status === 500) {
      return false;
    }
    throw error;
  }
};

export const userUpdateSMS = async (user_id, gauth_twofa, turnoffsms) => {
  try {
    return await postService(`${config.STAGE}/user/security/sms/edit`, { user_id, gauth_twofa, turnoffsms }, "User SMS Set Fail", true);
  } catch (error) {
    if (error.status === 400 || error.status === 500) {
      return false;
    }
    throw error;
  }
};