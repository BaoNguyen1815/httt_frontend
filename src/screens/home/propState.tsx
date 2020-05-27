interface IProps extends IDispatchToProps, IStateToProps {
  username: string;
  password: string;
  repeat_password: string;
  flipped: boolean;
}

interface IDispatchToProps {
  logInAction?: (username: string, password: string) => void;
}

interface IStateToProps {}

interface IState {
  logInAction?: (username: string, password: string) => void;
}

export { IProps, IState };
