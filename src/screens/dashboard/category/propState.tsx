interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllCategoryAction?: () => void;
}

interface IStateToProps {
  listCategory: any;
}

interface IState {
  modalAddStatus: boolean;
  modalEditStatus: boolean;
}

export { IProps, IState };
