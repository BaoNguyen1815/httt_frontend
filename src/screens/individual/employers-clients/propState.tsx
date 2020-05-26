// import { IUserModel } from "models";

interface IState {
  defineClientsTable: any;
  defineEmployersTable: any;
  currentUser: any;
  isEditUser: boolean;
  isRemove: boolean;
  listClient: any;
  listEmployee: any;
  [x: string]: any;
  role: string
}

interface IDispatchToProps {
  individualGetEmployersAction: (userId) => void;
  individualGetBpiContractsAction: (user_id) => void;
  removeEmployeeAction: (userId, company_id, employee_id, hideModal) => void;
  removeEmployeeNotRegAction: (userId, company_id, email, role, hideModal) => void;
  offSuccessAction: (message, isSuccess) => void;
  individualRemoveClientAction?: (user_id, client_id, hideModal) => void;
  individualRemoveEmployerAction?: (user_id, client_id, hideModal) => void;
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
  employers?: any;
  history: any;
}

export { IProps, IState };
