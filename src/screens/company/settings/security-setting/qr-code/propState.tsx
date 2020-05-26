interface IState {
}

interface IDispachToProps {
  switchChange: () => void;
}

interface IProps extends IDispachToProps {}

export { IProps, IState };
