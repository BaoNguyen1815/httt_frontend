export interface IProps {
  checkValidForm: (value: any) => void;
  currentClient: object;
}
export interface IDescriptProps {
  description: string;
  quantity: string;
  unitPrice: string;
}

export interface ITotalProps {
  taxes: string | null;
}

export interface IListDescriptProps {
  listDescription: IDescriptProps[];
}

export interface ICheckValid {
  checkValid: (arg0: any) => boolean;
}

export interface IFunctionProps {
  handleDescriptChange: (index: number, name: string, value: any) => void;
  addNewDescript: () => void;
  removeDescript: (index: number) => void;
}

export interface ITotalFunctionProps {
  handleTaxChange: (arg0: any) => void;
}

// export interface IState {
//   listDescription: IDescriptProps[];
//   toxes: ITotalProps;
// }

export type IState = IListDescriptProps & ITotalProps;
