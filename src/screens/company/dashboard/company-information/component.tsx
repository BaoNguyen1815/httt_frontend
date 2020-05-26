import { MDBRow, MDBCol, MDBAlert, MDBBtn, MDBInput, MDBSelect, MDBSpinner, MDBFileInput, MDBIcon } from "mdbreact";
import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { validateField, checkFileType, getBase64 } from "containers/utils/utils";
import { COUNTRY_IOS2, REG_OPT_AML, REG_OPT_SEC } from "containers/contants/country-ios2";
import { IProps, IState } from "./propState";
import { editComBasicAction, getCompanyProfileAction, editUserInformation, getCompanyAdvanceAction } from "../ducks/actions";
import { offSuccessAction } from "../../../../containers/redux/actions";
import DataLoadingComponent from "containers/components/loading/data-loading";
import { getLinkImage } from "screens/company/settings/services";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

class CompanyInfoComponent extends React.Component<IProps, IState> {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.companyDetail && nextProps.companyDetail !== prevState.companyDetail) {
      const company = nextProps.companyDetail;
      let owner_name = [];
      let objChange = {};
      objChange = {
        email: company.email,
        phoneNumber: company.phone_number,
        phoneCountry: company.phone_country,
        entityLegalName: company.legal_name,
        companyDBA: company.dba,
        companyEIN: company.ein,
        website: company.website_url,
        regulatoryAML: company.regulatory_aml,
        securities: company.regulatory_securities,
        streetAddress: company.street_address,
        city: company.city,
        state: company.state,
        zip: company.zip,
        country: company.country,
        companyDetail: nextProps.companyDetail,
        owner_name,
        formInputValid: {
          entityLegalNameValid: true,
          emailValid: true,
          phoneNumberValid: true,
          companyEINValid: true,
          companyDBAValid: true,
          websiteValid: true,
          regulatoryAMLValid: true,
          securitiesValid: true,
          streetAddressValid: true,
          cityValid: true,
          stateValid: true,
          zipValid: true,
          countryValid: true
        },
        // formValid: true
      };
      for (const property in company) {
        if (property.indexOf("owner_name_") !== -1) {
          if (company[property] !== "0") {
            let owner = { [property]: company[property] }
            owner_name.push(owner);
            objChange[property] = company[property];
          }
        }
      }
      return objChange;

    }
    if (nextProps.companyAdvance && nextProps.companyAdvance !== prevState.companyAdvance) {
      return {
        companyAdvance: nextProps.companyAdvance
      }
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phoneNumber: "",
      phoneCountry: "",
      entityLegalName: "",
      // dateOfBirth: "",
      companyEIN: "",
      companyDBA: "",
      website: "",
      regulatoryAML: "",
      securities: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      base64_image: null,
      isValidState: false,
      options: null,
      category: "proofofresidency",
      owner_name: [{ owner_name_1: "" }],
      owner_name_1: "",
      owner_name_2: "",
      owner_name_3: "",
      owner_name_4: "",
      companyDetail: null,
      companyAdvance: null,
      regulatoryOptAML: null,
      regulatoryOpt: null,
      imageIds: null,
      formErrors: {
        entityLegalName: "",
        // dateOfBirth: "",
        companyEIN: "",
        companyDBA: "",
        website: "",
        regulatoryAML: "",
        securities: "",
        street: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      },
      formInputValid: {
        entityLegalNameValid: false,
        emailValid: false,
        phoneNumberValid: false,
        companyEINValid: false,
        companyDBAValid: false,
        websiteValid: false,
        regulatoryAMLValid: false,
        securitiesValid: false,
        streetAddressValid: false,
        cityValid: false,
        stateValid: false,
        zipValid: false,
        countryValid: false,
      },
      formValid: false,
      isFileFormat: true
    };
  }
  async componentDidMount() {
    if (this.props.isCopProfile && this.props.userInfo.company_id !== null) {
      await this.props.getCompanyProfileAction(this.props.userInfo.user_id, this.props.userInfo.company_id);
    } else {
      await this.setState({
        ...this.state,
        regulatoryOptAML: REG_OPT_AML,
        regulatoryOpt: REG_OPT_SEC
      })
    }
    this.formatDataSelect();
    if (this.props.adminDetail && this.props.adminDetail.image_id_list !== null) {
      await this.setState({ ...this.state, imageIds: this.props.adminDetail.image_id_list });
    }
  }
  async componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.companyDetail && this.props.companyDetail !== prevProps.companyDetail) {
      let companyDetail = this.props.companyDetail;
      await this.formatDataSelect();
      await this.setState({
        ...this.state,
        regulatoryOptAML: this.selectedOptions(REG_OPT_AML, companyDetail.regulatory_aml),
        regulatoryOpt: this.selectedOptions(REG_OPT_SEC, companyDetail.regulatory_securities)
      });
    }
  }

  componentWillUnmount() {
    this.props.offSuccessAction("", false);
  }

  selectedOptions = (arr, selected) => {
    arr.forEach((element, index) => {
      if (element.value === selected) {
        arr[index].checked = true;
      }
    });
    return arr;
  };

  formatDataSelect = () => {
    const options = COUNTRY_IOS2;
    const arr = [];
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const element = {
          checked: key === this.state.country ? true : false,
          text: options[key],
          value: key
        };
        arr.push(element);
      }
    }
    this.setState({ ...this.state, options: arr });
  };

  changeHandler = async (event: any) => {
    event.persist();
    await this.setState(
      {
        ...this.state,
        [event.target.name]: event.target.value
      }
    );
  };

  onBlurValid = (event: any) => {
    this.validate(event.target.type, event.target.value, event.target.name);
  };

  handleSelectChange = async (value, option) => {
    const state = { ...this.state };
    if (value.length !== 0) {
      switch (option) {
        case "regulatoryAML":
          state.formInputValid.regulatoryAMLValid = true;
          break;
        case "securities":
          state.formInputValid.securitiesValid = true;
          break;
        case "country":
          state.formInputValid.countryValid = true;
          state.phoneCountry = value[0];
          break;
        default:
          break;
      }
    }
    state[option] = value[0];
    await this.setState(state);
  };

  validateStateForm = obj => {
    Object.entries(obj).forEach(([key, value]) => {
      if (key === "company_id") return;
      this.validate("text", value, key);
    });
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

  validateForm = () => {
    const isValid = this.isIndividualsValid();
    if (!isValid || this.state.base64_image === null) {
      this.setState({ formValid: false });
      return;
    }
    this.setState({
      formValid:
        this.state.formInputValid.entityLegalNameValid &&
        this.state.formInputValid.emailValid &&
        this.state.formInputValid.phoneNumberValid &&
        this.state.formInputValid.companyEINValid &&
        this.state.formInputValid.companyDBAValid &&
        this.state.formInputValid.websiteValid &&
        this.state.formInputValid.regulatoryAMLValid &&
        this.state.formInputValid.securitiesValid &&
        this.state.formInputValid.streetAddressValid &&
        this.state.formInputValid.cityValid &&
        this.state.formInputValid.stateValid &&
        this.state.formInputValid.zipValid &&
        this.state.formInputValid.countryValid
    });
  };

  isIndividualsValid = () => {
    let isValid = true;
    if (this.state.owner_name) {
      const individualName = { ...this.state.owner_name };
      // tslint:disable-next-line:forin
      for (const key in individualName) {
        const value = individualName[key];
        const stateKey = Object.keys(value)[0];
        if (this.state[stateKey] === "") {
          isValid = false;
        }
      }
    }
    return isValid;
  };

  submitHandler = async event => {
    event.preventDefault();
    event.target.className += " was-validated";
    let userDetail = {};
    let fileUpload = {};
    userDetail = {
      user_id: this.props.userInfo.user_id,
      legal_name: this.state.entityLegalName,
      ein: this.state.companyEIN,
      dba: this.state.companyDBA,
      website_url: this.state.website,
      regulatory_aml: this.state.regulatoryAML,
      regulatory_securities: this.state.securities,
      phone_country: this.state.phoneCountry,
      email: this.state.email,
      street_address: this.state.streetAddress,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      country: this.state.country ? this.state.country : "",
      phone_number: this.state.phoneNumber
    };

    fileUpload = {
      user_id: this.props.userInfo.user_id,
      base64_image: this.state.base64_image,
      category: this.state.category
    };

    if (this.props.userInfo.company_id) {
      userDetail["company_id"] = this.props.userInfo.company_id;
      fileUpload["company_id"] = this.props.userInfo.company_id;
    }

    if (this.state.owner_name) {
      const individualName = { ...this.state.owner_name };
      // tslint:disable-next-line:forin
      for (const key in individualName) {
        const value = individualName[key];
        const stateKey = Object.keys(value)[0];
        userDetail[stateKey] = this.state[stateKey];
      }
    }
    await this.validateStateForm(userDetail);
    if (!this.state.formValid) {
      return;
    }
    this.props.editComBasicAction(userDetail, this.props.userInfo, fileUpload);
  };

  closeMessage = () => {
    this.props.offSuccessAction("", false);
  }

  async appendInput(event) {
    event.persist();
    const key = `owner_name_${this.state.owner_name.length + 1}`;
    const newInput = { [key]: "" };
    await this.setState(prevState => ({
      ...this.state,
      owner_name: prevState.owner_name.concat(newInput),
      [key]: ""
    }));
    this.validateForm();
  }

  onChangeHandleFile = async files => {
    const file = files[0];
    if (checkFileType(file.type, file.size)) {
      getBase64(file, result => {
        this.setState(
          {
            base64_image: result,
            isFileFormat: true
          },
          this.validateForm
        );
      });
    } else {
      this.setState(
        {
          base64_image: null,
          isFileFormat: false
        },
        this.validateForm
      );
    }
  };

  previewImage = async () => {
    let imageId = null;
    if (this.state.companyAdvance.image_ids) {
      imageId = this.state.companyAdvance.image_ids["proofofresidency"];
      var newTab = window.open();
      const results = await getLinkImage(imageId, this.props.userInfo.user_id);
      newTab.document.body.innerHTML = `<img src="${results.content}">`;
    }
  }

  selectCountry(val) {
    const state = { ...this.state };
    state.formInputValid.countryValid = true;
    state.country = val;
    state.phoneCountry = val;
    this.setState(state);
  }

  selectRegion(val) {
    const state = { ...this.state };
    state.formInputValid.stateValid = true;
    state.state = val;
    this.setState(state);
  }

  public render() {
    return (
      <form hidden={!this.props.isShow} className="needs-validation company-information" onSubmit={this.submitHandler} noValidate>
        <DataLoadingComponent />
        <MDBRow hidden={this.props.isDataLoading}>
          <MDBCol md="12" hidden={this.props.isCopProfile}>
            <h4>STEP 1 - COMPANY INFORMATION</h4>
            <p>
              Our verification process consists of 2 steps. In Step 1, we ask you to provide information about the
              company you want to enroll. In Step 2, we ask to provide info about the account admin. You may choose to
              skip step 2 and discover features of our platform first. Both steps need to be completed before inviting
              employees to the platform.{" "}
            </p>
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              value={this.state.entityLegalName}
              name="entityLegalName"
              onChange={this.changeHandler}
              type="text"
              id="materialFormRegisterNameEx"
              label="Entity Legal Name"
              onBlur={this.onBlurValid}
              required
            />
            {/* <div className="form-date-picker">
              <label>Date of birth</label>
              <DatePicker
                selected={this.state.dateOfBirth ? new Date(this.state.dateOfBirth) : null}
                onChange={date => this.datePickerChange(date)}
                maxDate={new Date()}
                placeholderText="Click to select a date"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                className="date-picker"
              />
            </div> */}
            <MDBInput
              value={this.state.companyDBA}
              name="companyDBA"
              onChange={this.changeHandler}
              onBlur={this.onBlurValid}
              type="text"
              label="DBA"
              required
            />

            <MDBInput
              value={this.state.companyEIN}
              name="companyEIN"
              onChange={this.changeHandler}
              onBlur={this.onBlurValid}
              type="text"
              id="materialFormRegisterEmailEx2"
              label="EIN"
              required
            >
              <div className="invalid-feedback">Please provide a valid EIN.</div>
            </MDBInput>

            <MDBInput
              value={this.state.website}
              onChange={this.changeHandler}
              onBlur={this.onBlurValid}
              type="text"
              name="website"
              label="Website"
              required
            >
              <div className="invalid-feedback">Please provide a valid website.</div>
            </MDBInput>

            <MDBSelect
              search
              options={this.state.regulatoryOptAML}
              selected="Select your regulatory AML"
              label="Regulatory AML"
              getValue={event => this.handleSelectChange(event, "regulatoryAML")}
              value={this.state.regulatoryAML}
            />

            <MDBSelect
              search
              options={this.state.regulatoryOpt}
              selected="Select your regulatory securities"
              label="Regulatory Securities"
              getValue={event => this.handleSelectChange(event, "securities")}
              value={this.state.securities}
            />

            {this.state.owner_name.map((input, index) => (
              <MDBInput
                value={this.state[`owner_name_${index + 1}`]}
                onChange={this.changeHandler}
                onBlur={this.onBlurValid}
                type="text"
                name={`owner_name_${index + 1}`}
                label={`Names ${index + 1} of individuals with at least 25% ownership`}
                required
                key={index + input}
              >
                <div className="invalid-feedback">Please provide a valid Names of individuals.</div>
              </MDBInput>
            ))}
            <MDBBtn
              size="sm"
              onClick={event => this.appendInput(event)}
              disabled={this.state.owner_name.length === 4}
              tag="a"
              floating
              color="primary"
              style={{ float: "right", marginTop: -65 }}
            >
              <MDBIcon icon="plus" />
            </MDBBtn>
          </MDBCol>
          <MDBCol md="6" className="detail-page-validation">
            <MDBInput
              value={this.state.phoneNumber}
              onChange={this.changeHandler}
              onBlur={this.onBlurValid}
              type="number"
              name="phoneNumber"
              label="Company Phone number"
              required
            >
              <div className="invalid-feedback">Please provide a valid phone.</div>
            </MDBInput>
            <MDBInput
              value={this.state.email}
              onChange={this.changeHandler}
              onBlur={this.onBlurValid}
              type="email"
              name="email"
              label="Company E-mail"
            />
            <span className="fake-label country-label">Country</span>
            <CountryDropdown
              defaultOptionLabel="Choose your Country"
              classes="country-dropdown"
              value={this.state.country}
              valueType="short"
              onChange={(val) => this.selectCountry(val)} />
            <span className="fake-label ">State</span>
            <RegionDropdown
              blankOptionLabel="Choose your State"
              defaultOptionLabel="Choose your State"
              classes="country-dropdown mb-10 state-dropdown"
              countryValueType="short"
              country={this.state.country}
              value={this.state.state}
              onChange={(val) => this.selectRegion(val)} />
            {/* <MDBSelect
              search
              options={this.state.options}
              selected="Select your Country"
              label="Country"
              getValue={event => this.handleSelectChange(event, "country")}
              value={this.state.country}
              checked={this.state.country === "VN" ? true : false}
              required
            />
            <MDBInput
              value={this.state.state}
              onChange={this.changeHandler}
              onBlur={this.onBlurValid}
              type="text"
              name="state"
              label="State"
              required
            >
              <div className="invalid-feedback">Please provide a valid State.</div>
            </MDBInput> */}
            <MDBInput
              value={this.state.city}
              onChange={this.changeHandler}
              onBlur={this.onBlurValid}
              type="text"
              name="city"
              label="City"
              required
            >
              <div className="invalid-feedback">Please provide a valid City.</div>
            </MDBInput>
            <MDBInput
              value={this.state.streetAddress}
              onChange={this.changeHandler}
              onBlur={this.onBlurValid}
              type="text"
              name="streetAddress"
              label="Street"
              required
            >
              <div className="invalid-feedback">Please provide a valid Street.</div>
            </MDBInput>
            <MDBInput
              value={this.state.zip}
              onChange={this.changeHandler}
              onBlur={this.onBlurValid}
              type="text"
              name="zip"
              label="Zip"
              required
            >
              <div className="invalid-feedback">Please provide a valid Zip.</div>
            </MDBInput>
            <MDBCol md="12">
              <h5>Proof of address</h5>
              <p>(utility bill, bank statement, other supporting document)</p>
            </MDBCol>
            <MDBRow>
              <MDBCol md="10">
                <MDBFileInput textFieldTitle={this.state.companyAdvance !== null ? "Uploaded" : "No file chosen"} className="m-0" getValue={this.onChangeHandleFile} />
              </MDBCol>

              <MDBCol md="2">
                <MDBIcon
                  hidden={this.state.companyAdvance === null}
                  far
                  size="lg"
                  icon="eye"
                  className="mt-40"
                  color="primary-color"
                  onClick={() => {
                    this.previewImage();
                  }}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="12" className="mt-2">
                {this.props.error ? (
                  <MDBAlert color="danger" className="alert-label" dismiss>
                    {this.props.errorMess}
                  </MDBAlert>
                ) : null}
                {this.props.isSuccess ? (
                  <MDBAlert color="success" dismiss>
                    Successfully saved!
                  </MDBAlert>
                ) : null}
                {this.state.isFileFormat ? null : (
                  <MDBAlert color="warning" className="alert-label" dismiss>
                    This type of document is not valid, please try again
                  </MDBAlert>
                )}
              </MDBCol>
            </MDBRow>
            <br />
            <br />
            <MDBBtn
              disabled={this.props.isLoading || !this.state.formValid}
              color="primary"
              className="detail-button"
              type="submit"
              style={{ width: "180px", float: "right" }}
            >
              {this.props.isCopProfile ? "Save changes" : "Submit Step 1"}
              {this.props.isLoading ? <MDBSpinner small /> : null}
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    errorMess: state.common.errMess,
    isLoading: state.common.isLoading,
    isDataLoading: state.common.dataLoading,
    userInfo: state.user.userInfo,
    companyDetail: state.screen.companyDashboard.information.companyDetail,
    companyAdvance: state.screen.companyDashboard.information.companyAdvance,
    isSuccess: state.common.isSuccess,
    successMessage: state.common.successMessage
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ editComBasicAction, getCompanyProfileAction, editUserInformation, offSuccessAction, getCompanyAdvanceAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInfoComponent);
