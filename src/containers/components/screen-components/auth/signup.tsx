import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBAlert,
  MDBInput,
  MDBBtn,
  MDBSpinner,
  MDBSelect,
  MDBProgress
} from "mdbreact";
import { Link } from 'react-router-dom';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SignUpControl = props => {
  const isAdmin = props.isAdmin;
  const role = localStorage.getItem("role")
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol sm="12" md="10" lg="8" xl="8" className="mx-auto my-auto" id="signup-page">
          <div className="login-page">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header primary-color rounded">
                  <h3 className="my-2 py-1 font-weight-500">
                    <MDBIcon icon="user-plus" /> Sign Up
                  </h3>
                </MDBCardHeader>
                <form className="needs-validation" onSubmit={props.onCreate} noValidate>
                  {props.error ? (
                    <MDBAlert color="danger" dismiss>
                      <strong>Error</strong>
                      <p className="m-0">{props.message}.</p>
                    </MDBAlert>
                  ) : null}
                  <div className="grey-text">
                    <MDBRow>
                      <MDBCol sm="12" md="8" className="mx-auto">
                        <PhoneInput
                          placeholder={isAdmin ? "Admin Mobile Phone" : "Enter mobile number"}
                          searchPlaceholder="Enter mobile number"
                          containerClass="react-tel-input phone-input"
                          country={props.data.phone_country}
                          value={props.data.phone_number}
                          onChange={(value, data) => props.phoneChange(value, data)}
                        />
                        <small className="suggest-text">
                          For multi factor authentication. You will receive an SMS to verify number.
                        </small>
                      </MDBCol>
                    </MDBRow>
                    <MDBInput
                      label={isAdmin ? "Admin Email" : "Your Email"}
                      placeholder="Email address"
                      icon="envelope"
                      group
                      type="email"
                      name="username"
                      validate
                      error="wrong"
                      success="right"
                      required
                      value={props.data.username}
                      onChange={() => props.dataChange(event)}
                    >
                      <small className="grey-text">You will receive an email to verify your email.</small>
                    </MDBInput>
                    <MDBRow>
                      <MDBCol sm="12" md="6">
                        <MDBInput
                          label={isAdmin ? "Admin Name" : "First Name"}
                          placeholder="Email address"
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          required
                          name="first_name"
                          value={props.data.first_name}
                          onChange={() => props.dataChange(event)}
                        />
                      </MDBCol>
                      <MDBCol sm="12" md="6">
                        <MDBInput
                          label={isAdmin ? "Admin Surname" : "Last name"}
                          placeholder="Last name"
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          required
                          name="last_name"
                          value={props.data.last_name}
                          onChange={() => props.dataChange(event)}
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol sm="12" md="6">
                        <MDBInput
                          containerClass="mb-0"
                          label="Password"
                          placeholder="Password"
                          icon="lock"
                          group
                          type="password"
                          validate
                          error="wrong"
                          success="right"
                          required
                          name="password"
                          value={props.data.password}
                          onChange={() => props.dataChange(event)}
                        />
                        <div className="invalid-feedback">Please provide a valid city.</div>
                        <MDBProgress
                          className="progress-input"
                          animated={true}
                          value={props.passResult.score === 0 && props.data.password ? 1 : props.passResult.score}
                          max={4}
                        >
                          {props.passwordLabel(props.passResult)}
                        </MDBProgress>
                        {props.passwordLabel(props.passResult) === "Weak" && props.data.password.length < 6 ? (
                          <small>Password must be at least 6 characters. </small>
                        ) : null}
                      </MDBCol>
                      <MDBCol sm="12" md="6">
                        <MDBInput
                          label="Repeat Password"
                          placeholder="Repeat Password"
                          icon="lock"
                          group
                          type="password"
                          validate
                          error="wrong"
                          success="right"
                          required
                          value={props.data.rePassword}
                          name="rePassword"
                          onChange={() => props.dataChange(event)}
                        >
                          {props.data.rePassword !== props.data.password ? (
                            <small className="invalid-fb">
                              Password and Repeat Password are not identical. <br />
                            </small>
                          ) : null}
                          {props.passwordLabel(props.passResult) === "Weak" && props.data.rePassword.length < 6 ? (
                            <small>Repeat Password must be at least 6 characters.</small>
                          ) : null}
                        </MDBInput>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow hidden={isAdmin}>
                      <MDBCol sm="12" md="6">
                        <div className="employee-select">
                          <p>Are you an employee or a contractor?</p>
                        </div>
                      </MDBCol>
                      <MDBCol sm="12" md="6">
                        <MDBSelect
                          search
                          options={props.data.options}
                          getValue={value => props.selectChange(value)}
                          color="primary"
                          selected="Choose your option"
                          label="Select"
                        />
                      </MDBCol>
                    </MDBRow>
                    <div className="md-form">
                      <div className="my-4 checkbox-term">
                        <MDBInput
                          label="By signing up I agree to the"
                          type="checkbox"
                          id="checkbox1"
                          onChange={() => props.agreeTerm()}
                          checked={props.data.agreeTerms}
                        />
                        <span className="text-term">
                          <a className="text-primary" target="_blank" href="https://www.bitwage.com/policies/#terms">
                            Term of Use,{"\u00A0"}
                          </a>
                          <a className="text-primary" target="_blank" href="https://www.bitwage.com/policies/#privacy">
                            Privacy,{"\u00A0"}
                          </a>
                          <a className="text-primary" target="_blank" href="https://www.bitwage.com/policies/#security">
                            Security,{"\u00A0"}
                          </a>
                          and{"\u00A0"}
                          <a
                            className="text-primary"
                            target="_blank"
                            href="https://www.bitwage.com/policies/#disclosure"
                          >
                            Disclosure,{"\u00A0"}
                          </a>
                          Policies
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Link className="text-primary" to={isAdmin ? "/company/login" : `/${role}/login`}>
                      Login
                    </Link>
                    <Link className="grey-text" to={isAdmin ? "/company/forgot" : "/individual/forgot"}>
                      Forgot password?
                    </Link>
                  </div>
                  <div className="text-center mt-4">
                    <MDBBtn
                      disabled={!props.data.formValid || props.isLoading}
                      color="primary"
                      className="btn-lg"
                      type="submit"
                    >
                      <MDBIcon icon="sign-in-alt" className="mr-1" /> Submit
                      {props.isLoading ? <MDBSpinner small /> : null}
                    </MDBBtn>
                  </div>
                  <p className="text-muted text-center my-3">© Bitwage Inc, 2014-2020</p>
                </form>
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignUpControl;
