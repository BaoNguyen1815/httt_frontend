// import { IUserModel } from "models";

interface IState {
  options: any;
  selectedRows: any;
  isRemove: boolean;
  isUploadBulk: boolean;
  isEditEmp: boolean;
  employeeEmail: string;
  employeeRole: string;
  formInputValid: any;
  formValid: boolean;
  formErrors: any;
  isLoadingData: boolean;
  currentEmploy: any;
  withDist: any;
  withOutDist: any;
  isSendReminder: boolean;
  dataWithDist: any;
  dataWithOutDist: any;
}

interface IDispatchToProps {
  getDataEmployeeAction: (userId, companyId) => void;
  removeEmployeeAction: (userId, company_id, employee_id, hideModal) => void;
  removeEmployeeNotRegAction: (userId, company_id, email, role, hideModal) => void;
  offSuccessAction: (message, isSuccess) => void;
  // onSuccessAction: (mess) => void;
  // logErrorAction: (isShow, message) => void;
}

interface IProps extends IDispatchToProps {
  columns?: any;
  userInfo: any;
  error: boolean;
  message: string;
  isLoading: boolean;
  listEmployee: any;
  listEmployeeNotRegistered: any;
  dataWithDist: any;
  dataWithOutDist: any;
  isSuccess: any;
  // match?: any;
}

export { IProps, IState };
