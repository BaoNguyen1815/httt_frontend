interface IState {
  verifyModal: boolean;
  isDisable: boolean;
  formData: any;
  uuid: string;
  username: string;
  access_token: string;
  countToExpire: number;
  formValid: boolean;
  codeValid: boolean;
  formErrors: any;
  uuid_str: string;
  totp: any;
  isSuccess?: boolean;
  isFalse?: boolean;
  isLoading: boolean;
  isDisableSuccess: boolean
}

interface IDispachToProps {
  securityAction: (user_id) => void;
  switchChange: () => void;
}

interface IProps extends IDispachToProps {
  isLoading: boolean;
  error: boolean;
  userInfo: any;
  userSecurity?: any;
  switchChecked?: boolean;
  isDisable: boolean;
  showModal?: boolean;
  userDetail?: any;
}

export { IProps, IState };
