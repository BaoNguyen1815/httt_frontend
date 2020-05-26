interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllCustomersAction?: () => void;
}

interface IStateToProps {
  listCustomer: any;
}

interface IState {
  modalAddStatus: boolean;
  modalEditStatus: boolean;
}

export { IProps, IState };
