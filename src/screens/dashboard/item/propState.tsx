interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllItemsAction?: () => void;
  addNewItemAction?: (sale: number, sellingPrice: number, productId: number) => void;
  editItemAction?: (id: number, sale: number, sellingPrice: number, productId: number) => void;
  deleteItemAction?: (id: number) => void;
  getAllProductsAction?: () => void;
}

interface IStateToProps {
  listItems: any;
  listProducts: any;
}

interface IState {
  modalAddStatus: boolean;
  modalEditStatus: boolean;
  id: number;
  sale: number;
  sellingPrice: number;
  productId: number;
  searchKey: string;
}

export { IProps, IState };
