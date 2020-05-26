interface IState {
  smsModal: boolean;
  isDisable: boolean;
  gauth_twofa: string;
  turnoffsms: string;
  isSuccess: boolean;
  isFalse: boolean;
  isLoading: boolean
}

interface IDispachToProps {
  switchChange: () => void;
  securityAction:(user_id) => void;
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
