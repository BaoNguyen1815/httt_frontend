import React from "react";
import { MDBInput, MDBBtn, MDBCol, MDBRow, MDBSpinner, MDBIcon, MDBAlert } from "mdbreact";

const verificationComponent = props => {
  return (
    <MDBRow className="md-auto">
      <MDBCol md="8" className="offset-md-2">
        <div>
          <b className="text-center">Enter the access code sent via SMS to {" "}</b>
          <b className="text-info text-center">
            {props.phoneNumber
              ? `+${props.phoneNumber.substring(0, 2)} XXXXXXX ${props.phoneNumber.substr(
                props.phoneNumber.length - 2
              )}`
              : null}
          </b>
        </div>
        <MDBRow className="mx-auto verify-bank text-left">
          {props.data.accessCodeInValid ? (
            <MDBAlert color="danger" className="text-center w-100 mt-20">Access code wrong, please try again!</MDBAlert>
          ) : null}
          {props.data.countToExpire === 0 ? (
            <MDBAlert color="danger" className="text-center w-100 mt-20">Number of SMS resend expired</MDBAlert>
          ) : null}

          <MDBInput
            label="Access Code"
            placeholder="Enter Access Code"
            icon="key"
            group
            type="number"
            validate
            error="wrong"
            success="right"
            required
            name="verificationCode"
            value={props.data.verificationCode}
            onChange={event => props.inputChange(event)}
            onBlur={event => props.onBlurChange(event)}
          />
        </MDBRow>
        <div className="text-center mt-4">
          <MDBBtn onClick={() => props.reSendCode()} disabled={props.data.isLoading}>
            {" "}
            <MDBIcon icon="mobile-alt" className="mr-1" /> Resend ({props.data.countToExpire})
          </MDBBtn>
          <MDBBtn
            color="primary"
            className="btn-lg mll-20"
            disabled={props.data.isLoading || props.data.verificationCode === ""}
            onClick={event => props.submitVerification(event)}
            name="2fa-submit"
          >
            <MDBIcon icon="sign-in-alt" className="mr-1" /> Submit
            {props.isLoading ? <MDBSpinner small /> : null}
          </MDBBtn>
        </div>
      </MDBCol>
    </MDBRow>
  );
};

export default verificationComponent;
