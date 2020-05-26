// import SuccessComponent from "containers/components/alerts";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
// import { IProps, IState } from "./propState";
import {
  MDBBtn,
  MDBContainer,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBCol,
  MDBRow,
  MDBStepper,
  MDBStep,
  MDBSelect
} from "mdbreact";
import { validateField } from "containers/utils/utils";
import { IProps, IState } from "./propState";
import { addWalletAccountAction, confirmBankAccountAction } from "../ducks/actions";
import { offSuccessAction } from "../../../../containers/redux/actions";
import VerificationComponent from "../../../../containers/components/screen-components/auth/2fa";
import { CRYPTO_CURRENCY } from "containers/contants/data";
import BTCImportMethodComponent from "./btc/single-import-method-address";
import ETHAddAddressComponent from "./eth/add-eth-address";
import BCHAddAddressComponent from "./bch/add-bch-address";
import BTCAddSingleAddressComponent from "./btc/single-add-address";
import BTCAddListAddressComponent from "./btc/list-address";
import _ from 'lodash';
const initialState = {
  distribution_id: "",
  cryptoCurrency: "",
  verificationCode: "",
  formActivePanel1: 1,
  formActivePanel1Changed: false,
  isLoading: false,
  importMethod: "",
  cryptoCurrencyAddress: "",
  countToExpire: 2,
  addCryptoStep: {
    step1: true,
    step2: false,
    step3: false,
    step4: false
  },
  isValidCrypto: true,
  cryptoTypeOptions: [
    {
      text: "BTC - Bitcoin",
      value: "BTC",
      checked: false
    },
    {
      text: "ETH - Ethereum",
      value: "ETH",
      checked: false
    },
    {
      text: "BCH - Bitcoin Cash",
      value: "BCH",
      checked: false
    }
  ],
  importMethodOptions: [
    {
      text: "Single Address",
      value: "single_address",
      checked: false
    },
    {
      text: "Address List",
      value: "address_list",
      checked: false
    }
  ],
  isExited: false,
  formInputValid: {},
  formErrors: {},
  formValid: false
};

