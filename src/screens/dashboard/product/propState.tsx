interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllProductsAction?: () => void;
  getAllCategoryAction?: () => void;
  addNewProductAction?: (
    name: string,
    code: string,
    description: string,
    quantity: number,
    price: number,
    author: string,
    publisher: string,
    categoryId: number
  ) => void;
  editProductAction?: (
    id: number,
    name: string,
    code: string,
    description: string,
    quantity: number,
    price: number,
    author: string,
    publisher: string,
    categoryId: number
  ) => void;
  deleteProductAction?: (id: number) => void;
  addNewItemAction?: (sale: number, sellingPrice: number, productId: number) => void;
}

interface IStateToProps {
  listProducts: any;
  listCategory: any;
}

interface IState {
  modalAddStatus: boolean;
  modalEditStatus: boolean;
  modalSellStatus: boolean;
  options: any;
  name: string;
  code: string;
  description: string;
  quantity: number;
  price: number;
  author: string;
  publisher: string;
  categoryId: number;
  sale?: number;
  sellingPrice?: number;
  productId?: number;
  searchKey: string;
}

export { IProps, IState };
