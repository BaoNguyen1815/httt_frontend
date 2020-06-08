import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBIcon, MDBInput, MDBRow, MDBSelect } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import validation from "services/validation";
import { IProps, IState } from "./propState";
import { signUpAction } from "./redux/actions";

class SignupComponent extends React.Component<IProps> {
  state: IState = {
    username: "",
    password: "",
    repeat_password: "",
    fullName: "",
    role: "SELLER",
    option: [
      {
        checked: true,
        text: "SELLER",
        value: "SELLER"
      },
      {
        text: "ADMIN",
        value: "ADMIN"
      }
    ]
  };

  handleChange = (field: string) => (event: any) => {
    event.persist();
    this.setState(state => ({ ...state, [field]: event.target.value }));
  };

  validate = () => {
    let isValid = "";

    if (!validation.validateName(this.state.username)) {
      isValid = "All fields are required";
    }
    if (!validation.validatePassword(this.state.password)) {
      isValid = "Password must be more than 8 characters";
    }
    if (!validation.validateName(this.state.fullName)) {
      isValid = "All fields are required";
    }
    if (!validation.validateName(this.state.role)) {
      isValid = "All fields are required";
    }
    if (this.state.repeat_password === this.state.password) {
      isValid = "The repeate password must be similar to the password";
    }
    return { isValid };
  };

  signup = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    // if (
    //   validateSignup(
    //     this.state.username,
    //     this.state.password,
    //     this.state.repeat_password,
    //     this.state.fullName,
    //     this.state.role
    //   )
    // ) {
    this.props.signUpAction(this.state.username, this.state.password, this.state.fullName, this.state.role);
    // } else {
    //   event.preventDefault();
    // }
  };

  handleSelectChange = event => {
    this.setState({ ...this.state, role: event[0] });
  };

  render() {
    return (
      // <ContainerComponent>
      <MDBRow style={{ marginTop: 70 }}>
        <MDBCol sm="12" md="10" lg="6" xl="5" className="mx-auto my-auto">
          <div className="login-page">
            <MDBCard className="face front">
              <MDBCardBody>
                <MDBCardHeader className="form-header primary-color rounded">
                  <h3 className="my-2 py-1 font-weight-500">
                    <MDBIcon icon="user-edit" /> Signup
                  </h3>
                </MDBCardHeader>
                <form className="needs-validation" onSubmit={this.signup} noValidate>
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
                    <MDBInput
                      label="Your repeate password"
                      placeholder="Repeate Password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      value={this.state.repeat_password}
                      onChange={this.handleChange("repeat_password")}
                      required
                    >
                      <div className="invalid-feedback">Please provide a valid repeate password....</div>
                    </MDBInput>
                    <MDBInput
                      label="Your name"
                      placeholder="Name"
                      icon="user"
                      group
                      validate
                      value={this.state.fullName}
                      onChange={this.handleChange("fullName")}
                      required
                    >
                      <div className="invalid-feedback">Please provide a valid fullname....</div>
                    </MDBInput>
                    <MDBSelect
                      options={this.state.option}
                      selected="Choose Role"
                      label="Role"
                      getValue={this.handleSelectChange}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <Link className="grey-text" to="/login">
                      Back to login
                    </Link>
                  </div>
                  <div className="text-center mt-4">
                    <MDBBtn color="primary" className="btn-lg" type="submit">
                      <MDBIcon icon="user-edit" className="mr-1" /> Signup
                    </MDBBtn>
                  </div>
                  <p className="text-muted text-center my-3">© Bitwage Inc, 2014-2019</p>
                </form>
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBCol>
      </MDBRow>
      // {/* </ContainerComponent> */}
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ signUpAction }, dispatch);

export default connect(null, mapDispatchToProps)(SignupComponent);
