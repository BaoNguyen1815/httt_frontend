import { createActions } from "redux-actions";

const actions = createActions({
  GET_DATA_EMPLOYEE_ACTION: (user_id, company_id) => ({ user_id, company_id }),
  SET_DATA_EMPLOYEE_ACTION: null,
  ADD_EMPLOYEE_ACTION: email => email,
  REMOVE_EMPLOYEE_ACTION: (user_id, company_id, employee_id, hideModal) => ({ user_id, company_id, employee_id, hideModal }),
  REMOVE_EMPLOYEE_NOT_REG_ACTION: (user_id, company_id, email, role, hideModal) => ({ user_id, company_id, email, role, hideModal}),
  UPLOAD_CVS_ACTION: file => file,
  EDIT_EMPLOYEE_ACTION: (user_id, company_id, employee_id, role, job_role) => ({user_id, company_id, employee_id, role, job_role}),
  SEND_REMINDER_ACTION: employee_id => employee_id,
  UPDATE_EMPLOYEE_ACTION: (workerid, name, surname, dateOfBirth, address, email, phone, jobrole, role) => ({
    workerid,
    name,
    surname,
    dateOfBirth,
    address,
    email,
    phone,
    jobrole,
    role
  })
});
export const {
  getDataEmployeeAction,
  setDataEmployeeAction,
  addEmployeeAction,
  removeEmployeeAction,
  removeEmployeeNotRegAction,
  uploadCvsAction,
  editEmployeeAction,
  sendReminderAction,
  updateEmployeeAction
} = actions;
