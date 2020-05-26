interface IUserDetailState {
  toggleStateA: boolean;
  windowWidth: any;
}

interface IDispachToProps {
  editUserAction: (userDetail) => void;
  getProfileAction: (user_id) => void;
  individualGetBpiContractsAction: (user_id) => void;
}

interface IProps extends IDispachToProps {
  userInfo: any;
  userDetail: any;
  isLoading: boolean;
}

export { IProps, IUserDetailState };
