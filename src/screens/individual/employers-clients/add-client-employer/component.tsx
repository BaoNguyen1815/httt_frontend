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
  MDBInput,
  MDBRow,
  MDBStepper,
  MDBStep,
  MDBSelect,
  MDBAlert,
  MDBSpinner
} from "mdbreact";
import NumberFormat from "react-number-format";
import moment from "moment/moment";
import { EXPECTED_VOLUME, PAYMENT_METHOD, PAYROLL_CURRENCY, PAYROLL_FREQUENCY } from "containers/contants/data";
import { validateField } from "containers/utils/utils";
import { IProps, IState } from "./propState";
import { JOB_ROLE } from "containers/contants/job-role";
import { COUNTRY_IOS2 } from "containers/contants/country-ios2";
import Select, { createFilter } from "react-select";
import { individualEditEmployerAction, individualEditClientAction } from "../ducks/actions";
import { getEmployer, getClient } from "../services";
import { offSuccessAction, nextPageAction } from "../../../../containers/redux/actions";
import Skeleton from "react-loading-skeleton";
import Cleave from "cleave.js/dist/cleave-react";
import sessionStorage from "redux-persist/es/storage/session";
const initialState = {
  name: "",
  website: "",
  jobRole: "",
  otherJobRole: "",
  isOther: false,
  payrollCurrency: null,
  nextPayroll: "",
  payrollFrequency: null,
  payrollPaymentType: null,
  paymentAmount: "",
  paymentPercent: "",
  employerPays: null,
  invoiceCurrency: null,
  expectedVolume: null,
  paymentType: null,
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  formActivePanel1: 1,
  formActivePanel1Changed: false,
  expectedOptions: EXPECTED_VOLUME,
  payMethodOptions: PAYMENT_METHOD,
  payrollCurrencyOptions: PAYROLL_CURRENCY,
  payrollFrequencyOptions: PAYROLL_FREQUENCY,
  currency: "$",
  isEmployer: null,
  currentUser: null,
  role: null,
  employeeRole: "",
  options: [
    {
      text: "Client",
      value: "client"
    },
    {
      text: "Employer",
      value: "employer"
    }
  ],
  countryOptions: [],
  selectedOption: null,
  jobRoleOptions: JOB_ROLE,
  formInputValid: {
    nameValid: false,
    websiteValid: true,
    jobRoleValid: false,
    otherJobRoleValid: false,
    payrollCurrencyValid: false,
    nextPayrollValid: true,
    payrollFrequencyValid: false,
    payrollPaymentTypeValid: false,
    paymentAmountValid: false,
    paymentPercentValid: false,
    invoiceCurrencyValid: false,
    expectedVolumeValid: false,
    paymentTypeValid: false,
    streetValid: false,
    cityValid: false,
    stateValid: false,
    zipValid: false,
    countryValid: false
  },
  formErrors: {},
  formValid: false
};

