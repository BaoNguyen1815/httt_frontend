interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllCustomersAction?: () => void;
  addNewCustomerAction?: (
    name: string,
    phone: string,
    age: number,
    sex: string,
    username: string,
    password: string
  ) => void;
  editCustomerAction?: (
    id: number,
    name: string,
    phone: string,
    age: number,
    sex: string,
    username: string,
    password: string
  ) => void;
  deleteCustomerAction?: (id: number) => void;
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
