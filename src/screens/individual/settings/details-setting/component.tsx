import { validateField } from "containers/utils/utils";
import { MDBBtn, MDBCol, MDBInput, MDBRow, MDBSpinner, MDBAlert } from "mdbreact";
import moment from "moment/moment";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getProfileAction, updateUserBasicAction } from "../ducks/actions";
// import { userProfileBasic } from "../services";
import { IProps, IUserDetailState } from "./propState";
import { COUNTRY_IOS2 } from "containers/contants/country-ios2";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
class DetailSettingControls extends React.Component<IProps, IUserDetailState> {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userDetail && (nextProps.userDetail !== prevState.userDetail || nextProps.userDetail.country !== prevState.userDetail.country)) {
      const user = nextProps.userDetail;
      return {
        email: user.email,
        phoneNumber: user.phone_number,
        first_name: user.first_name,
        last_name: user.last_name,
        date_of_birth: user.date_of_birth === "0" ? null : user.date_of_birth,
        street_address: user.street_address === "0" ? "" : user.street_address,
        city: user.city === "0" ? "" : user.city,
        state: user.user_state === "0" ? "" : user.user_state,
        zip: user.zip === "0" ? "" : user.zip,
        country: user.country === "0" ? "" : user.country,
        userDetail: user,
        formInputValid: {
          first_nameValid: true,
          last_nameValid: true,
          stateValid: user.user_state === "0" ? false : true,
          cityValid: user.city === "0" ? false : true,
          street_addressValid: user.street_address === "0" ? false : true,
          zipValid: user.zip === "0" ? false : true,
          countryValid: user.country === "0" ? false : true,
          birthDayValid: user.date_of_birth === "0" ? false : true
        },
        formValid:
          user.user_state === "0"
            ? false
            : true && user.city === "0"
              ? false
              : true && user.street_address === "0"
                ? false
                : true && user.zip === "0"
                  ? false
                  : true && user.country === "0"
                    ? false
                    : true && user.date_of_birth === "0"
                      ? false
                      : true
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phoneNumber: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      street_address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      userDetail: null,
      wasValidated: false,
      // agreeTerms: false,
      // policy: false,
      options: null,
      formErrors: {
        first_name: "",
        last_name: "",
        date_of_birth: "",
        street_address: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      },
      formInputValid: {
        first_nameValid: false,
        last_nameValid: false,
        stateValid: false,
        cityValid: false,
        street_addressValid: false,
        zipValid: false,
        countryValid: false,
        birthDayValid: false
      },
      formValid: false
    };
  }

  async componentDidMount() {
    await this.props.getProfileAction(this.props.userInfo.user_id, this.callBack());
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.userDetail.country !== prevProps.userDetail.country) {
  //     this.formatDataSelect();
  //   }
  // }

  callBack = () => {
    this.formatDataSelect();
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

  handleSelectChange = async event => {
    const state = { ...this.state };
    state.formInputValid.countryValid = true;
    state.country = event[0];
    await this.setState(state, this.validateForm);
  };

  validateStateForm = obj => {
    Object.entries(obj).forEach(([key, value]) => {
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
    this.setState({
      formValid:
        this.state.formInputValid.first_nameValid &&
        this.state.formInputValid.last_nameValid &&
        this.state.formInputValid.stateValid &&
        this.state.formInputValid.cityValid &&
        this.state.formInputValid.street_addressValid &&
        this.state.formInputValid.zipValid &&
        this.state.formInputValid.countryValid &&
        this.state.date_of_birth !== null
    });
  };

  changeHandler = async (event: any) => {
    event.persist();
    await this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  onBlurValid = (event: any) => {
    this.validate(event.target.type, event.target.value, event.target.name);
  };

  submitHandler = async event => {
    event.preventDefault();
    await this.setState({ ...this.state, wasValidated: true });
    const userDetail = {
      user_id: this.props.userInfo.user_id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      date_of_birth: this.state.date_of_birth ? this.state.date_of_birth : "",
      street_address: this.state.street_address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      country: this.state.country ? this.state.country : ""
    };
    await this.validateStateForm(userDetail);
    if (!this.state.formValid) {
      return;
    }
    this.props.updateUserBasicAction(userDetail);
    await this.setState({ ...this.state, wasValidated: false });
  };

  datePickerChange = date => {
    if (date === null) {
      return;
    }
    this.setState({
      date_of_birth: moment(date).format("YYYY-MM-DD")
    });
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

  render() {
    return (
      <div className="p-2">
        <form
          className={this.state.wasValidated ? "was-validated" : "needs-validation"}
          onSubmit={this.submitHandler}
          noValidate
        >
          <MDBRow>
            <MDBCol md="6">
              <MDBInput
                value={this.state.first_name}
                name="first_name"
                onChange={this.changeHandler}
                onBlur={this.onBlurValid}
                type="text"
                id="materialFormRegisterNameEx"
                label="Name"
                required
              />
              <MDBInput
                value={this.state.last_name}
                name="last_name"
                onChange={this.changeHandler}
                onBlur={this.onBlurValid}
                type="text"
                id="materialFormRegisterEmailEx2"
                label="Surname"
                required
              />
              <div className="form-date-picker">
                <label>Date of birth</label>
                <DatePicker
                  selected={this.state.date_of_birth ? new Date(this.state.date_of_birth) : null}
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
              <span className="fake-label">Country</span>
              <CountryDropdown
                defaultOptionLabel="Choose your Country"
                classes="country-dropdown"
                value={this.state.country}
                valueType="short"
                // blacklist={["VN"]}
                onChange={(val) => this.selectCountry(val)} />
              <span className="fake-label">State</span>
              <RegionDropdown
                blankOptionLabel="Choose your State"
                defaultOptionLabel="Choose your State"
                classes="country-dropdown mb-10"
                countryValueType="short"
                disabled={this.state.country === ""}
                country={this.state.country}
                value={this.state.state}
                onChange={(val) => this.selectRegion(val)} />
              <MDBInput
                value={this.state.city}
                onChange={this.changeHandler}
                onBlur={this.onBlurValid}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="city"
                label="City"
                required
              >
                <div className="invalid-feedback">Please provide a valid city.</div>
              </MDBInput>
              <MDBInput
                value={this.state.street_address}
                onChange={this.changeHandler}
                onBlur={this.onBlurValid}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="street_address"
                label="Street"
                required
              >
                <div className="invalid-feedback">Please provide a valid street.</div>
              </MDBInput>
              <MDBInput
                value={this.state.zip}
                onChange={this.changeHandler}
                onBlur={this.onBlurValid}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="zip"
                label="Postal Code"
                required
              >
                <div className="invalid-feedback">Please provide a valid postal code.</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md="6" className="detail-page-validation">
              <MDBInput
                value={this.state.phoneNumber}
                disabled
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="phoneNumber"
                label="Phone Number"
                required
              >
                <div className="invalid-feedback">Please provide a valid phone.</div>
              </MDBInput>
              <MDBInput
                value={this.state.email}
                disabled
                type="email"
                id="materialFormRegisterConfirmEx3"
                name="email"
                label="Your Email address"
              />

              <p className="note note-info">
                Please contact
                <span className="text-primary cursor-pointer"> Bitwage Support </span>
                to change Email, Phone Number or to close your account.
              </p>
              <br />
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
              >
                Save
                {this.props.isLoading ? <MDBSpinner small /> : null}
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    errorMess: state.common.errMess,
    isLoading: state.common.isLoading,
    userInfo: state.user.userInfo,
    userDetail: state.user.userDetail,
    isSuccess: state.common.isSuccess,
    successMessage: state.common.successMessage
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getProfileAction, updateUserBasicAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DetailSettingControls);
