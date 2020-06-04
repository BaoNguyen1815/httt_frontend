interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  signUpAction?: (username: string, password: string, fullName: string, role: string) => void;
}

interface IStateToProps {}

interface IState {
  username: string;
  password: string;
  repeat_password: string;
  fullName: string;
  role: string;
  option: any;
}

export { IProps, IState };
