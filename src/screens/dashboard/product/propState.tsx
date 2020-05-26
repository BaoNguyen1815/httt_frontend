interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllProductsAction?: () => void;
}

interface IStateToProps {
  listProducts: any;
}

interface IState {
  modalAddStatus: boolean;
  modalEditStatus: boolean;
  modalSellStatus: boolean;
  options: any;
}

export { IProps, IState };
