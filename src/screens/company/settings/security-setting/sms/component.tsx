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
import { userUpdateSMS } from "../services";
import { securityAction } from "../../ducks/actions";

const initialState = {
  smsModal: false,
  isDisable: true,
  gauth_twofa: "",
  turnoffsms: "",
  isSuccess: false,
  isFalse: false,
  isLoading: false
};
class SMSComponent extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    this.setState(initialState);
  }

  toggle = async (isReload?) => {
    await this.props.switchChange();
    // if (this.props.switchChecked) {
    this.setState({
      smsModal: !this.state.smsModal,
      isSuccess: false,
      isFalse: false,
      isLoading: false,
      gauth_twofa: ""
    });
    if (isReload === true) {
      this.props.securityAction(this.props.userInfo.user_id);
    }
    // }
  };

  handleChange = (field: string) => (event: any) => {
    event.persist();
    this.setState({
      ...this.state,
      [field]: event.target.value
    });
  };

  verifyCode = async () => {
    event.preventDefault();
    if (!this.state.gauth_twofa) {
      return;
    }

    if (this.state.isSuccess) {
      this.toggle(true);
      return;
    }
    this.setState({ isLoading: true, isFalse: false, isSuccess: false });
    const res = await userUpdateSMS(
      this.props.userInfo.user_id,
      this.state.gauth_twofa,
      this.props.switchChecked ? "False" : "True"
    );
    if (res.user_id) {
      this.setState({
        ...this.state,
        isSuccess: true,
        isLoading: false
      });
    } else {
      this.setState({
        ...this.state,
        isFalse: true,
        isLoading: false
      });
    }
  };

  render() {
    const smsFalse = (
      <MDBAlert color="danger" className="alert-label mt-50" dismiss>
        Invalid gauth token, please check again!
      </MDBAlert>
    );
    const smsSuccess = (
      <MDBAlert color="success" className="alert-label mt-50" dismiss>
        update Successful!
      </MDBAlert>
    );

    const VerifyCation = (
      <>
        <MDBModalHeader
          toggle={() => {
            this.toggle(true);
          }}
        >
          {!this.props.switchChecked ? "Turn off" : "Turn on"} SMS Verification
        </MDBModalHeader>
        <MDBModalBody>
          <MDBRow>
            <MDBCol className="mx-auto my-auto">
              <div className="gauth-access">
                <MDBCard>
                  <MDBCardBody>
                    <form className="needs-validation" noValidate>
                      <div>
                        <p className="text-center">Enter the access code from Google</p>
                        <p className="text-center">
                          problems receiving the SMS? try
                          <Link
                            className="text-primary"
                            to="https://support.bitwage.com/article/28-two-factor-authentication"
                          >
                            {" "}
                            Bitwage or Google authenticator
                          </Link>
                        </p>
                      </div>
                      <div className="grey-text">
                        <MDBRow>
                          <MDBCol sm="12" md="8" className="mx-auto">
                            <MDBInput
                              hidden={this.state.isSuccess}
                              label="Access Code"
                              placeholder="Enter Access Code"
                              icon="key"
                              group
                              type="number"
                              validate
                              error="wrong"
                              success="right"
                              value={this.state.gauth_twofa}
                              onChange={this.handleChange("gauth_twofa")}
                              required
                            />
                          </MDBCol>
                          <br />
                          <MDBCol sm="12" md="8" className="mx-auto">
                            {this.state.isSuccess ? smsSuccess : null}
                            {this.state.isFalse ? smsFalse : null}
                          </MDBCol>
                        </MDBRow>
                      </div>
                      <div className="text-center mt-4">
                        <MDBBtn
                          color="primary"
                          className="btn-lg"
                          type="submit"
                          disabled={this.state.isLoading || this.state.gauth_twofa === ""}
                          onClick={this.verifyCode}
                        >
                          <MDBIcon icon="sign-in-alt" className="mr-1" /> {!this.state.isSuccess ? "Save Change" : "Ok"}
                          {this.state.isLoading ? <MDBSpinner small /> : null}
                        </MDBBtn>
                      </div>
                      <p className="text-muted text-center my-3">© Bitwage Inc, 2014-2020</p>
                    </form>
                  </MDBCardBody>
                </MDBCard>
                {/*create account*/}
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
          // onChange={this.props.switchChange}
          onChange={this.toggle}
          disabled={this.props.isDisable}
        />
        <MDBModal size="lg" isOpen={this.state.smsModal} toggle={this.toggle}>
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

export default connect(mapStateToProps, mapDispatchToProps)(SMSComponent);
