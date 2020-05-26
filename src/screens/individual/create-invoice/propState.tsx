interface IState {
  isOpen: boolean;
  isCheckedImage: boolean;
  base64_image: any;
  avt_image: any;
  currentClient: any;
  clientOptions: any;
  isLoading: boolean;
  modalOptionsStatus: boolean;
  modalSendInvoiceStatus: boolean;
  modalPreviewInvoiceStatus: boolean;
  formErrors: any;
  emailValid: boolean;
  formValid: boolean;
  email: string;
  message: string;
  listClient: any;
  checkOption: {
    email: boolean;
    phone: boolean;
  },
  detailInvoice: {
    invoice: string,
    invoiceDate: string,
    invoiceDueDate: string
  },
  isEditUser: boolean;
  isSaveClient: boolean;
}

interface IDispatchToProps {
  individualSetCurrentClientAction: (currentClient) => void;
  sendInvoiceAction?: (username: string, email: string, subject: string, message?: string) => void;
}

interface IProps extends IDispatchToProps {
  history: any;
  userDetail: any;
  clients: any;
  bankAndWalletAccounts: any;
  userInfo: any;
  currentUser: any;
 
}

export { IProps, IState };
