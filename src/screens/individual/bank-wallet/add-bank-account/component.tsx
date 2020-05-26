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
import {
  addBankAccountAction,
  confirmBankAccountAction,
  resendCodeAddBankAction
} from "../ducks/actions";
import { offSuccessAction } from "../../../../containers/redux/actions";
import USABankDetailComponent from "./usa-account/usa-bank-detail";
import SEPADetailComponent from "./uk-and-sepa-zone-account/sepa-bank-detail";
import UKDetailComponent from "./uk-and-sepa-zone-account/uk-bank-detail";
import BrazilBankDetailComponent from "./brazil-account/brazil-bank-detail";
import MexicoBankDetailComponent from "./mexico-account/mexico-bank-detail";
import ArgentinaBankDetailComponent from "./argentina-acccont/argentina-bank-detail";
import UkraineBankDetailComponent from "./ukraine-account/ukraine-bank-detail";
import ChileBankDetailComponent from "./chile-account/chile-bank-detail";
import VerificationComponent from "../../../../containers/components/screen-components/auth/2fa";
import { BANKS_TYPE, BANKS_COUNTRY, BANKS_FLAG } from "containers/contants/data";
import { CHILEANBANKS, BRAZIL_BANKS } from "containers/contants/list-banks";
import { INIT_BANK_ACCOUNT } from "containers/contants";
const initialState = INIT_BANK_ACCOUNT;
class AddBankComponent extends React.Component<IProps, IState> {
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
    BANKS_TYPE.forEach(item => {
      const bank = {
        value: item.value,
        text: item.text,
        icon: BANKS_FLAG[item.value],
        checked: false
      };
      arr.push(bank);
    });
    initialState.bankTypeOptions = arr;
    this.setState(initialState);
  }

  formatDataSelect = (options) => {
    const arr = [];
    options.forEach(element => {
      const item = {
        text: element.text,
        value: element.value,
        checked: false
      };
      arr.push(item);
    });
    return arr;
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
    if (option === "bankType") {
      const initState = { ...initialState };
      initState[option] = value[0];
      initState.addBankStep = {
        step1: true,
        step2: false,
        step3: false,
      };
      initState.formInputValid = {
        numeroDoBancoValid: false,
        agenciaValid: false,
        contaValid: false,
        accountOwnerCPFValid: false,
        agenciaDigitValid: false,
        contaDigitValid: false,
        identificationTypeValid: false,
        identificationNumberValid: false,
        taxIdentificationValid: false,
        countryTaxValid: false,
        socialSecurityValid: false,
        routingNumberValid: false,
        accountOwnerValid: false,
        CUITNumberValid: true,
        DNINumberValid: true,
        CBUNumberValid: true,
        bankNameValid: false,
        bankNumberValid: false,
        accountNumberValid: false,
        accountOwnerCPFOrCNPJValid: false,
        accountTypeValid: false,
        RUTNumberValid: false,
        bankAccountTypeValid: false,
        CLABENumberValid: false,
        federalTaxIdValid: false,
        SWIFTNumberValid: false,
        ibanNumberValid: false,
        repeatIbanNumberValid: false,
        cardNumberValid: false,
        cardOwnerNameValid: false,
        repeatCardNumberValid: false,
        validUntilValid: false,
        repeatBankAccountNumberValid: false,
        bankAccountNumberValid: false
      };

      initState.accountTypeOptions = this.formatDataSelect(this.state.accountTypeOptions);
      initState.brazilAccountType = this.formatDataSelect(this.state.brazilAccountType);
      initState.chileAccountType = this.formatDataSelect(this.state.chileAccountType);
      initState.identificationMexico = this.formatDataSelect(this.state.identificationMexico);
      initState.identificationUK = this.formatDataSelect(this.state.identificationUK);
      initState.identificationArg = this.formatDataSelect(this.state.identificationArg);

      await this.setState(initState);
      if ((value && value[0] === BANKS_COUNTRY.CHILE) || value[0] === BANKS_COUNTRY.BRAZIL) {
        this.formatData();
      }

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

  callBackSubmit = async (pendingDistributionId?, responseMess?) => {
    if (pendingDistributionId) {
      await this.setState({ ...this.state, pendingDistributionId, isLoading: false, accessCodeInValid: false });
      this.changeActive(1, 3);
    } else {
      this.setState({ ...this.state, isValidNumber: false, isLoading: false, responseMess });
    }
  };

  swapFormActive = a => param => async e => {
    console.log(e);
    const state = { ...this.state };
    state["formActivePanel" + a] = param;
    state["formActivePanel" + a + "Changed"] = true;
    state.addBankStep["step" + param] = true;
    await this.setState(state);
  };

  changeActive = async (a, param) => {
    const state = { ...this.state };
    state["formActivePanel" + a] = param;
    state["formActivePanel" + a + "Changed"] = true;
    state.addBankStep["step" + param] = true;
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
    const fieldsValid = { ...this.state.formInputValid };
    let isValid = false;
    switch (this.state.bankType) {
      case BANKS_COUNTRY.USA:
        isValid = await this.isFormUSAValid(fieldsValid);
        break;
      case BANKS_COUNTRY.SEPA:
        isValid = await this.isSEPAValid(fieldsValid);
        break;
      case BANKS_COUNTRY.GB:
        isValid = await this.isUKValid(fieldsValid);
        break;
      case BANKS_COUNTRY.BRAZIL:
        isValid = await this.isFormBrazilValid(fieldsValid);
        break;
      case BANKS_COUNTRY.MEXICO:
        isValid =
          fieldsValid.accountOwnerValid &&
          fieldsValid.CLABENumberValid &&
          fieldsValid.identificationNumberValid &&
          fieldsValid.identificationTypeValid;
        break;
      case BANKS_COUNTRY.ARGENTINA:
        isValid =
          fieldsValid.accountOwnerValid &&
          fieldsValid.CBUNumberValid &&
          fieldsValid.identificationNumberValid &&
          fieldsValid.identificationTypeValid;
        break;
      case BANKS_COUNTRY.UKRAINE:
        isValid =
          fieldsValid.identificationNumberValid &&
          fieldsValid.cardNumberValid &&
          fieldsValid.cardOwnerNameValid &&
          fieldsValid.validUntilValid &&
          fieldsValid.repeatCardNumberValid &&
          this.state.cardNumber === this.state.repeatCardNumber;
        break;
      case BANKS_COUNTRY.CHILE:
        isValid = await this.isFormChileValid(fieldsValid);
        break;
      default:
        break;
    }
    await this.setState({
      ...this.state,
      formValid: isValid
    });
  };

  isFormChileValid = field => {
    return (
      field.accountOwnerValid &&
      field.RUTNumberValid &&
      field.accountNumberValid &&
      field.SWIFTNumberValid &&
      field.accountTypeValid
    );
  };

  isSEPAValid = field => {
    return (
      field.accountOwnerValid &&
      field.ibanNumberValid &&
      field.repeatIbanNumberValid &&
      field.countryTaxValid &&
      field.taxIdentificationValid &&
      this.state.ibanNumber === this.state.repeatIbanNumber
    );
  };

  isUKValid = field => {
    return (
      field.accountOwnerValid &&
      field.ibanNumberValid &&
      field.repeatIbanNumberValid &&
      field.identificationTypeValid &&
      field.identificationNumberValid &&
      this.state.ibanNumber === this.state.repeatIbanNumber
    );
  };

  isFormUSAValid = field => {
    return (
      field.routingNumberValid &&
      field.accountOwnerValid &&
      field.accountTypeValid &&
      field.bankAccountNumberValid &&
      this.state.bankAccountNumber === this.state.repeatBankAccountNumber
    );
  };

  isFormBrazilValid = field => {
    return (
      field.accountOwnerValid &&
      field.numeroDoBancoValid &&
      field.agenciaValid &&
      field.contaValid &&
      field.accountOwnerCPFValid &&
      field.contaDigitValid &&
      field.accountTypeValid
    );
  };

  formatData = async () => {
    const bankOptions = [];
    switch (this.state.bankType) {
      case BANKS_COUNTRY.USA:
        break;
      case BANKS_COUNTRY.SEPA:
      case BANKS_COUNTRY.GB:
      case BANKS_COUNTRY.BRAZIL:
        for (const key in BRAZIL_BANKS) {
          if (BRAZIL_BANKS.hasOwnProperty(key)) {
            const item = BRAZIL_BANKS[key];
            const bankOption = {
              text: item.banco,
              value: item.banco
            };
            bankOptions.push(bankOption);
          }
        }
        await this.setState({ ...this.state, brazilBankOptions: bankOptions });
        break;
      case BANKS_COUNTRY.MEXICO:
        break;
      case BANKS_COUNTRY.ARGENTINA:
        break;
      case BANKS_COUNTRY.UKRAINE:
        break;
      case BANKS_COUNTRY.CHILE:
        for (const key in CHILEANBANKS) {
          if (CHILEANBANKS.hasOwnProperty(key)) {
            const item = CHILEANBANKS[key];
            const bankOption = {
              text: item.bank_name,
              value: item.bank_name
            };
            bankOptions.push(bankOption);
          }
        }
        await this.setState({ ...this.state, chileBankOptions: bankOptions });
        break;
      default:
        break;
    }
  };

  // logic CURD
  submitHandler = async event => {
    event.preventDefault();
    event.target.className += " was-validated";
    if (this.state.formActivePanel1 === 3) {
      this.submitVerification(event);
      return;
    }
    this.setState({ ...this.state, isValidNumber: true, isLoading: true, responseMess: "" });
    let dataDetail = {};
    switch (this.state.bankType) {
      case BANKS_COUNTRY.USA:
        dataDetail = {
          user_id: this.props.userInfo.user_id,
          us_ssn: this.state.socialSecurity,
          aba: this.state.routingNumber,
          // us_ein: this.state.accountOwner,
          account: this.state.bankAccountNumber,
          account_owner: this.state.accountOwner,
          account_type: this.state.accountType
        };
        this.props.addBankAccountAction(dataDetail, "usd/account", this.callBackSubmit);
        break;
      case BANKS_COUNTRY.SEPA:
        dataDetail = {
          user_id: this.props.userInfo.user_id,
          country: this.state.countryTax,
          eu_tin: this.state.taxIdentification,
          iban: this.state.ibanNumber,
          account_owner: this.state.accountOwner,
        };
        this.props.addBankAccountAction(dataDetail, "eur/iban", this.callBackSubmit);
        break;
      case BANKS_COUNTRY.GB:
        dataDetail = {
          user_id: this.props.userInfo.user_id,
          // company_reg_num: this.state.identificationNumber,
          iban: this.state.ibanNumber,
          account_owner: this.state.accountOwner
        };
        this.state.identificationType === "NINO" ? dataDetail["nino"] = this.state.identificationNumber : dataDetail["utr"] = this.state.identificationNumber;
        this.props.addBankAccountAction(dataDetail, "gbp/iban", this.callBackSubmit);
        break;
      case BANKS_COUNTRY.BRAZIL:
        const regCNPJ = /\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}/g;
        const isCNPJ = regCNPJ.test(this.state.accountOwnerCPF);
        dataDetail = {
          user_id: this.props.userInfo.user_id,
          account_owner: this.state.accountOwner,
          bank_code: this.state.numeroDoBanco,
          branch: this.state.agencia,
          // branch_digit: this.state.agenciaDigit,
          account: this.state.conta,
          account_digit: this.state.contaDigit,
          account_type: this.state.accountType
        };
        this.state.agenciaDigit ? dataDetail["branch_digit"] = this.state.agenciaDigit : null;
        isCNPJ === true ? dataDetail["cnpj"] = this.state.accountOwnerCPF : dataDetail["cpf"] = this.state.accountOwnerCPF;
        this.props.addBankAccountAction(dataDetail, "brl/account", this.callBackSubmit);
        break;
      case BANKS_COUNTRY.MEXICO:
        dataDetail = {
          user_id: this.props.userInfo.user_id,
          account_owner: this.state.accountOwner,
          clabe: this.state.CLABENumber
        };
        this.state.identificationType === "RFC" ? dataDetail["rfc"] = this.state.identificationNumber : dataDetail["curp"] = this.state.identificationNumber;
        this.props.addBankAccountAction(dataDetail, "mxn/clabe", this.callBackSubmit);
        break;
      case BANKS_COUNTRY.ARGENTINA:
        dataDetail = {
          user_id: this.props.userInfo.user_id,
          account_owner: this.state.accountOwner,
          cbu: this.state.CBUNumber
        };
        this.state.identificationType === "CUIT" ? dataDetail["cuit"] = this.state.identificationNumber : dataDetail["dni"] = this.state.identificationNumber;
        this.props.addBankAccountAction(dataDetail, "ars/cbu", this.callBackSubmit);
        break;
      case BANKS_COUNTRY.UKRAINE:
        dataDetail = {
          user_id: this.props.userInfo.user_id,
          tin: this.state.identificationNumber,
          card: this.state.cardNumber.split(" ").join(""),
          card_owner_name: this.state.cardOwnerName,
          card_expiry: this.state.validUntil.split("/").join("")
        };
        this.props.addBankAccountAction(dataDetail, "uah/card", this.callBackSubmit);
        break;
      case BANKS_COUNTRY.CHILE:
        dataDetail = {
          user_id: this.props.userInfo.user_id,
          account_owner: this.state.accountOwner,
          rut: this.state.RUTNumber,
          swift_number: this.state.SWIFTNumber,
          account: this.state.accountNumber,
          account_type: this.state.accountType
        };
        this.props.addBankAccountAction(dataDetail, "clp/account", this.callBackSubmit);
        break;
      default:
        break;
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
      this.state.pendingDistributionId,
      this.state.verificationCode,
      this.callBackVerify
    );
  };
  reSendCode = () => {
    this.props.resendCodeAddBankAction(this.state.uid, this.props.userInfo.username, this.countSmsExpire);
  };

  countSmsExpire = countSMS => {
    if (countSMS) {
      this.setState({ ...this.state, countToExpire: countSMS });
      if (countSMS === 0) {
        this.reset();
        setTimeout(() => {
          this.props.modalClosed();
        }, 3000);
      }
    }
  };

  callBackVerify = (isSuccess?) => {
    if (isSuccess) {
      this.props.getListData();
      this.props.modalClosed();
    } else {
      this.setState({ ...this.state, accessCodeInValid: true });
    }
  };

  public render() {
    const { bankType, bankTypeOptions, addBankStep } = this.state;
    return (
      <MDBContainer>
        <MDBModal
          className="modal-1000 stepper add-bank-modal"
          size="lg"
          isOpen={this.props.show}
          toggle={this.props.modalClosed}
        >
          <MDBModalHeader titleClass="w-100" tag="h5">
            {"Add Bank Account"}
          </MDBModalHeader>
          <MDBModalBody className="text-center">
            <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
              <MDBStepper vertical>
                <MDBStep className={addBankStep.step1 ? "completed" : ""}>
                  <a href="#formstep1" onClick={this.swapFormActive(1)(1)}>
                    <span className="circle">1</span>
                    <span className="label">Step 1</span>
                  </a>
                  {this.state.formActivePanel1 === 1 && (
                    <div className="step-content">
                      <MDBCol md="8">
                        {/* <MDBIcon icon="chevron-down" /> */}
                        <MDBSelect
                          className="text-left mt-0 country-bank"
                          options={bankTypeOptions}
                          selected={`Select country`}
                          name="bankType"
                          label="Select Country"
                          getValue={event => this.handleSelectChange(event, "bankType")}
                          value={bankType}
                          icon="chevron-down"
                        />
                        <MDBBtn
                          disabled={bankType === ""}
                          style={{ float: "left", marginLeft: 0 }}
                          onClick={this.swapFormActive(1)(2)}
                          color="primary"
                        >
                          Continue
                        </MDBBtn>
                      </MDBCol>
                    </div>
                  )}
                </MDBStep>
                <MDBStep className={addBankStep.step2 ? "completed" : "disable-link"}>
                  <a href="#formstep2" onClick={this.swapFormActive(1)(2)}>
                    <span className="circle">2</span>
                    <span className="label">Step 2</span>
                  </a>
                  {this.state.formActivePanel1 === 2 && (
                    <div className="step-content">
                      {/* should disable input button when user get bankName success. */}
                      {/* {bankType === BANKS_COUNTRY.USA && (
                        <RoutingNumberControl
                          inputChange={this.changeHandler}
                          onBlurChange={this.onBlurValid}
                          getBankName={this.getBankName}
                          isRoutingSuccess={this.state.isRoutingSuccess}
                          data={this.state}
                          isRoutingLoading={this.state.isRoutingLoading}
                        />
                      )} */}
                      {bankType === BANKS_COUNTRY.USA && (
                        <USABankDetailComponent
                          nextStep={this.swapFormActive(1)(4)}
                          inputChange={this.changeHandler}
                          onBlurChange={this.onBlurValid}
                          data={this.state}
                          handleSelectChange={this.handleSelectChange}
                        />
                      )}

                      {bankType === BANKS_COUNTRY.SEPA && (
                        <SEPADetailComponent
                          nextStep={this.swapFormActive(1)(3)}
                          inputChange={this.changeHandler}
                          onBlurChange={this.onBlurValid}
                          data={this.state}
                          handleSelectChange={this.handleSelectChange}
                        />
                      )}

                      {bankType === BANKS_COUNTRY.GB && (
                        <UKDetailComponent
                          nextStep={this.swapFormActive(1)(3)}
                          inputChange={this.changeHandler}
                          onBlurChange={this.onBlurValid}
                          data={this.state}
                          handleSelectChange={this.handleSelectChange}
                        />
                      )}
                      {bankType === BANKS_COUNTRY.BRAZIL && (
                        <BrazilBankDetailComponent
                          nextStep={this.swapFormActive(1)(3)}
                          inputChange={this.changeHandler}
                          onBlurChange={this.onBlurValid}
                          handleSelectChange={this.handleSelectChange}
                          data={this.state}
                        />
                      )}
                      {bankType === BANKS_COUNTRY.MEXICO && (
                        <MexicoBankDetailComponent
                          nextStep={this.swapFormActive(1)(3)}
                          inputChange={this.changeHandler}
                          onBlurChange={this.onBlurValid}
                          data={this.state}
                          handleSelectChange={this.handleSelectChange}
                        />
                      )}
                      {bankType === BANKS_COUNTRY.ARGENTINA && (
                        <ArgentinaBankDetailComponent
                          nextStep={this.swapFormActive(1)(3)}
                          inputChange={this.changeHandler}
                          onBlurChange={this.onBlurValid}
                          data={this.state}
                          handleSelectChange={this.handleSelectChange}
                        />
                      )}
                      {bankType === BANKS_COUNTRY.UKRAINE && (
                        <UkraineBankDetailComponent
                          nextStep={this.swapFormActive(1)(3)}
                          inputChange={this.changeHandler}
                          onBlurChange={this.onBlurValid}
                          data={this.state}
                          handleSelectChange={this.handleSelectChange}
                        />
                      )}
                      {bankType === BANKS_COUNTRY.CHILE && (
                        <ChileBankDetailComponent
                          nextStep={this.swapFormActive(1)(3)}
                          inputChange={this.changeHandler}
                          onBlurChange={this.onBlurValid}
                          handleSelectChange={this.handleSelectChange}
                          data={this.state}
                        />
                      )}
                    </div>
                  )}
                </MDBStep>
                <MDBStep className={addBankStep.step3 ? "completed" : "disable-link"}>
                  <a href="#formstep3" onClick={this.swapFormActive(1)(3)}>
                    <span className="circle">3</span>
                    <span className="label">Step 3</span>
                  </a>
                  {this.state.formActivePanel1 === 3 && (
                    <div className="step-content">
                      <VerificationComponent
                        submitVerification={this.submitVerification}
                        inputChange={this.changeHandler}
                        reSendCode={this.reSendCode}
                        onBlurChange={this.onBlurValid}
                        data={this.state}
                        isLoading={this.props.isLoading}
                        phoneNumber={this.state.phoneNumber}
                      />
                    </div>
                  )}
                </MDBStep>
                {/* {bankType === BANKS_COUNTRY.USA && (
                  <MDBStep className={addBankStep.step4 ? "completed" : "disable-link"}>
                    <a href="#formstep4" onClick={this.swapFormActive(1)(4)}>
                      <span className="circle">4</span>
                      <span className="label">Step 4</span>
                    </a>
                    {this.state.formActivePanel1 === 4 && (
                      <div className="step-content">
                        <VerificationComponent
                          submitVerification={this.submitVerification}
                          reSendCode={this.reSendCode}
                          inputChange={this.changeHandler}
                          onBlurChange={this.onBlurValid}
                          data={this.state}
                          isLoading={this.props.isLoading}
                          phoneNumber={this.state.phoneNumber}
                        />
                      </div>
                    )}
                  </MDBStep>
                )} */}

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
    userDetail: state.user.userDetail
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      offSuccessAction,
      addBankAccountAction,
      confirmBankAccountAction,
      resendCodeAddBankAction
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddBankComponent);
