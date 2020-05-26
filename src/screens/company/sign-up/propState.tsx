// import { IUserModel } from "models";

interface IState {
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  phone_country: string;
  password: string;
  rePassword: string;
  formErrors: any;
  phoneValid: boolean;
  emailValid: boolean;
  passwordValid: boolean;
  firstNameValid: boolean;
  lastNameValid: boolean;
  formValid: boolean;
  agreeTerms: boolean;
  rePasswordValid: boolean;
  worker_role: string;
}

interface IDispatchToProps {
  signUpAction: (username, password, phoneCountry, phoneNumber, firstName, lastName, workerRole, isAdmin) => void;
  onSuccessAction: (mess) => void;
  logErrorAction: (isShow, message) => void;
}

interface IProps {
  error: boolean;
  message: string;
  isLoading: boolean;
  match?: any;
}

export { IProps, IState, IDispatchToProps };
