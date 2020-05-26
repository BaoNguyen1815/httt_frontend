// import { IUserModel } from "models";

interface IState {
  formInputValid: any;
  formErrors: any;
  formValid: boolean;
  [x: string]: any;
  formActivePanel1: any;
  formActivePanel1Changed: any;
}

interface IDispatchToProps {
  swapFormActive?: (a, param) => void;
  addBankAccountAction?: (bankDetail, apiEndPoint, callBack) => void;
  individualEditClientAction?: (clientDetail, callBack) => void;
  confirmBankAccountAction?: (user_id, pending_distribution_id, two_factor_token, callBack) => void;
  offSuccessAction?: (mess, isShow) => void;
  resendCodeAddBankAction: (uuid, userName, callBack) => void;
}

interface IProps extends IDispatchToProps {
  error: boolean;
  message: string;
  isLoading: boolean;
  userInfo: any;
  isSuccess: any;
  successMessage: any;
  formActivePanel1: number;
  modalClosed: any;
  show: boolean;
  getListData?: any;
  userDetail?: any;

}

export { IProps, IState };
