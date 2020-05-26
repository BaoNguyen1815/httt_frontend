import config from "containers/config";
import { postService } from "services/config";

export const getCompanyProfile = async (user_id, company_id) => {
  try {
    return await postService(`${config.STAGE}/user/company/profile/basic/view`, { user_id, company_id }, "Profile Fail", true);
  } catch (error) {
    throw error;
  }
};
export const getAdminProfileBasic = async (user_id, company_id) => {
  try {
    return await postService(`${config.STAGE}/user/company/profile/advanced/view`, { user_id, company_id }, "Profile advanced Fail", true);
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

export const editComProfileBasic = async (companyInfo) => {
  try {
    return await postService(`${config.STAGE}/user/company/profile/basic/edit`, companyInfo, "Company Profile Fail", true);
  } catch (error) {
    throw error;
  }
};

export const uploadFileByComId = async (files) => {
  try {
    return await postService(`${config.STAGE}/user/company/profile/advanced/edit`, files, "upload file by company_id Fail", true);
  } catch (error) {
    throw error;
  }
};

export const editCompanyAdvance = async (userAdv) => {
  try {
    return await postService(`${config.STAGE}/user/company/profile/advanced/add`, userAdv, "edit advanced data for a company Fail", true);
  } catch (error) {
  }
};

export const testRememberMe = async () => {
  try {
    return await postService(`${config.STAGE}/user/auth/remember_me`, {}, "remember_me for a company Fail", false);
  } catch (error) {
  }
};