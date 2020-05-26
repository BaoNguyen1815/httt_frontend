import {
  MDBContainer,
  MDBCard,
  MDBCollapse,
  MDBCardBody,
  MDBCollapseHeader,
  MDBIcon,
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBSwitch,
  MDBTooltip,
  MDBProgress,
  MDBAlert,
  MDBSpinner,
  MDBDataTable
} from "mdbreact";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { changePasswordAction, securityAction, securityEmailPrivacyEditAction } from "../ducks/actions";
import zxcvbn from "zxcvbn";
import { validateField } from "containers/utils/utils";
import { IProps, IState } from "./propState";
import GAuthComponent from "./gauth/component";
import SMSComponent from "./sms/component";
import { getUserSessionHistory } from "../ducks/actions";
import { SESSION_COLUMNS_TABLE } from "containers/contants/table-data";
class SecurityControls extends Component<IProps, IState> {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.sessionHistory !== prevState.sessionHistory) {
      const data = {
        columns: SESSION_COLUMNS_TABLE,
        rows: nextProps.sessionHistory.sessions
      };
      return {
        sessionHistory: data
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      switch1: false, // has_gauth
      switch2: false,
      switch3: false, // disable_sms
      switch4: false, // redact_payroll_detail_emails
      switch5: false,
      userSecurity: null,
      sessionHistory: null,
      collapseID: "",
      oldpassword: "",
      new_password: "",
      new_password_repeat: "",
      formErrors: { oldpassword: "", new_password: "", new_password_repeat: "" },
      oldpasswordValid: false,
      formValid: false,
      newpasswordValid: false,
      newrePasswordValid: false
    };
  }

  componentDidMount() {
    this.props.securityAction(this.props.userInfo.user_id);
    setTimeout(() => {
      this.props.getUserSessionHistory(this.props.userInfo.user_id);
    }, 500);
  }

  async componentDidUpdate(prevProps) {
    // if (prevProps && prevProps.userSecurity) {
    const userSecurity = this.props.userSecurity;
    if (prevProps.userSecurity !== userSecurity) {
      const switch1 = userSecurity.has_gauth;
      const switch3 = userSecurity.disable_sms;
      const switch4 = userSecurity.redact_payroll_detail_emails;
      this.setState({
        ...this.state,
        switch1,
        switch3,
        switch4
      });
      // }
    }
  }

  handleSwitchChange = nr => async () => {
    const switchNumber = `switch${nr}`;
    await this.setState(
      {
        ...this.state,
        [switchNumber]: !this.state[switchNumber]
      },
      () => {
        if (switchNumber === "switch4") {
          this.props.securityEmailPrivacyEditAction(
            this.props.userInfo.user_id,
            this.state.switch4 === true ? "True" : "False"
          );
        }
      }
    );
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

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

  handleChange = (field: string) => (event: any) => {
    event.persist();
    this.setState(
      {
        ...this.state,
        [field]: event.target.value
      },
      () => {
        this.validate(event.target.name, event.target.value);
      }
    );
  };

  validate(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let oldpasswordValid = this.state.oldpasswordValid;
    let newpasswordValid = this.state.newpasswordValid;
    const newrePasswordValid = this.state.new_password_repeat === this.state.new_password ? true : false;
    const validate = validateField(fieldName, value);
    switch (fieldName) {
      case "password":
        oldpasswordValid = validate.filedValid;
        fieldValidationErrors.oldpassword = validate.fieldValidationErrors;
        break;
      case "newpassword":
        newpasswordValid = validate.filedValid;
        fieldValidationErrors.new_password = validate.fieldValidationErrors;
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        oldpasswordValid,
        newpasswordValid,
        newrePasswordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      ...this.state,
      formValid: this.state.oldpasswordValid && this.state.newpasswordValid && this.state.newrePasswordValid
    });
  }

  reset = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    if (!this.state.formValid) {
      return;
    }
    this.props.changePasswordAction(
      this.props.userInfo.user_id,
      this.state.oldpassword,
      this.state.new_password,
      this.state.new_password_repeat
    );
  };

  render() {
    const { switch1, switch2, switch3, switch4, switch5, new_password, sessionHistory } = this.state;
    const passResult = zxcvbn(new_password);
    const messDiable = (
      <MDBAlert color="danger" className="alert-label" dismiss>
        One of the Two-factor authentication method must be enabled. You can not disable both Google Auth and SMS
      </MDBAlert>
    );
    return (
      <MDBContainer fluid className="md-accordion mt-5">
        <MDBCard className="mt-3">
          <MDBCollapseHeader
            tagClassName="d-flex justify-content-between text-primary"
            onClick={this.toggleCollapse("changePass")}
          >
            <p>
              <MDBIcon icon="key" className="mr-2" />
              Change Password
            </p>
            {/* <MDBIcon icon={collapseID === "myDocument" ? "angle-up" : "angle-down"} /> */}
          </MDBCollapseHeader>
          <MDBCollapse id="changePass" isOpen={true}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="6">
                  <form noValidate>
                    <div className="grey-text">
                      <MDBInput
                        label="Old Password"
                        name="password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        error="wrong"
                        success="right"
                        value={this.state.oldpassword}
                        onChange={this.handleChange("oldpassword")}
                      >
                        {this.state.oldpasswordValid ? null : (
                          <div className="invalid-feedback" style={{ display: "block", marginLeft: "2.25rem" }}>
                            {" "}
                            {this.state.formErrors.oldpassword}
                          </div>
                        )}
                      </MDBInput>
                      <MDBInput
                        label="New password"
                        icon="lock"
                        group
                        type="password"
                        name="newpassword"
                        validate
                        value={this.state.new_password}
                        onChange={this.handleChange("new_password")}
                      >
                        {this.state.newpasswordValid ? null : (
                          <div className="invalid-feedback" style={{ display: "block", marginLeft: "2.25rem" }}>
                            {" "}
                            {this.state.formErrors.new_password}
                          </div>
                        )}
                        <MDBProgress className="progress-input" value={passResult.score} max={4}>
                          {this.createPasswordLabel(passResult)}
                        </MDBProgress>
                      </MDBInput>
                      <MDBInput
                        label="Confirm New password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        value={this.state.new_password_repeat}
                        onChange={this.handleChange("new_password_repeat")}
                      >
                        {this.state.new_password_repeat !== this.state.new_password ? (
                          <div className="invalid-feedback" style={{ display: "block", marginLeft: "2.25rem" }}>
                            Password and Repeat Password are not identical. <br />
                          </div>
                        ) : null}
                      </MDBInput>
                    </div>
                    <div>
                      {this.props.error ? (
                        <MDBAlert color="danger" className="alert-label" dismiss>
                          Wrong password, please check again.
                        </MDBAlert>
                      ) : null}
                      {this.props.isSuccess ? (
                        <MDBAlert color="success" className="alert-label" dismiss>
                          Your password has been changed. An e-mail will be sent to your inbox. Please click on the link
                          to verify the change.
                        </MDBAlert>
                      ) : null}

                      <MDBBtn
                        color="primary"
                        onClick={this.reset}
                        disabled={!this.state.formValid || this.props.dataLoading}
                      >
                        {this.props.dataLoading ? <MDBSpinner small /> : null}
                        Submit
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <MDBCard>
          <MDBCollapseHeader
            tagClassName="d-flex justify-content-between text-primary"
            onClick={this.toggleCollapse("2fa")}
          >
            <p>
              <MDBIcon icon="qrcode" className="mr-2" />2 FA
            </p>
            {/* <MDBIcon icon={collapseID === "2fa" ? "angle-up" : "angle-down"} /> */}
          </MDBCollapseHeader>
          <MDBCollapse id="2fa" isOpen={true}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="6">
                  <MDBRow className="my-2">
                    <MDBCol md="8">
                      <div className="d-flex flex-row align-items-center">
                        <MDBIcon fab icon="google" />
                        <span className="mx-2">Google Auth </span>
                        <span className="badge badge-success">Recommend</span>
                      </div>
                    </MDBCol>
                    <MDBCol md="4">
                      <GAuthComponent
                        switchChecked={switch1}
                        switchChange={this.handleSwitchChange(1)}
                        isDisable={this.props.isLoading || switch3}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="my-2">
                    <MDBCol md="8">
                      <div className="d-flex flex-row align-items-center">
                        <MDBIcon icon="mobile" />
                        <span className="mx-2">Bitwage Mobile App </span>
                        <span className="badge badge-success">Recommend</span>
                      </div>
                    </MDBCol>
                    <MDBCol md="4">
                      <MDBSwitch labelLeft="" labelRight="" checked={switch2} onChange={this.handleSwitchChange(2)} />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="my-2">
                    <MDBCol md="8">
                      <div className="d-flex flex-row align-items-center">
                        <MDBIcon icon="sms" />
                        <span className="mx-2">SMS </span>
                      </div>
                    </MDBCol>
                    <MDBCol md="4">
                      <SMSComponent
                        switchChecked={!switch3}
                        switchChange={this.handleSwitchChange(3)}
                        isDisable={this.props.isLoading || !switch1}
                      />
                      {/* <MDBSwitch labelLeft="" labelRight="" checked={!switch3} onChange={this.handleSwitchChange(3)} /> */}
                    </MDBCol>
                  </MDBRow>
                  {!switch1 && switch3 ? messDiable : null}
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <MDBCard>
          <MDBCollapseHeader
            tagClassName="d-flex justify-content-between text-primary"
            onClick={this.toggleCollapse("privacy")}
          >
            <p>
              <MDBIcon icon="user-secret" className="mr-2" />
              Email Privacy
            </p>
            {/* <MDBIcon icon={collapseID === "privacy" ? "angle-up" : "angle-down"} /> */}
          </MDBCollapseHeader>
          <MDBCollapse id="privacy" isOpen={true}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="6">
                  <MDBRow className="my-2">
                    <MDBCol md="8">
                      <div className="d-flex flex-row align-items-center">
                        <MDBIcon icon="user-slash" />
                        <div className="wrap-hide-payroll">
                          <span className="mx-2">Hide Payroll Details </span>
                          <MDBTooltip material placement="top">
                            <MDBBtn flat>
                              <MDBIcon icon="info-circle" className="mr-2" />
                            </MDBBtn>
                            <p className="font-10">
                              Hide Company Name, Receiving Method Details, Payroll Volume, and Exchange Rate in payroll
                              emails
                            </p>
                          </MDBTooltip>
                        </div>
                      </div>
                    </MDBCol>
                    <MDBCol md="4">
                      <MDBSwitch labelLeft="" labelRight="" checked={switch4} onChange={this.handleSwitchChange(4)} />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="my-2">
                    <MDBCol md="8">
                      <div className="d-flex flex-row align-items-center">
                        <MDBIcon icon="lock" />
                        <span className="mx-2">PGP Encryption </span>
                        <span className="badge badge-danger">Coming Soon</span>
                      </div>
                    </MDBCol>
                    <MDBCol md="4">
                      <MDBSwitch labelLeft="" labelRight="" checked={switch5} onChange={this.handleSwitchChange(5)} />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <MDBCard>
          <MDBCollapseHeader
            tagClassName="d-flex justify-content-between text-primary"
            onClick={this.toggleCollapse("session")}
          >
            <p>
              <MDBIcon icon="history" className="mr-2" />
              Session History
            </p>
            {/* <MDBIcon icon={collapseID === "session" ? "angle-up" : "angle-down"} /> */}
          </MDBCollapseHeader>
          <MDBCollapse id="session" isOpen={true}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="12">
                  {sessionHistory ? (
                    <MDBDataTable sorting={"false"} paging={true} data={sessionHistory} searching={false} />
                  ) : null}
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
      </MDBContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    isLoading: state.common.isLoading,
    dataLoading: state.common.dataLoading,
    userInfo: state.user.userInfo,
    userSecurity: state.screen.setting.userSetting.userSecurity,
    sessionHistory: state.screen.setting.userSetting.sessionHistory,
    isSuccess: state.common.isSuccess,
    successMessage: state.common.successMessage
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { changePasswordAction, securityAction, securityEmailPrivacyEditAction, getUserSessionHistory },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SecurityControls);
