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
  MDBSpinner
} from "mdbreact";
import { Link } from 'react-router-dom';

const loginControl = props => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol sm="12" md="10" lg="6" className="mx-auto my-auto">
          <div className="login-page">
            <MDBCard className="face front">
              <MDBCardBody>
                <MDBCardHeader className="form-header primary-color rounded">
                  <h3 className="my-2 py-1 font-weight-500">
                    <MDBIcon icon="sign-in-alt" /> Login
                    </h3>
                </MDBCardHeader>
                <form className="needs-validation" onSubmit={props.login} noValidate>
                  {props.error ? (
                    <MDBAlert color="danger" dismiss>
                      <p className="m-0">{props.errMess}</p>
                    </MDBAlert>
                  ) : null}
                  <div className="grey-text">
                    <MDBInput
                      label="Your email"
                      placeholder="Email address"
                      icon="envelope"
                      group
                      type="email"
                      name="username"
                      validate
                      error="wrong"
                      success="right"
                      value={props.data.email}
                      required
                      onChange={() => props.dataChange(event)}
                    >
                      {props.data.emailValid ? null : (
                        <div className="invalid-feedback"> {props.data.formErrors.email}</div>
                      )}
                    </MDBInput>
                    <MDBInput
                      label="Your password"
                      placeholder="Password"
                      icon="lock"
                      group
                      name="password"
                      type="password"
                      validate
                      value={props.data.password}
                      onChange={() => props.dataChange(event)}
                      required
                    >
                      {props.data.passwordValid ? null : (
                        <div className="invalid-feedback"> {props.data.formErrors.password}</div>
                      )}
                    </MDBInput>
                    <div className="md-form">
                      <div className="my-4 checkbox-remember">
                        <MDBInput
                          onChange={props.rememberMeChange}
                          checked={props.data.rememberMe}
                          label="Remember me"
                          type="checkbox"
                          id="checkbox1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Link className="text-primary" to={props.isAdmin ? "/company/sign-up" : "/individual/sign-up"}>
                      Create account
                      </Link>
                    <Link className="grey-text" to={props.isAdmin ? "/company/forgot" : "/individual/forgot"}>
                      Forgot password?
                      </Link>
                  </div>
                  <div className="text-center mt-4">
                    <MDBBtn color="primary" className="btn-lg" type="submit" disabled={props.isLoading}>
                      <MDBIcon icon="sign-in-alt" className="mr-1" /> Login
                      {props.isLoading ? <MDBSpinner small /> : null}
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
    </MDBContainer>
  );
}

export default loginControl;