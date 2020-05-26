import React from "react";
import { MDBInput, MDBBtn, MDBCol, MDBRow, MDBAlert, MDBSpinner, MDBSelect } from "mdbreact";

const SEPADetailComponent = props => {
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
      </MDBCol>
      <MDBCol md="6" />
      <MDBCol md="6">
        <MDBInput
          hint={props.data.bankType === "SEPA" ? "NL18RABO0316919004" : "GB71AIBK23859016586051"}
          label="IBAN Number"
          className="mt-4"
          value={props.data.ibanNumber}
          name="ibanNumber"
          onChange={event => props.inputChange(event)}
          type="text"
          onBlur={event => props.onBlurChange(event)}
          required
        />
        <MDBSelect
          selected="Country of Tax Identification"
          className="text-left"
          options={props.data.sepaCountryOptions}
          label="Country of Tax Identification"
          getValue={event => props.handleSelectChange(event, "countryTax")}
          value={props.data.countryTax}
        />
        {props.data.isValidNumber ? null : (<MDBAlert color="danger"> {props.data.responseMess ? props.data.responseMess : "Some fields are invalid, please try again!"} </MDBAlert>
        )}
        <MDBBtn
          style={{ float: "left", marginLeft: 0 }}
          color="primary"
          disabled={!props.data.formValid || props.data.isLoading}
          type="submit"
        >
          Continue {props.data.isLoading ? <MDBSpinner small /> : null}
        </MDBBtn>
      </MDBCol>
      <MDBCol md="6">
        <MDBInput
          hint={props.data.bankType === "SEPA" ? "NL18RABO0316919004" : "GB71AIBK23859016586051"}
          label="Repeat IBAN Number"
          className="mt-4"
          value={props.data.repeatIbanNumber}
          name="repeatIbanNumber"
          onChange={event => props.inputChange(event)}
          type="text"
          onBlur={event => props.onBlurChange(event)}
          required
        />
        <MDBInput
          hint="Tax Identification Number"
          label="Tax Identification Number"
          className="mt-4"
          value={props.data.taxIdentification}
          name="taxIdentification"
          onChange={event => props.inputChange(event)}
          type="number"
          onBlur={event => props.onBlurChange(event)}
          required
        />
      </MDBCol>
    </MDBRow>
  );
};

export default SEPADetailComponent;