class AddCryptoWalletComponent extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    this.reset();
    this.setState({ ...this.state, phoneNumber: this.props.userDetail.phone_number })
    this.props.offSuccessAction("", false);
  }

  reset() {
    const arr = [];
    this.state.cryptoTypeOptions.forEach(item => {
      const bank = {
        value: item.value,
        text: item.text,
        checked: false
      };
      arr.push(bank);
    });
    initialState.cryptoTypeOptions = arr;
    this.setState(initialState);
  }

  formatDataSelect = async () => {
    const arr = [];
    this.state.cryptoTypeOptions.forEach(item => {
      let crypto = {
        value: item.value,
        text: item.text,
        checked: false
      }
      arr.push(crypto)
    });
    await this.setState({ ...this.state, cryptoTypeOptions: arr });
  };

  formatSelected = (data, value) => {
    const arr = [];
    data.forEach(item => {
      const element = {
        checked: item.value === value ? true : false,
        text: item.text,
        value: item.value
      };
      arr.push(element);
    });
    return arr;
  };

  changeHandler = async (event: any) => {
    event.persist();
    await this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  onBlurValid = async (event: any) => {
    this.validate(event.target.type, event.target.value, event.target.name);
  };

  handleSelectChange = async (value, option) => {
    if (option === "cryptoCurrency") {
      const initState = { ...initialState };
      initState[option] = value[0];
      initState.addCryptoStep = {
        step1: true,
        step2: false,
        step3: false,
        step4: false
      };
      initState.importMethodOptions = [
        {
          text: "Single Address",
          value: "single_address",
          checked: false
        },
        {
          text: "Address List",
          value: "address_list",
          checked: false
        }
      ];
      await this.setState(initState);
      this.validateForm();
      return;
    }
    const state = { ...this.state };
    if (value.length !== 0) {
      state[option] = value[0];
      state.formInputValid[`${option}Valid`] = true;
      await this.setState(state);
      this.validateForm();
    }
  };

  callBackSubmit = async (distribution_id?, messErr?) => {
    if (distribution_id) {
      await this.setState({ ...this.state, distribution_id, isLoading: false, accessCodeInValid: false });
      if (this.state.cryptoCurrency === CRYPTO_CURRENCY.BTC) {
        this.changeActive(1, 4);
      } else {
        this.changeActive(1, 3);
      }
    } else {
      await this.setState({ ...this.state, isValidCrypto: messErr ? true : false, isLoading: false, isExited: messErr ? true : false });
    }
  };

  swapFormActive = a => param => async e => {
    console.log(e);
    const state = { ...this.state };
    state["formActivePanel" + a] = param;
    state["formActivePanel" + a + "Changed"] = true;
    state.addCryptoStep["step" + param] = true;
    await this.setState(state);
  };

  changeActive = async (a, param) => {
    const state = { ...this.state };
    state["formActivePanel" + a] = param;
    state["formActivePanel" + a + "Changed"] = true;
    state.addCryptoStep["step" + param] = true;
    await this.setState(state);
  };

  validate = (type, value, field) => {
    const fieldValidationErrors = this.state.formErrors;
    const formInputValid = this.state.formInputValid;
    const validate = validateField(type, value, field);
    formInputValid[`${field}Valid`] = validate.filedValid;
    fieldValidationErrors[field] = validate.fieldValidationErrors;
    this.setState(
      {
        formErrors: fieldValidationErrors,
        formInputValid
      },
      this.validateForm
    );
  };

  validateForm = async () => {
    // const fieldsValid = { ...this.state.formInputValid };
    const fieldsValid = { ...this.state.formInputValid };
    let isValid = fieldsValid.cryptoCurrencyAddressValid;
    await this.setState({
      ...this.state,
      formValid: isValid
    });
  };

  // logic CURD
  submitHandler = async event => {
    event.preventDefault();
    event.target.className += " was-validated";
    if ((this.state.formActivePanel1 === 3 && this.state.cryptoCurrency !== CRYPTO_CURRENCY.BTC) || this.state.formActivePanel1 === 4) {
      this.submitVerification(event);
      return;
    }
    this.setState({ ...this.state, isValidCrypto: true, isLoading: true, isExited: false });
    let dataDetail = {
      user_id: this.props.userInfo.user_id,
      symbol: this.state.cryptoCurrency,
      address: this.state.cryptoCurrencyAddress
    };

    if (this.state.importMethod === "address_list") {
      delete dataDetail.address;
      let mergedArr = null;
      const cryptoAddressWallets = this.props.bankAndWalletAccounts.filter(account => account.address).map(item => item.address);
      const cryptoListAddressWallets = this.props.bankAndWalletAccounts.filter(account => account.address_list).map(item => item.address_list).map(item => item);
      const listAddress = this.state.cryptoCurrencyAddress.replace(/ +?/g, "").split("\n");
      const duplicates = _.filter(listAddress, (value, index, iteratee) => _.includes(iteratee, value, index + 1));
      if (duplicates && duplicates.length !== 0) {
        this.setState({ ...this.state, isExited: true });
        return;
      }
      if (cryptoListAddressWallets && cryptoListAddressWallets.length !== 0) {
        mergedArr = [].concat.apply([], cryptoListAddressWallets);
      }
      const isEqualSingle = _.intersectionWith(cryptoAddressWallets, listAddress, _.isEqual);
      const isEqualList = _.intersectionWith(mergedArr, listAddress, _.isEqual);
      if (isEqualSingle.length !== 0 || isEqualList.length !== 0) {
        this.setState({ ...this.state, isExited: true });
        return;
      }
      dataDetail["address_list"] = listAddress;
      this.props.addWalletAccountAction(dataDetail, this.state.cryptoCurrency, this.callBackSubmit);
    } else {
      this.props.addWalletAccountAction(dataDetail, this.state.cryptoCurrency, this.callBackSubmit);
    }
  };

  submitVerification = event => {
    event.preventDefault();
    this.setState({ ...this.state, accessCodeInValid: false });
    if (this.state.verificationCode === "") {
      return;
    }
    this.props.confirmBankAccountAction(
      this.props.userInfo.user_id,
      this.state.distribution_id,
      this.state.verificationCode,
      this.callBackVerify
    );
  };
  reSendCode = () => {
    this.props.resendCodeAddBankAction(this.state.distribution_id, this.props.userInfo.username, this.countSmsExpire);
  };

  countSmsExpire = (countSMS) => {
    if (countSMS) {
      this.setState({ ...this.state, countToExpire: countSMS });
      if (countSMS === 0) {
        this.reset();
        setTimeout(() => {
          this.props.modalClosed();
        }, 3000);
      }
    }
  }

  callBackVerify = (isSuccess?) => {
    if (isSuccess) {
      this.props.getListData();
      this.props.modalClosed();
    } else {
      this.setState({ ...this.state, accessCodeInValid: true });
    }
  };

  public render() {
    const { cryptoCurrency, cryptoTypeOptions, addCryptoStep } = this.state;
    return (
      <MDBContainer>
        <MDBModal
          className="modal-1000 stepper add-bank-modal"
          size="lg"
          isOpen={this.props.show}
          toggle={this.props.modalClosed}
        >
          <MDBModalHeader titleClass="w-100" tag="h5">
            {"Add Cryptocurrency Wallet"}
          </MDBModalHeader>
          <MDBModalBody className="text-center">
            <form className="needs-validation" noValidate onSubmit={this.submitHandler}>
              <MDBStepper vertical>
                <MDBStep className={addCryptoStep.step1 ? "completed" : ""}>
                  <a href="#formstep1" onClick={this.swapFormActive(1)(1)}>
                    <span className="circle">1</span>
                    <span className="label">Step 1</span>
                  </a>
                  {this.state.formActivePanel1 === 1 && (
                    <div className="step-content">
                      <MDBCol md="8">
                        {/* <MDBIcon icon="chevron-down" /> */}
                        <MDBSelect
                          className="text-left mt-0"
                          options={cryptoTypeOptions}
                          selected={`Select Cryptocurrency`}
                          name="cryptoCurrency"
                          label="Select Cryptocurrency"
                          getValue={event => this.handleSelectChange(event, "cryptoCurrency")}
                          value={cryptoCurrency}
                          icon="chevron-down"
                        />
                        <MDBBtn
                          style={{ float: "left", marginLeft: 0 }}
                          onClick={this.swapFormActive(1)(2)}
                          color="primary"
                          disabled={!cryptoCurrency}
                        >
                          Continue
                        </MDBBtn>
                      </MDBCol>
                    </div>
                  )}
                </MDBStep>
                <MDBStep className={addCryptoStep.step2 ? "completed" : "disable-link"}>
                  <a href="#formstep2" onClick={this.swapFormActive(1)(2)}>
                    <span className="circle">2</span>
                    <span className="label">Step 2</span>
                  </a>
                  {this.state.formActivePanel1 === 2 && (
                    <div className="step-content">
                      {cryptoCurrency === CRYPTO_CURRENCY.BTC && (
                        <BTCImportMethodComponent
                          nextStep={this.swapFormActive(1)(3)}
                          inputChange={this.changeHandler}
                          onBlurChange={this.onBlurValid}
                          handleSelectChange={this.handleSelectChange}
                          data={this.state}
                        />
                      )}
                      {cryptoCurrency === CRYPTO_CURRENCY.ETH && (
                        <ETHAddAddressComponent
                          nextStep={this.swapFormActive(1)(3)}
                          inputChange={this.changeHandler}
                          onBlurChange={this.onBlurValid}
                          data={this.state}
                        />
                      )}
                      {cryptoCurrency === CRYPTO_CURRENCY.BCH && (
                        <BCHAddAddressComponent
                          nextStep={this.swapFormActive(1)(3)}
                          inputChange={this.changeHandler}
                          onBlurChange={this.onBlurValid}
                          data={this.state}
                        />
                      )}
                    </div>
                  )}
                </MDBStep>
                <MDBStep className={addCryptoStep.step3 ? "completed" : "disable-link"}>
                  <a href="#formstep3" onClick={this.swapFormActive(1)(3)}>
                    <span className="circle">3</span>
                    <span className="label">Step 3</span>
                  </a>
                  {this.state.formActivePanel1 === 3 && (
                    <div className="step-content">
                      {cryptoCurrency === CRYPTO_CURRENCY.BTC ? (
                        this.state.importMethod === "address_list" ?
                          <BTCAddListAddressComponent
                            nextStep={this.swapFormActive(1)(4)}
                            inputChange={this.changeHandler}
                            onBlurChange={this.onBlurValid}
                            data={this.state}
                          /> :
                          <BTCAddSingleAddressComponent
                            nextStep={this.swapFormActive(1)(4)}
                            inputChange={this.changeHandler}
                            onBlurChange={this.onBlurValid}
                            data={this.state}
                          />
                      ) : <VerificationComponent
                          submitVerification={this.submitVerification}
                          inputChange={this.changeHandler}
                          onBlurChange={this.onBlurValid}
                          data={this.state}
                          isLoading={this.props.isLoading}
                          phoneNumber={this.state.phoneNumber}
                        />}
                    </div>
                  )}
                </MDBStep>
                {cryptoCurrency === CRYPTO_CURRENCY.BTC && (
                  <MDBStep className={addCryptoStep.step4 ? "completed" : "disable-link"}>
                    <a href="#formstep4" onClick={this.swapFormActive(1)(4)}>
                      <span className="circle">4</span>
                      <span className="label">Step 4</span>
                    </a>
                    {this.state.formActivePanel1 === 4 && (
                      <div className="step-content">
                        <VerificationComponent
                          submitVerification={this.submitVerification}
                          inputChange={this.changeHandler}
                          onBlurChange={this.onBlurValid}
                          data={this.state}
                          isLoading={this.props.isLoading}
                          phoneNumber={this.state.phoneNumber}
                        />
                      </div>
                    )}
                  </MDBStep>
                )}
                <MDBRow className="mt-1">
                  <MDBCol md="12" className="text-right">
                    <MDBBtn color="primary" outline onClick={() => this.props.modalClosed(false)}>
                      Cancel
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBStepper>
            </form>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    message: state.common.errMess,
    isLoading: state.common.isLoading,
    userInfo: state.user.userInfo,
    isSuccess: state.common.isSuccess,
    successMessage: state.common.successMessage,
    userDetail: state.user.userDetail,
    bankAndWalletAccounts: state.screen.bankAndWalletAccounts.listBankAndWalletAccounts
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ offSuccessAction, addWalletAccountAction, confirmBankAccountAction }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddCryptoWalletComponent);