class EditUserComponent extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    await this.setState({
      ...this.state,
      isEmployer: this.props.isEmployer,
      formActivePanel1: 2
    });
    if (this.props.userData) {
      let currentUser;
      if (this.props.isEmployer) {
        currentUser = await getEmployer(this.props.userInfo.user_id, this.props.userData.employer_id);
        if (currentUser) {
          this.setState({
            ...this.state,
            currentUser,
            jobRole: currentUser.job_role,
            name: currentUser.name,
            paymentAmount: currentUser.payment_amount,
            payrollCurrency: currentUser.payroll_currency,
            nextPayroll: moment(currentUser.next_payroll).format("MM-DD-YYYY"),
            payrollFrequency: currentUser.payroll_frequency,
            payrollPaymentType: currentUser.payroll_payment_type,
            website: currentUser.website,
            // currency,
            formInputValid: {
              nameValid: true,
              websiteValid: true,
              jobRoleValid: true,
              otherJobRoleValid: true,
              payrollCurrencyValid: true,
              nextPayrollValid: true,
              payrollFrequencyValid: true,
              payrollPaymentTypeValid: true,
              paymentAmountValid: true,
              paymentPercentValid: true
            },
            formValid: true
          });
        }
      } else {
        if (this.props.userData && this.props.userData.expected_volume && this.props.userData.street) {
          currentUser = this.props.userData;
        } else {
          currentUser = await getClient(this.props.userInfo.user_id, this.props.userData.client_id);
        }
        if (currentUser) {
          this.setState({
            ...this.state,
            currentUser,
            jobRole: currentUser.job_role,
            name: currentUser.name,
            invoiceCurrency: currentUser.invoice_currency,
            paymentType: currentUser.payment_type,
            website: currentUser.website,
            expectedVolume: currentUser.expected_volume,
            street: currentUser.street,
            city: currentUser.city,
            state: currentUser.state,
            zip: currentUser.zip,
            country: currentUser.country,
            formInputValid: {
              nameValid: true,
              websiteValid: true,
              jobRoleValid: true,
              otherJobRoleValid: true,
              invoiceCurrencyValid: true,
              paymentTypeValid: true,
              expectedVolumeValid: true,
              streetValid: true,
              cityValid: true,
              stateValid: true,
              zipValid: true,
              countryValid: true
            },
            formValid: true
          });
        }
      }
    } else {
      this.reset();
    }
    this.formatDataSelect();
    this.props.offSuccessAction("", false);

  }

  reset() {
    this.setState(initialState);
  }

  formatDataSelect = async () => {
    let isOther = true;
    const options = COUNTRY_IOS2;
    const state = { ...this.state };
    const employee = this.props.isEmployer ? "employer" : "client";
    const role = state.options;
    const arrRole = [];
    const arrCountry = [];
    role.forEach(item => {
      const element = {
        checked: item.value === employee ? true : false,
        text: item.text,
        value: item.value
      };
      arrRole.push(element);
    });

    await JOB_ROLE.forEach(item => {
      if (item.value === state.jobRole) {
        isOther = false;
        state.selectedOption = item;
      }
    });

    if (isOther && this.props.userData !== null) {
      state.isOther = true;
      state.otherJobRole = this.state.jobRole;
      state.formInputValid.otherJobRoleValid = true;
    }

    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const element = {
          checked: key === this.state.country ? true : false,
          // checked: false,
          text: options[key],
          value: key
        };
        arrCountry.push(element);
      }
    }
    state.countryOptions = arrCountry;
    if (this.props.isEmployer) {
      state.payrollCurrencyOptions = this.formatSelected(PAYROLL_CURRENCY, state.payrollCurrency);
      state.payrollFrequencyOptions = this.formatSelected(PAYROLL_FREQUENCY, state.payrollFrequency);
      state.payMethodOptions = this.formatSelected(PAYMENT_METHOD, state.payrollPaymentType);
    } else {
      state.payrollCurrencyOptions = this.formatSelected(PAYROLL_CURRENCY, state.invoiceCurrency);
      state.payMethodOptions = this.formatSelected(PAYMENT_METHOD, state.paymentType);
      state.expectedOptions = this.formatSelected(EXPECTED_VOLUME, state.expectedVolume);
    }
    state.options = arrRole;
    await this.setState(state);
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

  datePickerChange = date => {
    if (date === null) {
      return;
    }
    const state = { ...this.state };
    state.nextPayroll = moment(date).format("YYYY-MM-DD");
    state.formInputValid.nextPayrollValid = true;
    this.setState(state);
  };

  changeHandler = async (event: any) => {
    event.persist();
    await this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  onBlurValid = async (event: any) => {
    if (event.target.name === "paymentAmount" || event.target.name === "paymentPercent") {
      if (event.target.value === "") {
        this.validate(event.target.type, event.target.value, event.target.name);
        await this.setState({
          ...this.state,
          paymentAmountValid: false,
          paymentPercentValid: false
        });

        return;
      }
      if (event.target.name === "paymentAmount") {
        const floatValue = this.state.paymentAmount;
        this.validate(event.target.type, floatValue, event.target.name);
        if (floatValue >= 10 && floatValue <= 200000) {
          await this.setState({
            ...this.state,
            paymentAmountValid: true
          });
        } else {
          await this.setState({
            ...this.state,
            paymentAmountValid: false
          });
        }
      } else {
        const floatValue = this.state.paymentPercent;
        this.validate(event.target.type, floatValue, event.target.name);
        if (floatValue >= 0 && floatValue <= 100) {
          await this.setState({
            ...this.state,
            paymentPercentValid: true
          });
        } else {
          await this.setState({
            ...this.state,
            paymentPercentValid: false
          });
        }
      }
    } else {
      this.validate(event.target.type, event.target.value, event.target.name);
    }
  };

  onDateChange = async (event: any) => {
    const state = { ...this.state };
    let formatDate = null;
    if (event.target.value !== "") {
      formatDate = moment(event.target.value).format("YYYY-MM-DD");
    }
    if (moment(formatDate, "YYYY-MM-DD", true).isValid() && !moment(formatDate).isBefore(moment(), "day")) {
      state.nextPayroll = event.target.value;
      state.formInputValid.nextPayrollValid = true;
      this.validate(event.target.type, formatDate, event.target.name);
      await this.setState(state);
    } else {
      state.formInputValid.nextPayrollValid = false;
      await this.setState(state);
    }
  };

  handleSelectChange = async (value, option) => {
    const state = { ...this.state };
    if (value.length === 0 && option !== "") {
      const arrRole = [];
      state.options.forEach(item => {
        const element = {
          checked: item.value === state.employeeRole ? true : false,
          text: item.text,
          value: item.value
        };
        arrRole.push(element);
      });
      state.options = arrRole;
      await this.setState(state);
      return;
    }
    if (value.length !== 0) {
      state[option] = value[0];
      state.formInputValid[`${option}Valid`] = true;
      if (option === "employeeRole") {
        value[0] === "employer" ? (state.isEmployer = true) : (state.isEmployer = false);
      }
      await this.setState(state);
      this.validateForm();
    }
  };

  callBackSubmit = async () => {
    const isInvoiceWorkflow = await sessionStorage.getItem("invoiceWorkflow");
    this.props.modalClosed();
    if (isInvoiceWorkflow !== null && !this.state.isEmployer && this.props.clients && this.props.clients.length < 1) {
      this.props.nextPageAction("/individual/create-invoice");
    }
  };

  swapFormActive = a => param => e => {
    console.log(e);
    this.setState({
      ["formActivePanel" + a]: param,
      ["formActivePanel" + a + "Changed"]: true
    });
  };

  handleChange = async (selectedOption) => {
    const state = { ...this.state };
    state.jobRole = selectedOption.value;
    state.selectedOption = selectedOption;
    state.formInputValid.jobRoleValid = true;
    await this.setState(state);
    this.validateForm();
  };

  paymentAmountChange = async (data, type) => {
    let { floatValue } = data;
    if (data.value === "") {
      floatValue = "";
    }
    await this.setState({
      ...this.state,
      paymentAmount: type === "paymentAmount" ? floatValue : "",
      paymentPercent: type === "paymentAmount" ? "" : floatValue,
      paymentAmountValid: true,
      paymentPercentValid: true
    });
  };

  changeOtherJob = async () => {
    const state = { ...this.state };
    state.isOther = !this.state.isOther;
    state.formInputValid.jobRoleValid = this.state.jobRole && !state.iOther ? true : false;
    state.formInputValid.otherJobRoleValid = this.state.otherJobRole && state.iOther ? true : false;
    await this.setState(state);
    this.validateForm();
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
    if (this.state.isEmployer) {
      isValid =
        fieldsValid.nameValid &&
        fieldsValid.websiteValid &&
        (fieldsValid.jobRoleValid || fieldsValid.otherJobRoleValid) &&
        fieldsValid.payrollCurrencyValid &&
        fieldsValid.nextPayrollValid &&
        fieldsValid.payrollFrequencyValid &&
        fieldsValid.payrollPaymentTypeValid &&
        (this.state.paymentAmountValid || this.state.paymentPercentValid);
    } else {
      isValid =
        fieldsValid.nameValid &&
        fieldsValid.websiteValid &&
        (fieldsValid.jobRoleValid || fieldsValid.otherJobRoleValid) &&
        fieldsValid.invoiceCurrencyValid &&
        fieldsValid.expectedVolumeValid &&
        fieldsValid.paymentTypeValid &&
        fieldsValid.streetValid &&
        fieldsValid.stateValid &&
        fieldsValid.zipValid &&
        fieldsValid.countryValid &&
        fieldsValid.cityValid;
    }
    await this.setState({
      ...this.state,
      formValid: isValid
    });
  };

  submitHandler = async event => {
    event.preventDefault();
    event.target.className += " was-validated";
    if (this.state.isEmployer) {
      const employerDetail = {
        user_id: this.props.userInfo.user_id,
        employer_id: this.props.userData ? this.props.userData.employer_id : null,
        name: this.state.name,
        website: this.state.website,
        job_role: this.state.isOther ? this.state.otherJobRole : this.state.jobRole,
        payroll_currency: this.state.payrollCurrency,
        next_payroll: moment(this.state.nextPayroll).format("YYYY-MM-DD"), // YYYY-MM-DD.
        payroll_frequency: this.state.payrollFrequency,
        payroll_payment_type: this.state.payrollPaymentType,
        payment_amount:
          this.state.paymentAmount !== "" ? this.state.paymentAmount.toString() : this.state.paymentPercent.toString()
      };
      this.props.individualEditEmployerAction(employerDetail, this.callBackSubmit);
    } else {
      const clientDetail = {
        user_id: this.props.userInfo.user_id,
        client_id: this.props.userData ? this.props.userData.client_id : null,
        name: this.state.name,
        website: this.state.website,
        job_role: this.state.isOther ? this.state.otherJobRole : this.state.jobRole,
        invoice_currency: this.state.invoiceCurrency,
        payment_type: this.state.paymentType,
        expected_volume: this.state.expectedVolume,
        street: this.state.street,
        city: this.state.city,
        country: this.state.country,
        state: this.state.state,
        zip: this.state.zip
      };
      this.props.individualEditClientAction(clientDetail, this.callBackSubmit);
    }
  };

  public render() {
    const {
      payMethodOptions,
      expectedOptions,
      payrollCurrencyOptions,
      name,
      website,
      payrollCurrency,
      nextPayroll,
      payrollFrequency,
      payrollPaymentType,
      paymentAmount,
      invoiceCurrency,
      expectedVolume,
      paymentType,
      street,
      city,
      state,
      zip,
      country,
      paymentPercent,
      selectedOption,
      payrollFrequencyOptions,
      currentUser,
      currency
    } = this.state;
    const userType = this.state.isEmployer ? "Employer" : "Client";
    const isEditUser = this.props.userData !== null ? true : false;
    const isLoadingSk = currentUser || !isEditUser;
    return (
      <MDBContainer>
        <MDBModal className="modal-1000 stepper" size="lg" isOpen={this.props.show} toggle={this.props.modalClosed}>
          <MDBModalHeader titleClass="w-100" tag="h5">
            {isEditUser ? "Edit" : "Add new "} {userType}
          </MDBModalHeader>
          <MDBModalBody className="text-center">
            <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
              <MDBStepper vertical className={this.props.userData !== null ? "is-edited" : ""}>
                <MDBStep className="completed" hidden={this.props.userData !== null}>
                  <a href="#formstep1" onClick={this.swapFormActive(1)(1)} hidden={this.props.userData !== null}>
                    <span className="circle">1</span>
                    <span className="label">Step 1</span>
                  </a>
                  {this.state.formActivePanel1 === 1 && (
                    <div className="step-content">
                      <MDBCol md="8">
                        {/* <MDBIcon icon="chevron-down" /> */}
                        <MDBSelect
                          className="text-left mt-0"
                          options={this.state.options}
                          selected={`Select ${userType}`}
                          label="Do you want to add a Client or Employer?"
                          getValue={event => this.handleSelectChange(event, "employeeRole")}
                          value={this.props.employeeRole}
                          icon="chevron-down"
                        />
                      </MDBCol>
                    </div>
                  )}
                </MDBStep>
                <MDBStep className="active">
                  <a href="#formstep2" onClick={this.swapFormActive(1)(2)} hidden={this.props.userData !== null}>
                    <span className="circle">2</span>
                    <span className="label">Step 2</span>
                  </a>
                  {this.state.formActivePanel1 === 2 && (
                    <div className={this.props.userData !== null ? "is-edited-user" : "step-content"}>
                      <MDBRow md="12">
                        <MDBCol md="6" className="mt-4" hidden={isLoadingSk}>
                          <Skeleton height={35} count={5} />
                        </MDBCol>
                        <MDBCol md="6" hidden={!isLoadingSk}>
                          <MDBInput
                            label={`${userType} Name`}
                            className="mt-4"
                            value={name}
                            name="name"
                            onChange={this.changeHandler}
                            type="text"
                            onBlur={this.onBlurValid}
                            required
                          />
                          <span className={selectedOption ? "fake-label" : "none"}>Job Role</span>
                          <Select
                            isDisabled={this.state.isOther}
                            filterOption={createFilter({ ignoreAccents: false })}
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={this.state.jobRoleOptions}
                            className="react-select-1"
                            placeholder="Job Role"
                            styles={customStyles}
                          />
                          <div className="md-form text-left pl-0 other-job">
                            <MDBInput
                              label="Other job role"
                              getValue={this.changeOtherJob}
                              value={this.state.isOther}
                              checked={this.state.isOther}
                              type="checkbox"
                              id="otherJob"
                            />
                            <div hidden={!this.state.isOther}>
                              <MDBInput
                                label="Job role"
                                className="mt-4"
                                value={this.state.otherJobRole}
                                name="otherJobRole"
                                onChange={this.changeHandler}
                                type="text"
                                onBlur={this.onBlurValid}
                              />
                            </div>
                          </div>
                          <div hidden={!this.state.isEmployer} className="form-date-picker">
                            <span className={nextPayroll ? "fake-label" : "fake-label"}>Next payroll</span>
                            {/* <input
                              className="date-type md-form"
                              value={nextPayroll}
                              onChange={this.changeHandler}
                              onBlur={event => this.onDateChange(event)}
                              type="date"
                              name="nextPayroll"
                              pattern="\d{4}/\d{2}/\d{2}"
                              required
                            /> */}
                            <Cleave
                              className="date-type md-form"
                              placeholder="mm/dd/yyyy"
                              value={nextPayroll}
                              options={{ date: true, datePattern: ["m", "d", "Y"] }}
                              onChange={this.changeHandler}
                              name="nextPayroll"
                              onBlur={event => this.onDateChange(event)}
                            />
                            {!this.state.formInputValid.nextPayrollValid ? (
                              <div className="invalid-feedback block">
                                Next Payroll cannot be in the past. Please try again..
                              </div>
                            ) : null}
                          </div>
                          <MDBSelect
                            hidden={!this.state.isEmployer}
                            className="text-left mt-4"
                            options={payMethodOptions}
                            selected={`Select pay`}
                            label="Employer pays using "
                            getValue={event => this.handleSelectChange(event, "payrollPaymentType")}
                            value={payrollPaymentType}
                          />
                          {this.state.isEmployer ? null : (
                            <>
                              <MDBSelect
                                className="text-left mt-4"
                                options={payrollCurrencyOptions}
                                selected={`Select currency`}
                                label="Invoice Currency"
                                getValue={event => this.handleSelectChange(event, "invoiceCurrency")}
                                value={invoiceCurrency}
                              />
                              <MDBSelect
                                className="text-left mt-4"
                                options={expectedOptions}
                                selected={`Select volume`}
                                label="Expected volume (per transaction)"
                                getValue={event => this.handleSelectChange(event, "expectedVolume")}
                                value={expectedVolume}
                              />
                              <MDBSelect
                                className="text-left mt-4"
                                options={payMethodOptions}
                                selected={`Select currency`}
                                label="Client pays using"
                                getValue={event => this.handleSelectChange(event, "paymentType")}
                                value={paymentType}
                              />
                            </>
                          )}
                        </MDBCol>
                        <MDBCol md="6" className="mt-4" hidden={isLoadingSk}>
                          <Skeleton height={35} count={6} />
                        </MDBCol>
                        <MDBCol md="6" hidden={!isLoadingSk}>
                          <MDBInput
                            label={`${userType} Website`}
                            className={
                              !this.state.formInputValid.websiteValid && website !== "" ? "mt-4 is-invalid" : "mt-4"
                            }
                            value={website}
                            name="website"
                            placeholder="https://example.com"
                            pattern="https?://.+"
                            onChange={this.changeHandler}
                            type="url"
                            onBlur={this.onBlurValid}
                            required
                          >
                            <div className="invalid-feedback">Please enter a valid url</div>
                          </MDBInput>
                          {this.state.isEmployer ? null : (
                            <>
                              <MDBSelect
                                search
                                className="text-left mt-4"
                                options={this.state.countryOptions}
                                selected={`Select country`}
                                label="Country"
                                getValue={event => this.handleSelectChange(event, "country")}
                                value={country}
                              />
                              <MDBInput
                                label="State"
                                className="mt-4"
                                value={state}
                                name="state"
                                onChange={this.changeHandler}
                                type="text"
                                onBlur={this.onBlurValid}
                                required
                              />
                              <MDBInput
                                label="City"
                                className="mt-4"
                                value={city}
                                name="city"
                                onChange={this.changeHandler}
                                type="text"
                                onBlur={this.onBlurValid}
                                required
                              />
                              <MDBInput
                                label="Street"
                                className="mt-4"
                                value={street}
                                name="street"
                                onChange={this.changeHandler}
                                type="text"
                                onBlur={this.onBlurValid}
                                required
                              />
                              <MDBInput
                                label="ZipCode"
                                className="mt-4"
                                value={zip}
                                name="zip"
                                onChange={this.changeHandler}
                                type="text"
                                onBlur={this.onBlurValid}
                                required
                              />
                            </>
                          )}

                          <MDBSelect
                            hidden={!this.state.isEmployer}
                            className="text-left mt-0"
                            options={payrollCurrencyOptions}
                            selected={`Select Currency`}
                            label="Payroll Currency"
                            getValue={event => this.handleSelectChange(event, "payrollCurrency")}
                            value={payrollCurrency}
                          />
                          <MDBSelect
                            hidden={!this.state.isEmployer}
                            className="text-left mt-4"
                            options={payrollFrequencyOptions}
                            selected={`Select Frequency`}
                            label="Payroll Frequency"
                            getValue={event => this.handleSelectChange(event, "payrollFrequency")}
                            value={payrollFrequency}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow md="12" hidden={!this.state.isEmployer || !isLoadingSk} style={{ marginTop: "-25px" }}>
                        <MDBCol md="6">
                          <div className="md-form amount-number" style={{ marginTop: 36 }}>
                            <span className={paymentAmount ? "fake-label" : "none"}>
                              How much of the net pay check do you want to send to Bitwage?
                            </span>
                            <NumberFormat
                              disabled={paymentPercent !== ""}
                              name="paymentAmount"
                              className="date-type"
                              placeholder="How much of the net pay check do you want to send to Bitwage?"
                              value={paymentAmount}
                              onBlur={this.onBlurValid}
                              thousandSeparator={true}
                              prefix={currency}
                              onValueChange={values => this.paymentAmountChange(values, "paymentAmount")}
                            />
                            {!this.state.paymentAmountValid && paymentAmount !== "" ? (
                              <div className="invalid-feedback block">
                                Please enter an amount above $10. For amounts above $200,000 contact{" "}
                                <a
                                  href="https://bitwage.helpscoutdocs.com/"
                                  target="_blank"
                                  style={{ display: "inline", padding: 0 }}
                                >
                                  Bitwage support.
                                </a>
                              </div>
                            ) : null}
                          </div>
                        </MDBCol>
                        <MDBCol md="1" disabled={paymentPercent !== "" || paymentAmount !== ""}>
                          <p className="mt-5">Or</p>
                        </MDBCol>
                        <MDBCol md="4" style={{ marginTop: 35 }}>
                          <NumberFormat
                            disabled={paymentAmount !== ""}
                            md="6"
                            name="paymentPercent"
                            className="date-type"
                            placeholder="%"
                            value={paymentPercent}
                            onBlur={this.onBlurValid}
                            thousandSeparator={true}
                            suffix={"%"}
                            onValueChange={values => this.paymentAmountChange(values, "paymentPercent")}
                          />

                          {!this.state.paymentPercentValid && paymentPercent !== "" ? (
                            <div className="invalid-feedback block">The maximum percentage allowed is 100.</div>
                          ) : null}
                        </MDBCol>
                      </MDBRow>
                      <MDBRow md="12" center>
                        <MDBRow md="6">
                          {/* <MDBAlert color="warning">Not correct</MDBAlert> */}
                          {this.props.isSuccess ? (
                            <MDBAlert color="success">{this.props.successMessage}</MDBAlert>
                          ) : null}
                        </MDBRow>
                      </MDBRow>
                    </div>
                  )}
                </MDBStep>
                <MDBRow className="mt-1">
                  <MDBCol md="12" className="text-right">
                    <MDBBtn color="primary" outline onClick={this.props.modalClosed}>
                      {sessionStorage.getItem("invoiceWorkflow") !== null ? "Confirm" : "Cancel"}
                    </MDBBtn>
                    <MDBBtn
                      hidden={this.state.formActivePanel1 === 2}
                      onClick={this.swapFormActive(1)(2)}
                      color="primary"
                    >
                      Next{" "}
                    </MDBBtn>
                    <MDBBtn
                      hidden={this.state.formActivePanel1 === 1}
                      color="primary"
                      disabled={!this.state.formValid || this.props.isLoading}
                      type="submit"
                    >
                      {sessionStorage.getItem("invoiceWorkflow") !== null ? "Update Client" : "Submit"}
                      {this.props.isLoading ? <MDBSpinner small /> : null}
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
    clients: state.screen.individualUser.listBpiContracts.clients
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ individualEditEmployerAction, individualEditClientAction, offSuccessAction, nextPageAction }, dispatch);
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
    textAlign: "left",
    borderColor: state.isSelected ? "red" : null
  }),
  control: provided => ({
    ...provided,
    borderRadius: "0px",
    fontSize: "14px",
    borderTop: "0px",
    borderLeft: "0px",
    borderRight: "0px",
    marginBottom: "2rem"
  }),
  valueContainer: provided => ({
    ...provided,
    paddingLeft: "0px"
  }),
  indicatorSeparator: provided => ({
    ...provided,
    width: "0px"
  }),
  singleValue: provided => ({
    ...provided,
    color: "black",
    fontSize: "16px"
  })
};
export default connect(mapStateToProps, mapDispatchToProps)(EditUserComponent);
