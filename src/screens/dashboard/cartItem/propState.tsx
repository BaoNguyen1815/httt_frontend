interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllItemsAction?: () => void;
}

interface IStateToProps {
  listItems: any;
}

interface IState {
  getAllItemsAction?: () => void;
}

export { IProps, IState };
