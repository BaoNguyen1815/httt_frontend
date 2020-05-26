// import SuccessComponent from "containers/components/alerts";
import { validateField } from "containers/utils/utils";
import React from "react";
import "react-phone-input-2/lib/style.css";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import zxcvbn from "zxcvbn";
import { logErrorAction } from "../../../containers/redux/actions";
import { signUpAction } from "../../auth/sign-up/ducks/actions";
import { IDispatchToProps, IProps, IState } from "./propState";
import SignUp from '../../../containers/components/screen-components/auth/signup';
class AdminSignUpComponent extends React.Component<IProps & IDispatchToProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      phone_country: "us",
      password: "",
      rePassword: "",
      worker_role: "admin",
      formErrors: { email: "", password: "", phone: "" },
      phoneValid: false,
      emailValid: false,
      passwordValid: false,
      rePasswordValid: false,
      firstNameValid: false,
      lastNameValid: false,
      formValid: false,
      agreeTerms: false
    };
  }

  componentDidMount() {
    this.props.logErrorAction(false, "");
  }

  handleOnChange = async (value, data) => {
    await this.setState({
      phone_number: value.replace(/[^0-9]+/g, ""),
      phone_country: data.countryCode.toUpperCase()
    });
    const phoneValid = this.state.phone_number.length > 4 ? true : false;
    this.setState(
      {
        ...this.state,
        phoneValid
      },
      this.validateForm
    );
  };

  handleChange = event => {
    this.setState(
      {
        ...this.state,
        [event.target.name]: event.target.value
      },
      () => {
        this.validate(event.target.type, event.target.value, event.target.name);
      }
    );
  };

  handleAgreeTerm = async () => {
    await this.setState({ ...this.state, agreeTerms: !this.state.agreeTerms }, this.validateForm);
  };

  validate(type, value, field) {
    const fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    const rePasswordValid = this.state.rePassword === this.state.password ? true : false;
    const phoneValid = this.state.phone_number.length > 4 ? true : false;

    const validate = validateField(type, value);
    switch (field) {
      case "username":
        emailValid = validate.filedValid;
        fieldValidationErrors.email = validate.fieldValidationErrors;
        break;
      case "password":
        passwordValid = validate.filedValid;
        fieldValidationErrors.password = validate.fieldValidationErrors;
        break;
      case "first_name":
        firstNameValid = validate.filedValid;
        fieldValidationErrors.first_name = validate.fieldValidationErrors;
        break;
      case "last_name":
        lastNameValid = validate.filedValid;
        fieldValidationErrors.last_name = validate.fieldValidationErrors;
        break;
      default:
        break;
    }
    this.setState(
      {
        ...this.state,
        formErrors: fieldValidationErrors,
        emailValid,
        passwordValid,
        firstNameValid,
        lastNameValid,
        rePasswordValid,
        phoneValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      ...this.state,
      formValid:
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.firstNameValid &&
        this.state.lastNameValid &&
        this.state.rePasswordValid &&
        this.state.agreeTerms &&
        this.state.phoneValid
    });
  }

  createUser = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    if (!this.state.formValid) {
      return;
    }
    this.props.signUpAction(
      this.state.username,
      this.state.password,
      this.state.phone_country,
      this.state.phone_number,
      this.state.first_name,
      this.state.last_name,
      this.state.worker_role, 
      true
    );
  };

  createPasswordLabel = result => {
    switch (result.score) {
      case 0:
        return "Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "Weak";
    }
  };

  public render() {
    const { password } = this.state;
    const passResult = zxcvbn(password);
    return (
      <SignUp
        passResult={passResult}
        data={this.state}
        error={this.props.error}
        message={this.props.message}
        isLoading={this.props.isLoading}
        phoneChange={this.handleOnChange}
        dataChange={this.handleChange}
        onCreate={this.createUser}
        passwordLabel={this.createPasswordLabel}
        agreeTerm={this.handleAgreeTerm}
        isAdmin={true}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    message: state.common.errMess,
    isLoading: state.common.isLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ signUpAction, logErrorAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminSignUpComponent);
