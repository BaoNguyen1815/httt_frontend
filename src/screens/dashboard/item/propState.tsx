interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllItemsAction?: () => void;
}

interface IStateToProps {
  listItems: any;
}

interface IState {
  modalAddStatus: boolean;
  modalEditStatus: boolean;
}

export { IProps, IState };
