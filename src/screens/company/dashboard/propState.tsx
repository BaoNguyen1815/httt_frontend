interface IUserDetailState {
  toggleStateA: boolean;
  windowWidth: any;
  isHidden?: boolean
}

interface IDispachToProps {
  editUserAction: (userDetail) => void;
  getProfileAction: (user_id) => void;
  offSuccessAction: (message, isShowMess) => void;
  offLoadingDataAction: () => void;
  // getAdminProfileAction: (user_id, company_id) => void;
}

interface IProps extends IDispachToProps {
  userInfo: any;
  userDetail: any;
  isLoading: boolean;
  dashboardInfo: any;
  adminDetail: null;
}

export { IProps, IUserDetailState };
