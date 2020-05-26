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
  offSuccessAction?: (mess, isShow) => void;
  addWalletAccountAction?: (walletDetail, apiEndPoint, callBack) => void;
  confirmBankAccountAction?: (user_id, pending_distribution_id, two_factor_token, callBack) => void;
  resendCodeAddBankAction?: (uuid, userName, callBack) => void;
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
  bankAndWalletAccounts?: any;

}

export { IProps, IState };
