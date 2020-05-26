interface IState {
  switch1: boolean;
  switch2: boolean;
  switch3: boolean;
  switch4: boolean;
  switch5: boolean;
  collapseID: string;
  oldpassword: string;
  new_password: string;
  new_password_repeat: string;
  formErrors: any;
  oldpasswordValid: boolean;
  formValid: boolean;
  newpasswordValid: boolean;
  newrePasswordValid: boolean;
  userSecurity: any;
  sessionHistory: any
}

interface IDispachToProps {
  changePasswordAction: (
    user_id: string,
    oldpassword: string,
    new_password: string,
    new_password_repeat: string
  ) => void;
  securityAction: (user_id: string) => void;
  securityEmailPrivacyEditAction: (user_id: string, switchHidePayrollDetails: string) => void;
  getUserSessionHistory: (user_id?: string) => void;
  // userSecurity: (userSecurity?: any) => void;
}

interface IProps extends IDispachToProps {
  isLoading: boolean;
  error: boolean;
  userInfo: any;
  userSecurity?: any;
  isSuccess? : boolean,
  dataLoading? : boolean
}

export { IProps, IState };
