interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllPaymentsAction?: () => void;
  addNewPaymentAction?: (
    name: string,
    phone: string,
    age: number,
    sex: string,
    username: string,
    password: string
  ) => void;
  editPaymentAction?: (
    id: number,
    name: string,
    phone: string,
    age: number,
    sex: string,
    username: string,
    password: string
  ) => void;
  deletePaymentAction?: (id: number) => void;
}

interface IStateToProps {
  listCustomer: any;
}

interface IState {
  modalAddStatus: boolean;
  modalEditStatus: boolean;
  name: string;
  phone: string;
  age: number;
  sex: string;
  username: string;
  password: string;
  id: number;
  options: any;
  searchKey: string;
}

export { IProps, IState };
