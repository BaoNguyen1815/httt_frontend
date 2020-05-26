import config from "containers/config";
import { postService } from "services/config";

export const getDataEmployee = async (user_id, company_id) => {
  try {
    return await postService(`${config.STAGE}/user/company/employees/view`, { user_id, company_id }, "getDataEmployee Fail", true);
  } catch (error) {
    throw error;
  }
};

export const sendInviteUser = async (user_id, company_id, to_invite) => {
  try {
    return await postService(`${config.STAGE}/user/company/employee/invite`, { user_id, company_id, to_invite }, "Invite Fail", true);
  } catch (error) {
    throw error;
  }
};

export const editEmployee = async (user_id, company_id, employee_id, role, job_role) => {
  try {
    return await postService(`${config.STAGE}/user/company/employee/edit`, { user_id, company_id, employee_id, role, job_role }, "Employee Edit Fail", true);
  } catch (error) {
    throw error;
  }
};

export const updateEmployee = async (workerid, name, surname, dateOfBirth, address, email, phone, jobrole, role) => {
  try {
    return await postService(
      `${config.STAGE}/user/profile/basic`,
      { workerid, name, surname, dateOfBirth, address, email, phone, jobrole, role },
      "Employee Update Fail",
      true
    );
  } catch (error) {
    throw error;
  }
};

export const removeEmployee = async (user_id, company_id, employee_id) => {
  try {
    return await postService(`${config.STAGE}/user/company/employee/remove`, { user_id, company_id, employee_id }, "removeEmployee Fail", true);
  } catch (error) {
    throw error;
  }
};

export const removeEmployeeNotReg = async (user_id, company_id, email, role) => {
  try {
    return await postService(`${config.STAGE}/user/company/employee/invite/cancel`, { user_id, company_id, email, role }, "removeEmployee Fail", true);
  } catch (error) {
    throw error;
  }
};

export const uploadCvs = async file => {
  try {
    return await postService(`${config.STAGE}/user/profile/basic`, { file }, "Upload Cvs Fail", true);
  } catch (error) {
    throw error;
  }
};

export const sendReminder = async (user_id, company_id, email, role) => {
  try {
    return await postService(`${config.STAGE}/user/company/employee/invite/reminder`, { user_id, company_id, email, role }, "sendReminder Fail", true);
  } catch (error) {
    throw error;
  }
};

export const uploadBulkInvite = async (user_id, company_id, to_invite) => {
  try {
    return await postService(`${config.STAGE}/user/company/employee/invite`, { user_id, company_id, to_invite }, "Invite Fail", true);
  } catch (error) {
    throw error;
  }
};
