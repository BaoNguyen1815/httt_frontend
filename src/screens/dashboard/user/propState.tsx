interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllUsersAction?: () => void;
  deleteUserAction?: (id: number) => void;
}

interface IStateToProps {
  listUser: any;
}

interface IState {
  modalAddStatus: boolean;
  modalEditStatus: boolean;
}

export { IProps, IState };
