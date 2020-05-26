import React from "react";
import { MDBInput, MDBBtn, MDBCol, MDBRow, MDBSelect, MDBSpinner, MDBAlert } from "mdbreact";

const ChileBankDetailComponent = props => {
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
        <MDBInput
          hint="1234"
          label="Account Number"
          className="mt-4"
          value={props.data.accountNumber}
          name="accountNumber"
          onChange={event => props.inputChange(event)}
          type="number"
          onBlur={event => props.onBlurChange(event)}
          required
        />
        <MDBSelect
          selected="Select bank account type"
          className="text-left"
          options={props.data.chileAccountType}
          label="Bank Account Type"
          name="accountType"
          getValue={event => props.handleSelectChange(event, "accountType")}
          value={props.data.bankAccountType}
        />
        {props.data.isValidNumber ? null : (
          <MDBAlert color="danger">This some fields is invalid, please try again!</MDBAlert>
        )}
        <MDBBtn style={{ float: "left", marginLeft: 0 }} disabled={!props.data.formValid || props.data.isLoading} type="submit" color="primary">
          Continue {props.data.isLoading ? <MDBSpinner small /> : null}
        </MDBBtn>
      </MDBCol>
      <MDBCol md="6">
        <MDBInput
          hint="RUT Number Format"
          label="RUT Number"
          className="mt-4"
          value={props.data.RUTNumber}
          name="RUTNumber"
          onChange={event => props.inputChange(event)}
          type="text"
          onBlur={event => props.onBlurChange(event)}
          required
        />
        <MDBInput
          hint="SWIFT Number Format"
          label="SWIFT"
          className="mt-4"
          value={props.data.SWIFTNumber}
          name="SWIFTNumber"
          onChange={event => props.inputChange(event)}
          type="text"
          onBlur={event => props.onBlurChange(event)}
          required
        />
      </MDBCol>
    </MDBRow>
  );
};

export default ChileBankDetailComponent;
