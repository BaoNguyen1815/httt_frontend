import React from "react";
import { MDBInput, MDBBtn, MDBCol, MDBRow, MDBAlert, MDBSpinner, MDBSelect } from "mdbreact";

const MexicoBankDetailComponent = props => {
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
          onBlur={() => props.onBlurChange(event)}
          required
        />
        <MDBSelect
          selected="Select Identification Number"
          className="text-left"
          options={props.data.identificationMexico}
          label="Select Identification Number"
          getValue={event => props.handleSelectChange(event, "identificationType")}
          value={props.data.identificationType}
        />
        {props.data.isValidNumber ? null : (
          <MDBAlert color="danger"> {props.data.responseMess ? props.data.responseMess : "Some fields are invalid, please try again!"} </MDBAlert>
        )}
        <MDBBtn
          style={{ float: "left", marginLeft: 0 }}
          type="submit"
          color="primary"
          disabled={!props.data.formValid || props.data.isLoading}
        >
          Continue {props.data.isLoading ? <MDBSpinner small /> : null}
        </MDBBtn>
      </MDBCol>
      <MDBCol md="6">
        <MDBInput
          hint="646180115400787192"
          label="CLABE Number"
          className="mt-4"
          value={props.data.CLABENumber}
          name="CLABENumber"
          onChange={event => props.inputChange(event)}
          type="number"
          onBlur={event => props.onBlurChange(event)}
          required
        />
        <MDBInput
          hint="Enter selected Identification Number"
          label="Enter selected Identification Number"
          className="mt-4"
          value={props.data.identificationNumber}
          name="identificationNumber"
          onChange={event => props.inputChange(event)}
          type="text"
          onBlur={event => props.onBlurChange(event)}
          required
        />
      </MDBCol>
    </MDBRow>
  );
};

export default MexicoBankDetailComponent;