interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllCategoryAction?: () => void;
  addNewCategoryAction?: (name: string, description: string) => void;
  editCategoryAction?: (id: number, name: string, description: string) => void;
  deleteCategoryAction?: (id: number) => void;
}

interface IStateToProps {
  listCategory: any;
}

interface IState {
  modalAddStatus: boolean;
  modalEditStatus: boolean;
  name: string;
  description: string;
  list: any;
  id: number;
  searchKey: string;
}

export { IProps, IState };
