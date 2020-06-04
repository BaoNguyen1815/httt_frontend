import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRotatingCard,
  MDBRow
} from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { validateLogin } from "../../services/user/validateLogin";
import { IProps, IState } from "./propState";
import { logInAction } from "./redux/actions";

class LoginComponent extends React.Component<IProps> {
  state: IState = {
    username: "",
    password: "",
    repeat_password: "",
    flipped: false
  };

  handleChange = (field: string) => (event: any) => {
    event.persist();
    this.setState(state => ({ ...state, [field]: event.target.value }));
  };

  login = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    if (validateLogin(this.state.username, this.state.password)) {
      this.props.logInAction(this.state.username, this.state.password);
    } else {
      event.preventDefault();
    }
  };

  render() {
    return (
      // <ContainerComponent>
      <MDBRow style={{ marginTop: 70 }}>
        <MDBCol sm="12" md="10" lg="6" xl="5" className="mx-auto my-auto">
          <div className="login-page">
            <MDBRotatingCard flipped={this.state.flipped} className="text-center h-100 w-100">
              <MDBCard className="face front">
                <MDBCardBody>
                  <MDBCardHeader className="form-header primary-color rounded">
                    <h3 className="my-2 py-1 font-weight-500">
                      <MDBIcon icon="sign-in-alt" /> Login
                    </h3>
                  </MDBCardHeader>
                  <form className="needs-validation" onSubmit={this.login} noValidate>
                    <div className="grey-text">
                      <MDBInput
                        label="Your username"
                        placeholder="Username"
                        icon="envelope"
                        group
                        validate
                        error="wrong"
                        success="right"
                        value={this.state.username}
                        required
                        onChange={this.handleChange("username")}
                      >
                        <div className="invalid-feedback">Please provide a valid username....</div>
                      </MDBInput>

                      <MDBInput
                        label="Your password"
                        placeholder="Password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        value={this.state.password}
                        onChange={this.handleChange("password")}
                        required
                      >
                        <div className="invalid-feedback">Please provide a valid password....</div>
                      </MDBInput>
                    </div>
                    <div className="d-flex justify-content-between">
                      <Link className="grey-text" to="/f">
                        Forgot password?
                      </Link>
                      <Link className="grey-text" to="/signup">
                        You don't have an account? Sign up now!
                      </Link>
                    </div>
                    <div className="text-center mt-4">
                      <MDBBtn color="primary" className="btn-lg" type="submit">
                        <MDBIcon icon="sign-in-alt" className="mr-1" /> Login
                      </MDBBtn>
                    </div>
                    <p className="text-muted text-center my-3">© Bitwage Inc, 2014-2019</p>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBRotatingCard>
          </div>
        </MDBCol>
      </MDBRow>
      // {/* </ContainerComponent> */}
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ logInAction }, dispatch);

export default connect(null, mapDispatchToProps)(LoginComponent);
