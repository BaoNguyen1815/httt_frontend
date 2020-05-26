import config from "containers/config";
import { postService } from "services/config";

export const getListEmployers = async (user_id) => {
  try {
    return await postService(`${config.STAGE}/user/employers/view`, { user_id }, "get list Employers Fail", true);
  } catch (error) {
    throw error;
  }
};

export const getEmployer = async (user_id, employer_id) => {
  try {
    return await postService(`${config.STAGE}/user/employer/view`, { user_id, employer_id }, "get Employer Fail", true);
  } catch (error) {
    throw error;
  }
};

export const getClient = async (user_id, client_id) => {
  try {
    return await postService(`${config.STAGE}/user/client/view`, { user_id, client_id }, "get Client Fail", true);
  } catch (error) {
    throw error;
  }
};

export const getListBpiContracts = async (user_id) => {
  try {
    return await postService(`${config.STAGE}/user/bpicontracts/view`, { user_id }, "get getListBpiContracts Fail", true);
  } catch (error) {
    throw error;
  }
};

export const createEmployer = async employerDetail => {
  try {
    return await postService(`${config.STAGE}/user/employer/add`, employerDetail, "addEmployers Fail", true);
  } catch (error) {
    throw error;
  }
};

export const editEmployer = async employerDetail => {
  try {
    return await postService(`${config.STAGE}/user/employer/edit`, employerDetail, "editEmployers Fail", true);
  } catch (error) {
    throw error;
  }
};

export const removeClient = async (user_id, client_id) => {
  try {
    return await postService(`${config.STAGE}/user/client/delete`, { user_id, client_id }, "removeEmployee Fail", true);
  } catch (error) {
    throw error;
  }
};

export const removeEmployer = async (user_id, employer_id) => {
  try {
    return await postService(`${config.STAGE}/user/employer/delete`, { user_id, employer_id }, "removeEmployee Fail", true);
  } catch (error) {
    throw error;
  }
};
export const createClient = async clientDetail => {
  try {
    return await postService(`${config.STAGE}/user/client/add`, clientDetail, "add Client Fail", true);
  } catch (error) {
    throw error;
  }
};

export const editClient = async clientDetail => {
  try {
    return await postService(`${config.STAGE}/user/client/edit`, clientDetail, "Edit Client Fail", true);
  } catch (error) {
    throw error;
  }
};