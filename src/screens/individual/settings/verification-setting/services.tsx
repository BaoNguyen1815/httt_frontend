import { postService } from "services/config";
import config from "containers/config";



export const setPhoneUser = async (user_id,uuid_str,twofa_old,twofa_new_phone) => {
  try {
    return await postService(`${config.STAGE}/user/phone/set`, {user_id,uuid_str,twofa_old,twofa_new_phone}, "set Phone Fail", true);
  } catch (error) {
    throw error;
  }
};


export const updatePhoneUser = async (user_id,phone_country,phone_number) => {
  try {
    return await postService(`${config.STAGE}/user/phone/update`, {user_id,phone_country,phone_number}, "update Phone Fail", true);
  } catch (error) {
    throw error;
  }
};
