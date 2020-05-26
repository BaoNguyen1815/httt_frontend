import { MDBRow, MDBCol, MDBAlert, MDBBtn, MDBInput, MDBSpinner, MDBFileInput, MDBIcon } from "mdbreact";
import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import moment from "moment/moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validateField, checkFileType, getBase64 } from "containers/utils/utils";
import { COUNTRY_IOS2 } from "containers/contants/country-ios2";
import { IProps, IState } from "./propState";
import {
  editComAdvanceAction, editUserInformation, getAdminProfileAction, editAdminProfileAction,
  getAdminAdvanceAction
} from "../ducks/actions";
import { getProfileAction } from "../../../individual/settings/ducks/actions"
import DataLoadingComponent from "containers/components/loading/data-loading";
import { getLinkImage } from "screens/company/settings/services";
import { RegionDropdown, CountryDropdown } from "react-country-region-selector";
class AdminInfoComponent extends React.Component<IProps, IState> {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userDetail && nextProps.userDetail.email !== prevState.emailAdmin) {
      const userDetail = nextProps.userDetail;
      return {
        emailAdmin: userDetail.email,
        phoneAdmin: userDetail.phone_number,
        firstName: userDetail.first_name,
        lastName: userDetail.last_name,
        dateOfBirth: userDetail.date_of_birth === "0" ? null : userDetail.date_of_birth,
        streetAddress: userDetail.street_address === "0" ? "" : userDetail.street_address,
        city: userDetail.city === "0" ? "" : userDetail.city,
        state: userDetail.user_state === "0" ? "" : userDetail.user_state,
        zip: userDetail.zip === "0" ? "" : userDetail.zip,
        country: userDetail.country === "0" ? "" : userDetail.country,
        formInputValid: {
          dateOfBirthValid: userDetail.date_of_birth === "0" ? false : true,
          streetAddressValid: userDetail.street_address === "0" ? false : true,
          cityValid: userDetail.city === "0" ? false : true,
          stateValid: userDetail.user_state === "0" ? false : true,
          zipValid: userDetail.zip === "0" ? false : true,
          countryValid: userDetail.country === "0" ? false : true
        },
        // isValidState: true
      };
    }
    if (nextProps.adminAdvance && nextProps.adminAdvance !== prevState.adminAdvance) {
      let obj = {
        adminAdvance: null,
        isIdFront: true,
        isIdBack: true,
        isSelf: true,
        isPro: true
      };
      if (nextProps.adminAdvance) {
        let kyc = [...nextProps.adminAdvance.kyc_images];
        kyc.forEach(item => {
          switch (item.category) {
            case "idfront":
              obj.isIdFront = false;
              break;
            case "idback":
              obj.isIdBack = false;
              break;
            case "selfiewithid":
              obj.isSelf = false;
              break;
            case "proofofresidency":
              obj.isPro = false;
              break;
          }
        });
      }
      obj.adminAdvance = nextProps.adminAdvance;
      return obj;
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      emailAdmin: "",
      phoneAdmin: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      category1: "idfront",
      base64_image1: null,
      category2: "idback",
      base64_image2: null,
      category3: "selfiewithid",
      base64_image3: null,
      category4: "proofofresidency",
      base64_image4: null,
      options: null,
      userDetail: null,
      adminAdvance: null,
      formErrors: {
        entityLegalName: "",
        dateOfBirth: "",
        companyEIN: "",
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
      adminDetail: null,
      formInputValid: {
        dateOfBirthValid: false,
        streetAddressValid: false,
        cityValid: false,
        stateValid: false,
        zipValid: false,
        countryValid: false
      },
      formValid: false,
      isFileFormat: true,
      isIdFront: true,
      isIdBack: true,
      isSelf: true,
      isPro: true
    };
  }
  async componentDidMount() {
    // setTimeout(() => {}, 1000);
    if (this.props.userInfo.user_id) {
      this.props.getAdminAdvanceAction(this.props.userInfo.user_id);
    }
    let userDetail = null;
    if (localStorage.getItem("userDetail")) {
      userDetail = await JSON.parse(localStorage.getItem("userDetail"));
      this.setState({
        ...this.state,
        emailAdmin: userDetail.username,
        phoneAdmin: userDetail.phone_number,
        firstName: userDetail.first_name,
        lastName: userDetail.last_name
      });
    }
    // if (this.props.isAdminProfile && this.props.userInfo.company_id !== null) {
    //   await this.props.getAdminProfileAction(this.props.userInfo.user_id, this.props.userInfo.company_id);
    // }
    this.formatDataSelect();
  }

  formatDataSelect = () => {
    const options = COUNTRY_IOS2;
    const arr = [];
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const element = {
          checked: key === this.state.country ? true : false,
          // checked: false,
          text: options[key],
          value: key
        };
        arr.push(element);
      }
    }
    this.setState({ ...this.state, options: arr });
  };

  datePickerChange = async date => {
    if (date === null) {
      return;
    }
    await this.setState({
      dateOfBirth: moment(date).format("YYYY-MM-DD")
    });
    const state = { ...this.state };
    state.formInputValid.dateOfBirthValid = true;
    this.setState(state);
    this.validateForm();
  };

  changeHandler = (event: any) => {
    event.persist();
    this.setState(
      {
        ...this.state,
        [event.target.name]: event.target.value
      }
    );
  };

  onBlurValid = (event: any) => {
    this.validate(event.target.type, event.target.value, event.target.name);
  };
  handleSelectChange = async (event) => {
    await this.setState({ ...this.state, country: event[0] })
    let state = Object.assign({}, this.state);
    state.formInputValid.countryValid = true;
    this.setState(state);
  };

  validateStateForm = obj => {
    Object.entries(obj).forEach(([key, value]) => {
      this.validate("text", value, key);
    });
  };

  validate = (type, value, field) => {
    const fieldValidationErrors = this.state.formErrors;
    const formInputValid = this.state.formInputValid;

    const validate = validateField(type, value);
    switch (field) {
      case "city":
        formInputValid.cityValid = validate.filedValid;
        fieldValidationErrors.city = validate.fieldValidationErrors;
        break;
      case "streetAddress":
        formInputValid.streetAddressValid = validate.filedValid;
        fieldValidationErrors.streetAddress = validate.fieldValidationErrors;
        break;
      case "state":
        formInputValid.stateValid = validate.filedValid;
        fieldValidationErrors.state = validate.fieldValidationErrors;
        break;
      case "dateOfBirth":
        formInputValid.dateOfBirthValid = validate.filedValid;
        fieldValidationErrors.dateOfBirth = validate.fieldValidationErrors;
        break;
      case "zip":
        formInputValid.zipValid = validate.filedValid;
        fieldValidationErrors.zip = validate.fieldValidationErrors;
        break;
      case "country":
        formInputValid.countryValid = validate.filedValid;
        fieldValidationErrors.country = validate.fieldValidationErrors;
        break;

      default:
        // this.validateForm();
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        formInputValid
      },
      this.validateForm
    );
  };

  validateForm = () => {
    const isImageSelected = this.checkBase64();
    if (!isImageSelected) {
      this.setState({
        formValid: false
      });
      return;
    }
    this.setState({
      formValid:
        this.state.formInputValid.dateOfBirthValid &&
        this.state.formInputValid.streetAddressValid &&
        this.state.formInputValid.cityValid &&
        this.state.formInputValid.stateValid &&
        this.state.formInputValid.zipValid &&
        this.state.formInputValid.countryValid
    });
  };

  checkBase64 = () => {
    let isSelected = false;
    if (
      this.state.base64_image1 !== null &&
      this.state.base64_image2 !== null &&
      this.state.base64_image3 !== null &&
      this.state.base64_image4 !== null
    ) {
      isSelected = true;
    }
    return isSelected;
  };

  submitHandler = async event => {
    event.preventDefault();
    event.target.className += " was-validated";
    const userDetail = {
      user_id: this.props.userInfo.user_id,
      company_id: this.props.userInfo.company_id,
      category1: this.state.category1,
      base64_image1: this.state.base64_image1,
      category2: this.state.category2,
      base64_image2: this.state.base64_image2,
      category3: this.state.category3,
      base64_image3: this.state.base64_image3,
      category4: this.state.category4,
      base64_image4: this.state.base64_image4
    };

    const userInfo = {
      user_id: this.props.userInfo.user_id,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      date_of_birth: this.state.dateOfBirth ? this.state.dateOfBirth : "",
      street_address: this.state.streetAddress,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      country: this.state.country ? this.state.country : ""
    }

    // await this.validateStateForm(userDetail);
    if (!this.state.formValid) {
      return;
    }
    this.setState({ isFileFormat: true });

    this.props.editComAdvanceAction(userDetail, userInfo);

    // this.skipAdminInformation();
  };

  skipAdminInformation = () => {
    const dashboardInfo = {
      isCompleted: true,
      isStep1: false,
      isStep2: false
    };
    this.props.editUserInformation(dashboardInfo);
  };

  onChangeHandleFile = categoryId => files => {
    const file = files[0];
    let isTypeFormat = false;
    if (checkFileType(file.type, file.size)) {
      isTypeFormat = true;
    }
    // if (checkFileType(file.type, file.size)) {
    getBase64(file, result => {
      switch (categoryId) {
        case "idfront":
          this.setState(
            {
              base64_image1: isTypeFormat ? result : null,
              isFileFormat: isTypeFormat ? true : false
            },
            this.validateForm
          );
          break;
        case "idback":
          this.setState(
            {
              base64_image2: isTypeFormat ? result : null,
              isFileFormat: isTypeFormat ? true : false
            },
            this.validateForm
          );
          break;
        case "selfiewithid":
          this.setState(
            {
              base64_image3: isTypeFormat ? result : null,
              isFileFormat: isTypeFormat ? true : false
            },
            this.validateForm
          );
          break;
        case "proofofresidency":
          this.setState(
            {
              base64_image4: isTypeFormat ? result : null,
              isFileFormat: isTypeFormat ? true : false
            },
            this.validateForm
          );
          break;
      }
    });
    // } else {
    //   this.setState({
    //     formValid: false
    //   }
    //   );
    //   alert("Invalid format");
    // }
  };
  previewImage = async (category) => {
    let imageId = null;
    if (this.props.adminAdvance && this.props.adminAdvance.kyc_images) {
      let kyc = [...this.props.adminAdvance.kyc_images];
      console.log("kyc", kyc);
      kyc.forEach(item => {
        if (item.category === category) {
          imageId = item.image_id;
        }
      });
    }
    if (imageId) {
      var newTab = window.open();
      const results = await getLinkImage(imageId, this.props.userInfo.user_id);
      newTab.document.body.innerHTML = `<img src="${results.content}">`;
    }
  };

  selectCountry(val) {
    const state = { ...this.state };
    state.formInputValid.countryValid = true;
    state.country = val;
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
      <form hidden={!this.props.isShow} className="needs-validation" onSubmit={this.submitHandler} noValidate>
        <DataLoadingComponent />
        <MDBRow hidden={this.props.isDataLoading}>
          <MDBCol md="12" hidden={this.props.isAdminProfile}>
            <h4>STEP 2 - ADMIN INFORMATION</h4>
            <p>
              You can skip this step and discover the features of our platform first, however, you will have to complete
              this section before inviting any employees to the platform.{" "}
            </p>
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              value={this.state.firstName}
              name="first_name"
              onChange={this.changeHandler}
              onBlur={this.onBlurValid}
              type="text"
              label="Name"
              disabled
            />
            <MDBInput
              value={this.state.lastName}
              name="last_name"
              onChange={this.changeHandler}
              onBlur={this.onBlurValid}
              type="text"
              label="Surname"
              disabled
            />
            <div className="form-date-picker">
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
            </div>
            <MDBRow className="upload-style">
              <MDBCol size="3" className="title">
                <p>Front of ID</p>
              </MDBCol>
              <MDBCol size="8">
                <MDBFileInput
                  md="8"
                  textFieldTitle={this.state.isIdFront ? "No file chosen" : "Uploaded"}
                  className="m-0"
                  getValue={this.onChangeHandleFile("idfront")}
                />
              </MDBCol>
              <MDBCol md="1">
                <MDBIcon
                  hidden={this.state.isIdFront}
                  far
                  size="lg"
                  icon="eye"
                  className="mt-40"
                  color="primary-color"
                  onClick={() => {
                    this.previewImage("idfront");
                  }}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow className="upload-style">
              <MDBCol size="3" className="title">
                <p>Back of ID</p>
              </MDBCol>
              <MDBCol size="8">
                <MDBFileInput
                  md="8"
                  textFieldTitle={this.state.isIdBack ? "No file chosen" : "Uploaded"}
                  className="m-0"
                  getValue={this.onChangeHandleFile("idback")}
                />
              </MDBCol>
              <MDBCol md="1">
                <MDBIcon
                  hidden={this.state.isIdBack}
                  far
                  size="lg"
                  icon="eye"
                  className="mt-40"
                  color="primary-color"
                  onClick={() => {
                    this.previewImage("idback");
                  }}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow className="upload-style">
              <MDBCol size="3" className="title">
                <p>Self with ID</p>
              </MDBCol>
              <MDBCol size="8">
                <MDBFileInput
                  md="8"
                  textFieldTitle={this.state.isSelf ? "No file chosen" : "Uploaded"}
                  className="m-0"
                  getValue={this.onChangeHandleFile("selfiewithid")}
                />
              </MDBCol>
              <MDBCol md="1">
                <MDBIcon
                  hidden={this.state.isSelf}
                  far
                  size="lg"
                  icon="eye"
                  className="mt-40"
                  color="primary-color"
                  onClick={() => {
                    this.previewImage("selfiewithid");
                  }}
                />
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md="6" className="detail-page-validation">
            <MDBInput
              value={this.state.phoneAdmin}
              disabled
              type="text"
              id="materialFormRegisterPasswordEx4"
              name="phoneNumber"
              label="Company Phone number"
              required
            >
              <div className="invalid-feedback">Please provide a valid phone.</div>
            </MDBInput>
            <MDBInput
              value={this.state.emailAdmin}
              onChange={this.changeHandler}
              onBlur={this.onBlurValid}
              disabled
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
            <span className="fake-label country-label">Card Number</span>
            <RegionDropdown
              blankOptionLabel="Choose your State"
              defaultOptionLabel="Choose your State"
              classes="country-dropdown mb-10"
              countryValueType="short"
              country={this.state.country}
              value={this.state.state}
              onChange={(val) => this.selectRegion(val)} />
            {/* <MDBSelect
              style={{ marginTop: 48 }}
              search
              options={this.state.options}
              selected="Select your Country"
              label="Country"
              getValue={this.handleSelectChange}
              value={this.state.country}
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
                <MDBFileInput
                  textFieldTitle={this.state.isPro ? "No file chosen" : "Uploaded"}
                  className="m-0"
                  getValue={this.onChangeHandleFile("proofofresidency")}
                />
              </MDBCol>
              <MDBCol md="1">
                <MDBIcon
                  hidden={this.state.isPro}
                  far
                  size="lg"
                  icon="eye"
                  className="mt-40"
                  color="primary-color"
                  onClick={() => {
                    this.previewImage("proofofresidency");
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
              style={{ width: "200px", float: "right" }}
            > {this.props.isAdminProfile ? "Submit" : "Submit Step 2"}
              {this.props.isLoading ? <MDBSpinner small /> : null}
            </MDBBtn>
            <MDBBtn
              hidden={this.props.isAdminProfile}
              color="primary"
              className="detail-button"
              onClick={() => this.skipAdminInformation()}
              style={{ width: "200px", float: "right" }}
            >
              Skip Step 2
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
    userDetail: state.user.userDetail,
    adminAdvance: state.screen.companyDashboard.information.adminAdvance,
    isSuccess: state.common.isSuccess,
    successMessage: state.common.successMessage
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      editComAdvanceAction,
      editUserInformation,
      getAdminProfileAction,
      getProfileAction,
      editAdminProfileAction,
      getAdminAdvanceAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AdminInfoComponent);
