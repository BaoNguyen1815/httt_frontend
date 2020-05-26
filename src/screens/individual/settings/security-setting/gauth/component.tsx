import {
  MDBBtn,
  MDBSpinner,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBSwitch,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBAlert
} from "mdbreact";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IProps, IState } from "./propState";
import { Link } from "react-router-dom";
import { validateField } from "containers/utils/utils";
import { generateTOTPtoken } from "services/hmac-signature";
import { userGauthUpdate, userGauthSet, disableGauth } from "../services";
import { securityAction } from "../../ducks/actions";

const initialState = {
  verifyModal: false,
  isDisable: true,
  formData: null,
  uuid: "",
  username: "",
  access_token: "",
  uuid_str: "",
  countToExpire: 2,
  formValid: false,
  codeValid: false,
  totp: null,
  isSuccess: false,
  isFalse: false,
  isDisableSuccess: false,
  formErrors: { access_token: "" },
  isLoading: false
}
class GAuthComponent extends React.Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    await this.setState(initialState);
  }

  toggle = async (force?) => {
    if (force === true) {
      this.props.securityAction(this.props.userInfo.user_id);
    }
    await this.props.switchChange();
    const state = { ...initialState };
    state.verifyModal = !this.state.verifyModal;
    this.setState(state);
    if (this.props.switchChecked) {
      this.updateGAuth();
    }
  };

  updateGAuth = async () => {
    const totpData = await generateTOTPtoken(this.props.userInfo.username);
    if (totpData) {
      this.setState({
        ...this.state,
        totp: totpData
      });
    }
    const result = await userGauthUpdate(this.props.userInfo.user_id, totpData.secretKey);
    if (result.response) {
      this.setState({
        ...this.state,
        uuid_str: result.response
      });
    }
  };

  openModal = isOpen => {
    if (isOpen) {
      this.toggle();
    }
    return isOpen;
  };

  handleChange = (field: string) => (event: any) => {
    event.persist();
    this.setState({
      ...this.state,
      [field]: event.target.value
    });
  };

  reSendCode = async () => {
    await this.setState({
      ...this.state,
      countToExpire: this.state.countToExpire !== 0 ? this.state.countToExpire - 1 : 0
    });
  };

  validate = (type, value, field) => {
    const fieldValidationErrors = this.state.formErrors;
    let codeValid = this.state.codeValid;
    const validate = validateField(type, value);
    switch (field) {
      case "access_token":
        codeValid = validate.filedValid;
        fieldValidationErrors.access_token = validate.fieldValidationErrors;
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        codeValid
      },
      this.validateForm
    );
  };

  validateForm = () => {
    this.setState({
      formValid: this.state.codeValid
    });
  };

  verifyCode = async () => {
    event.preventDefault();
    if (!this.state.access_token) {
      return;
    }
    if (this.state.isSuccess) {
      this.setState({
        verifyModal: false
      });
      return;
    }
    this.setState({
      ...this.state,
      uuid: this.props.userInfo.uuid,
      username: this.props.userInfo.username,
      isFalse: false,
      isSuccess: false,
      isLoading: true,
      isDisableSuccess: false
    });
    let res = null;
    if (this.props.switchChecked) {
      res = await userGauthSet(this.props.userInfo.user_id, this.state.uuid_str, this.state.access_token);
      if (res.response) {
        this.setState({
          ...this.state,
          isSuccess: true,
          isLoading: false
        });
      }
    } else {
      res = await disableGauth(this.props.userInfo.user_id, this.state.access_token);
      if (res.response) {
        this.setState({
          ...this.state,
          isDisableSuccess: true,
          isLoading: false
        });
      }
    }
    if (!res.response) {
      this.setState({
        ...this.state,
        isFalse: true,
        isLoading: false,
        isSuccess: false,
        isDisableSuccess: false
      });
    }
  };

  render() {
    // let checked = this.state.access_token !== "" ? false : true;
    const authFalse = (
      <MDBAlert color="danger" className="alert-label" dismiss>
        Wrong access code, please check again!
      </MDBAlert>
    );
    const authSuccess = (
      <MDBAlert color="success" className="alert-label mt-50" dismiss>
        <strong>Successful authentication</strong> You can log in using the 6-digit code found in your Authenticator app to sign in!
      </MDBAlert>
    );
    const disableAuthSuccess = (
      <MDBAlert color="success" className="alert-label" dismiss>
        Successful disable Google Authentication
      </MDBAlert>
    );

    const disableAuth = (
      <div>
        Use the 6-digit found in your Google Authenticator app to disable Google Authentication for your account
      </div>
    );

    const enableAuth = (
      <div>
        <p className="text-center">
          Enter the access code from Google or Bitwage Authenticator, or sent via SMS to your mobile
          device
      </p>
        <p className="text-info text-center">
          +XX XXXXXXX{" "}
          {this.props.userDetail && this.props.userDetail.phone_number
            ? this.props.userDetail.phone_number.substr(this.props.userDetail.phone_number.length - 2)
            : null}
        </p>
        <p className="text-center">
          problems receiving the SMS? try
          <Link className="text-primary" to="https://support.bitwage.com/article/28-two-factor-authentication">
            {" "}
            Bitwage or Google authenticator
        </Link>
        </p>
      </div>
    );

    const VerifyCation = (
      <>
        <MDBModalHeader
          toggle={() => {
            this.toggle(true);
          }}
        >
          {this.props.switchChecked ? "Enable" : "Disable"} Google Authentication
        </MDBModalHeader>
        <MDBModalBody>
          <MDBRow>
            <MDBCol className="mx-auto my-auto">
              <div className="gauth-access">
                <MDBCard>
                  <MDBCardBody>
                    <form className="needs-validation" noValidate>
                      {this.props.switchChecked ? enableAuth : disableAuth}
                      <div className="grey-text">
                        <MDBRow>
                          <MDBCol sm="12" md="8" className="mx-auto" hidden={this.state.isSuccess}>
                            <div className="text-center" hidden={!this.props.switchChecked}>
                              <img height="300" width="300" src={this.state.totp ? this.state.totp.url : null} />
                            </div>
                            <MDBInput
                              label="Access Code"
                              placeholder="Enter Access Code"
                              icon="key"
                              group
                              type="number"
                              validate
                              error="wrong"
                              success="right"
                              value={this.state.access_token}
                              onChange={this.handleChange("access_token")}
                              required
                            />

                          </MDBCol>
                          <MDBCol sm="12" md="8" className="mx-auto">
                            {this.state.isSuccess ? authSuccess : null}
                            {this.state.isFalse ? authFalse : null}
                            {this.state.isDisableSuccess ? disableAuthSuccess : null}
                          </MDBCol>
                        </MDBRow>
                      </div>
                      <div className="text-center mt-4">
                        <MDBBtn
                          color="primary"
                          className="btn-lg"
                          type="submit"
                          disabled={this.state.isLoading || this.state.access_token === ""}
                          onClick={this.verifyCode}
                        >
                          <MDBIcon icon="sign-in-alt" className="mr-1" /> {!this.state.isSuccess || this.state.isDisableSuccess ? "Save Change" : "Ok"}
                          {this.state.isLoading ? <MDBSpinner small /> : null}
                        </MDBBtn>
                      </div>
                      <p className="text-muted text-center my-3">© Bitwage Inc, 2014-2020</p>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBModalBody>
      </>
    );
    return (
      <div>
        <MDBSwitch
          labelLeft=""
          labelRight=""
          checked={this.props.switchChecked}
          onChange={this.toggle}
          disabled={this.props.isDisable}
        />
        <MDBModal size="lg" isOpen={this.state.verifyModal} toggle={this.toggle}>
          {VerifyCation}
        </MDBModal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    isLoading: state.common.isLoading,
    userInfo: state.user.userInfo,
    userSecurity: state.screen.setting.userSetting.userSecurity,
    userDetail: state.user.userDetail
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ securityAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GAuthComponent);
