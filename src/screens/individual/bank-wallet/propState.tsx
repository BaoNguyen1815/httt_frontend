interface IState {
  currentData: any;
  [x: string]: any;
  isRemove: boolean;
  isBankAccount: boolean;
  isAddModalOpen: boolean;
  tags: any;
}

interface IDispachToProps {
  // editUserAction: (userDetail) => void;
  getAccountsAction: (user_id, callBack) => void;
  updateBankWalletAccountAction?:(bankDetail, callBack) => void;
  editWalletAccountAction?:(walletDetail, callBack) => void;
  removeAccountAction: (userId, distribution_id, hideModal) => void;
  removeWalletAccountAction: (userId, cryptocurrencywallet_id, hideModal) => void;
  setAccountsAction: (listBank) => void;
  setWalletAccountsAction: (listCrypto) => void;
}

interface IProps extends IDispachToProps {
  userInfo: any;
  userDetail: any;
  isLoading: boolean;
  isSuccess: boolean;
  chips: any;
  backUpBankAcc: any
}

export { IProps, IState };
