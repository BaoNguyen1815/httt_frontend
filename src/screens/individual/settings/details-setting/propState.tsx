// import { IUserModel } from "models";

interface IUserDetailState {
  email: string;
  phoneNumber: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  street_address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  formErrors: any;
  formInputValid: any;
  formValid: boolean;
  userDetail: any;
  // agreeTerms: boolean;
  // policy: boolean;
  options: any;
  wasValidated: boolean;
}

interface IDispachToProps {
  updateUserBasicAction: (userDetail) => void;
  getProfileAction: (user_id, callBack) => void;
}

interface IProps extends IDispachToProps {
  userInfo: any;
  userDetail: any;
  isLoading: boolean;
  error?: boolean;
  errorMess?: string;
  isSuccess?: boolean;
}

export { IProps, IUserDetailState };
