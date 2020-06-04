interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllOrderAction?: () => void;
}

interface IStateToProps {
  listOrder: any;
}

interface IState {
  searchKey: string;
}

export { IProps, IState };
