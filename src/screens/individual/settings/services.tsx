import config from "containers/config";
import { postService } from "services/config";
export const userProfileBasic = async (user_id) => {
  try {
    return await postService(`${config.STAGE}/user/profile/basic`, { user_id }, "Profile Fail", true);
  } catch (error) {
    throw error;
  }
};
export const userProfileAdvance = async (user_id) => {
  try {
    return await postService(`${config.STAGE}/user/profile/advanced`, { user_id }, "Profile advanced Fail", true);
  } catch (error) {
    throw error;
  }
};

export const addFirstProfileBasic = async (userInfo) => {
  try {
    return await postService(`${config.STAGE}/user/basic/add`, userInfo, "Profile Fail", true);
  } catch (error) {
    throw error;
  }
};

export const editProfileBasic = async (userInfo) => {
  try {
    return await postService(`${config.STAGE}/user/basic/edit`, userInfo, "Profile Fail", true);
  } catch (error) {
    throw error;
  }
};

export const uploadIDsByType = async (userInfo) => {
  try {
    return await postService(`${config.STAGE}/user/advanced/edit`, userInfo, "Edit Advance Fail", true);
  } catch (error) {
    if (error.status) {
      return (error);
    }
    // throw error;
  }
};

export const getLinkImage = async (image_id, user_id) => {
  try {
    return await postService(`${config.STAGE}/user/image/${image_id}`, { user_id }, "Get image Fail", true);
  } catch (error) {
    throw error;
  }
};

export const uploadMultipleAdvance = async (userAdv) => {
  try {
    return await postService(`${config.STAGE}/user/advanced/add`, userAdv, "Add multiple userAdv Fail", true);
  } catch (error) {
    throw error;
  }
};
