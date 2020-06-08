interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllShippingsAction?: () => void;
  addNewShippingAction?: (type: string, cost: number) => void;
  editShippingAction?: (id: number, type: string, cost: number) => void;
  deleteShippingAction?: (id: number) => void;
}

interface IStateToProps {
  listShipping: any;
}

interface IState {
  modalAddStatus: boolean;
  modalEditStatus: boolean;
  type: string;
  cost: number;
  searchKey: string;
  id: number;
}

export { IProps, IState };
