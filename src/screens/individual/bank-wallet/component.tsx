// import SuccessComponent from "containers/components/alerts";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import ContainerComponent from "containers/components/layout/container";
import { MDBCard, MDBCardBody, MDBToastContainer, MDBBtn, MDBIcon } from "mdbreact";
import ModalConfirm from "containers/components/modal/confirm-modal";
import DataTable from "react-data-table-component";
import { IState, IProps } from "./propState";
import {
  getAccountsAction,
  updateBankWalletAccountAction,
  removeAccountAction,
  removeWalletAccountAction,
  editWalletAccountAction,
  setAccountsAction,
  setWalletAccountsAction
} from "./ducks/actions";
import { BANK_ACCOUNTS_TABLE, CRYPTO_CURRENCY_TABLE } from "containers/contants/table-data";
import AddBankComponent from "./add-bank-account/component";
import AddCryptoWalletComponent from "./add-crypto-wallet/component";
import ModalCreateConfirm from "containers/components/modal/confirm-create-modal";
import BTCAddressListModalComponent from "./add-crypto-wallet/btc/bitcoin-address-list-modal";
import { BANKS_COUNTRY } from "containers/contants/data";
class IndividualBankWalletComponent extends React.Component<IProps, IState> {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.bankAndWalletAccounts && nextProps.bankAndWalletAccounts !== prevState.listAccounts) {
      const bankAndWalletAccounts = nextProps.bankAndWalletAccounts;
      for (let index = 0; index < nextProps.bankAndWalletAccounts.length; index++) {
        const item = bankAndWalletAccounts[index];
        if (item.tag) {
          bankAndWalletAccounts[index].tag = [item.tag];
        }
      }
      return {
        listAccounts: bankAndWalletAccounts
      };
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      currentData: null,
      isRemove: false,
      isCreate: false,
      isBankAccount: false,
      isAddModalOpen: false,
      isAddCryptoModalOpen: false,
      isPreviewBTCModalOpen: false,
      formActivePanel1: 1,
      allowCationBackup: 0,
      listAccounts: [],
      cryptoWallets: [],
      isAllocation: true,
      isSaving: false,
      isUpdatedSuccess: true,
      rowData: null,
      maxAllocation: false,
      tags: ["Tag bank account"]
    };
  }

  async componentDidMount() {
    await this.getListBankAndWallet();
  }

  async componentDidUpdate() { }

  getListBankAndWallet = async () => {
    this.props.getAccountsAction(this.props.userInfo.user_id, this.isAllocationValid);
  };

  // add edit user
  addNewUser = async isBank => {
    if (isBank) {
      await this.setState({ ...this.state, isAddModalOpen: true });
    } else {
      await this.setState({ ...this.state, isAddCryptoModalOpen: true });
    }
  };

  // \\

  // functions
  changeHandler = async (event: any) => {
    event.persist();
    console.log(event.target.value);
    await this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  allowChangeHandler = async (data, row, isBlur) => {
    if (isBlur) {
      let floatValue = parseFloat(data.target.value.slice(0, -1));
      let allowPercent = 0;
      let allowPercentBackup = 0;
      const listAccounts = [...this.state.listAccounts];
      if (Number.isNaN(floatValue)) {
        await this.setState({ ...this.state, listAccounts });
        return;
      }
      let totalAllocation =
        listAccounts.reduce((accumulator, currentValue) => {
          return accumulator + (row.distribution_id === currentValue.distribution_id ? floatValue : currentValue.allocation);
        }, 0)

      if (totalAllocation && totalAllocation > 100) {
        await this.setState({ ...this.state, listAccounts });
        return;
      }
      //  else {
      //   this.setState({
      //     ...this.state,
      //     isCreate: true,
      //     currentData: row,
      //     isAllocation: allowPercent < 100 ? false : true
      //   });
      // }

      for (let i = 0; i < this.state.listAccounts.length; i++) {
        const item = listAccounts[i];
        if (item.distribution_id === row.distribution_id) {
          allowPercentBackup = parseFloat(listAccounts[i].allocation);
          listAccounts[i].allocation = floatValue;
        }
        allowPercent = allowPercent + parseFloat(listAccounts[i].allocation);
      }

      if (allowPercent <= 100) {
        if (allowPercentBackup !== floatValue) {
          this.setState({
            ...this.state,
            isCreate: true,
            currentData: row,
            isAllocation: allowPercent < 100 ? false : true
          });
        }
      } else {
        // update -->
      }
    }
  };

  isAllocationValid = () => {
    let allowPercent = 0;
    let countAllocation = 0;
    const listAccounts = [...this.state.listAccounts];
    if (listAccounts.length === 0) {
      return;
    }
    for (let i = 0; i < listAccounts.length; i++) {
      const item = listAccounts[i];
      allowPercent = allowPercent + parseFloat(item.allocation);
      if (parseFloat(item.allocation) > 0) {
        countAllocation++;
      }
    }

    if (allowPercent > 100) {
      return false;
    } else {
      this.setState({
        ...this.state,
        isAllocation: allowPercent < 100 ? false : true,
        countAllocation: countAllocation <= 5 ? true : false
      });
      return true;
    }
  };

  hideModal = async (isCloseWithOutSave, isBankAccount) => {
    if (isCloseWithOutSave) {
      this.props.getAccountsAction(this.props.userInfo.user_id, this.isAllocationValid);
      this.isAllocationValid();
    }

    this.setState({ isRemove: false, isCreate: false, isAddModalOpen: false, isAddCryptoModalOpen: false, isPreviewBTCModalOpen: false });

    if (isBankAccount === undefined) {
      return;
    }
    this.props.getAccountsAction(this.props.userInfo.user_id, this.isAllocationValid);
  };

  handleButtonClientClick = async (data, isRemove) => {
    if (isRemove) {
      let bankAccountNumber = "";
      if (data.cryptocurrencywallet_id) {
        bankAccountNumber = data.single_address;
      } else {
        switch (data.country) {
          case BANKS_COUNTRY.USA:
            bankAccountNumber = data.bank_account_number
            break;
          case BANKS_COUNTRY.GB:
            bankAccountNumber = data.iban_number
            break;
          case BANKS_COUNTRY.ARGENTINA:
            bankAccountNumber = data.cbu_number
            break;
          case BANKS_COUNTRY.BRAZIL:
          case BANKS_COUNTRY.CHILE:
            bankAccountNumber = data.account_number
            break;
          default:
            break;
        }
      }
      const accountNumber =
        bankAccountNumber !== undefined ? "**********" + bankAccountNumber.substr(bankAccountNumber.length - 4) : null;
      await this.setState({ isRemove: true, currentData: data, accountNumber });
    } else {
      // preview BTC list
      await this.setState({ ...this.state, isPreviewBTCModalOpen: true, currentData: data });
    }
  };

  handleButtonEmployerClick = async (data, isRemove) => {
    if (!isRemove) {
      await this.setState({ isAddModalOpen: true, currentData: data });
    } else {
      await this.setState({ isRemove: true, currentData: data });
    }
  };

  // handle Add Client Modal

  handleNextPrevClick = a => param => e => {
    console.log(e);
    this.setState({
      ["formActivePanel" + a]: param,
      ["formActivePanel" + a + "Changed"]: true
    });
  };

  handleSubmission = () => {
    alert("Form submitted!");
  };

  calculateAutofocus = a => {
    if (this.state["formActivePanel" + a + "Changed"]) {
      return true;
    }
  };

  handleTagChange = async (data, tag, isAddTag) => {
    // const state = { ...this.state };
    if (tag.value && tag.value.length > 30) {
      await this.setState({ ...this.state, isSaving: false });
      alert("Tags cannot be longer than 30 characters!");
      return;
    }
    await this.setState({ ...this.state, isSaving: true });
    if (isAddTag) {
      this.updateTag(data, tag.value);
    } else {
      this.updateTag(data, "");
    }
  };

  callBackSubmit = async isSuccess => {
    if (!isSuccess) {
      await this.getListBankAndWallet();
    }
    await this.setState({ ...this.state, isSaving: false, isCreate: false, isUpdatedSuccess: isSuccess, isAllocation: true });
    this.isAllocationValid();
  };

  updateTag = async (data, tag) => {
    let dataDetail = { ...data };
    dataDetail["user_id"] = this.props.userInfo.user_id;
    dataDetail["tag"] = tag;
    if (data.distribution_id) {
      if (this.state.listAccounts) {
        const listAccounts = [...this.state.listAccounts];
        for (let index = 0; index < listAccounts.length; index++) {
          const item = listAccounts[index];
          if (item.distribution_id === data.distribution_id) {
            listAccounts[index]["tag"] = tag;
            this.setState({ ...this.state, listAccounts, isSaving: false });
          }
        }
        await this.props.setAccountsAction(this.state.listAccounts);
      }
      await this.props.updateBankWalletAccountAction(dataDetail, this.callBackSubmit);
    }
  };

  updateAllocation = async () => {
    await this.setState({ ...this.state, isSaving: true });
    let dataDetail = {};
    dataDetail = { ...this.state.currentData };
    dataDetail["user_id"] = this.props.userInfo.user_id;
    if (dataDetail["tag"] && dataDetail["tag"].length !== 0) {
      dataDetail["tag"] = dataDetail["tag"][0];
    }
    await this.props.updateBankWalletAccountAction(dataDetail, this.callBackSubmit);
  };

  removeBankAccount = async () => {
    this.props.removeAccountAction(this.props.userInfo.user_id, this.state.currentData.distribution_id, this.hideModal);
  };

  // \\

  public render() {
    const { isRemove, isAddModalOpen, isAddCryptoModalOpen, isCreate, isPreviewBTCModalOpen } = this.state;
    const bankAccounts = this.state.listAccounts.filter(account => account.symbol === undefined);
    const cryptoWallets = this.state.listAccounts.filter(account => account.symbol !== undefined);
    const mainStyle = {
      margin: "0 6%",
      paddingTop: "5.5rem"
    };

    const confirmModal = isRemove ? (
      <ModalConfirm
        show={isRemove}
        modalContent={`Are you sure you want to remove the `}
        content1={`${this.state.currentData.address || this.state.currentData.address_list  ? "Crypto Wallet Address: " : "Bank Name: "} ${this.state.currentData.address ? this.state.currentData.address  : this.state.currentData.bank_name ? this.state.currentData.bank_name :  this.state.currentData.address_list[0]}`}
        modalClosed={this.hideModal}
        modalSubmit={this.removeBankAccount}
        disabled={this.props.isLoading}
        isSuccess={this.props.isSuccess}
      />
    ) : null;

    const createSuccessModal = isCreate ? (
      <ModalCreateConfirm
        show={isCreate}
        modalClosed={this.hideModal}
        modalSubmit={this.updateAllocation}
        disabled={this.props.isLoading}
        isSuccess={this.props.isSuccess}
      />
    ) : null;

    const addBankModal = isAddModalOpen ? (
      <AddBankComponent
        show={isAddModalOpen}
        formActivePanel1={this.state.formActivePanel1}
        modalClosed={this.hideModal}
        getListData={this.getListBankAndWallet}
      />
    ) : null;
    const addCryptoModal = isAddCryptoModalOpen ? (
      <AddCryptoWalletComponent
        show={isAddCryptoModalOpen}
        formActivePanel1={this.state.formActivePanel1}
        modalClosed={this.hideModal}
        getListData={this.getListBankAndWallet}
      />
    ) : null;

    const btcListModal = isPreviewBTCModalOpen && (
      <BTCAddressListModalComponent
        show={isPreviewBTCModalOpen}
        modalClosed={this.hideModal}
        addressList={this.state.currentData}
      />
    );

    return (
      <ContainerComponent>
        {confirmModal}
        {addBankModal}
        {addCryptoModal}
        {createSuccessModal}
        {btcListModal}
        <MDBToastContainer className="toast-content" hideProgressBar={true} newestOnTop={true} autoClose={3000} />
        <main style={mainStyle} className="bank-wallet">
          <MDBCard>
            <MDBCardBody>
              <div>
                <h5>
                  Bank Accounts
                  <MDBBtn
                    tag="a"
                    size="sm"
                    color="primary"
                    floating
                    className="mr-0"
                    onClick={() => this.addNewUser(true)}
                  >
                    <MDBIcon icon="plus" />
                  </MDBBtn>
                </h5>
                <hr />
                <DataTable
                  data={bankAccounts}
                  noHeader={true}
                  columns={BANK_ACCOUNTS_TABLE(
                    this.handleButtonClientClick,
                    this.allowChangeHandler,
                    this.handleTagChange,
                    this.state
                  )}
                  pagination={true}
                />
              </div>
              <div>
                <h5>
                  Cryptocurrency Wallets
                  <MDBBtn
                    tag="a"
                    size="sm"
                    floating
                    color="primary"
                    className="mt-0 mb-0"
                    onClick={() => this.addNewUser(false)}
                  >
                    <MDBIcon icon="plus" />
                  </MDBBtn>
                  {/* <MDBBadge color="info">{listEmployee && listEmployee.length ? listEmployee.length : null}</MDBBadge> */}
                </h5>
                <hr />
                <DataTable
                  data={cryptoWallets}
                  noHeader={true}
                  columns={CRYPTO_CURRENCY_TABLE(
                    this.handleButtonClientClick,
                    this.allowChangeHandler,
                    this.handleTagChange,
                    this.state
                  )}
                  pagination={true}
                />
              </div>
            </MDBCardBody>
          </MDBCard>
        </main>
      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    errorMess: state.common.errMess,
    isLoading: state.common.isLoading,
    userInfo: state.user.userInfo,
    isSuccess: state.common.isSuccess,
    successMessage: state.common.successMessage,
    bankAndWalletAccounts: state.screen.bankAndWalletAccounts.listBankAndWalletAccounts
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAccountsAction,
      updateBankWalletAccountAction,
      removeAccountAction,
      removeWalletAccountAction,
      editWalletAccountAction,
      setAccountsAction,
      setWalletAccountsAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(IndividualBankWalletComponent);
