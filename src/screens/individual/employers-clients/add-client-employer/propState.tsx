// import { IUserModel } from "models";

interface IState {
  name: string;
  website: string;
  jobRole: string;
  payrollCurrency: any;
  nextPayroll: string;
  payrollFrequency: any;
  payrollPaymentType: any;
  paymentAmount: any;
  employerPays: any;
  invoiceCurrency: any;
  expectedVolume: any;
  paymentType: any;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  expectedOptions: any;
  payMethodOptions: any;
  payrollCurrencyOptions: any;
  isEmployer: any;
  currentUser: any;
  role: any;
  employeeRole: string;
  options: any;
  formInputValid: any;
  formErrors: any;
  formValid: boolean;
  jobRoleOptions: any;
  countryOptions: any;
  [x: string]: any;
  formActivePanel1: any;
  formActivePanel1Changed: any;
  selectedOption: any;
}

interface IDispatchToProps {
  swapFormActive?: (a, param) => void;
  individualEditEmployerAction?: (employerDetail, callBack) => void;
  individualEditClientAction?: (clientDetail, callBack) => void;
  offSuccessAction?: (mess, isShow) => void;
  currencyData?: () => void;
  nextPageAction: (pageEndPoint) => void
}

interface IProps extends IDispatchToProps {
  error: boolean;
  message: string;
  isLoading: boolean;
  match?: any;
  userData?: any;
  isEmployer?: boolean;
  employeeRole?: any;
  formActivePanel1?: number;
  modalClosed?: any;
  calculateAutofocus?: any;
  show?: boolean;
  formActivePanel1Changed?: any;
  handleNextPrevClick?: any;
  userInfo?: any;
  isSuccess?: any;
  successMessage?: any;
  history?: any;
  clients?: any;
}
export { IProps, IState };
