import React from "react";
import { MDBInput, MDBBtn, MDBCol, MDBRow, MDBSelect, MDBAlert, MDBSpinner } from "mdbreact";

const USABankDetailComponent = props => {
  return (
    <MDBRow md="12">
      <MDBCol md="6">
        <MDBInput
          label="Account Owner Name"
          className="mt-4"
          value={props.data.accountOwner}
          name="accountOwner"
          onChange={event => props.inputChange(event)}
          type="text"
          onBlur={event => props.onBlurChange(event)}
          required
        />
        <MDBSelect
          selected="Select account type"
          className="text-left"
          options={props.data.accountTypeOptions}
          label="Account Type"
          getValue={event => props.handleSelectChange(event, "accountType")}
          value={props.data.accountType}
        />
        <MDBInput
          hint="12345678"
          label="Bank Account Number"
          className="mt-4"
          value={props.data.bankAccountNumber}
          name="bankAccountNumber"
          onChange={event => props.inputChange(event)}
          type="number"
          onBlur={event => props.onBlurChange(event)}
          required
        />
        {props.data.isValidNumber ? null : (
          <MDBAlert color="danger"> {props.data.responseMess ? props.data.responseMess : "Some fields are invalid, please try again!"} </MDBAlert>
        )}
        <MDBBtn style={{ float: "left", marginLeft: 0 }}
          disabled={!props.data.formValid || props.data.isLoading}
          onClick={props.addBankAccount}
          color="primary"
          type="submit"
        >
          Continue {props.data.isLoading ? <MDBSpinner small /> : null}
        </MDBBtn>
      </MDBCol>
      <MDBCol md="6">
        <MDBInput
          label="Social Security Number"
          className="mt-4"
          value={props.data.socialSecurity}
          name="socialSecurity"
          onChange={event => props.inputChange(event)}
          type="number"
          onBlur={event => props.onBlurChange(event)}
          required
        />
        <MDBInput
          hint="021052053"
          label="Routing Number"
          className="mt-4"
          value={props.data.routingNumber}
          name="routingNumber"
          onChange={event => props.inputChange(event)}
          type="number"
          onBlur={event => props.onBlurChange(event)}
          required
        />
        <MDBInput
          hint="12345678"
          label="Repeat Bank Account Number"
          className="mt-4"
          value={props.data.repeatBankAccountNumber}
          name="repeatBankAccountNumber"
          onChange={event => props.inputChange(event)}
          type="number"
          onBlur={event => props.onBlurChange(event)}
          required
        />
      </MDBCol>
    </MDBRow>
  );
};

export default USABankDetailComponent;
