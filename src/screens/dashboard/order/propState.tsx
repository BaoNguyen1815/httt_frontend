interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllOrderAction?: () => void;
}

interface IStateToProps {
  listOrder: any;
}

interface IState {
  getAllOrderAction?: () => void;
}

export { IProps, IState };
