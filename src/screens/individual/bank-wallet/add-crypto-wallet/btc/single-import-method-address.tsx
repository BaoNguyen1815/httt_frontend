import React from "react";
import { MDBBtn, MDBCol, MDBRow, MDBSelect } from "mdbreact";

const BTCImportMethodComponent = props => {
  return (
    <MDBRow md="12">
      <MDBCol md="8">
        <MDBSelect
          className="text-left"
          selected="Select your option"
          options={props.data.importMethodOptions}
          label="Import Method"
          getValue={event => props.handleSelectChange(event, "importMethod")}
          value={props.data.importMethod}
        />
        <MDBBtn
          style={{ float: "left", marginLeft: 0 }}
          color="primary"
          onClick={props.nextStep}
          disabled={!props.data.importMethod}
          type="submit"
        >
          Continue
        </MDBBtn>
      </MDBCol>
    </MDBRow>
  );
};

export default BTCImportMethodComponent;
