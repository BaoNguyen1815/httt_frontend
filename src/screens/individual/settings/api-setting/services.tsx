import { postService } from "services/config";
import config from "containers/config";

export const userGauthUpdate = async (user_id,gauth_key) => {
  try {
    return await postService(`${config.STAGE}/user/gauth/update`, {user_id,gauth_key}, "User Gauth Update Fail", true);
  } catch (error) {
    throw error;
  }
};

export const userGauthSet = async (user_id,uuid_str,twofa) => {
  try {
    return await postService(`${config.STAGE}/user/gauth/set`, {user_id,uuid_str,twofa}, "User Gauth set Fail", true);
  } catch (error) {
    throw error;
  }
};