import React from "react";
import { MDBInput, MDBBtn, MDBCol, MDBRow, MDBSpinner, MDBAlert } from "mdbreact";

const routingNumberControl = props => {
  return (
    <MDBRow md="12">
      <MDBCol md="8">
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
        {!props.isRoutingSuccess ? <MDBAlert color="danger">Routing Number is not correct</MDBAlert> : null}
        <MDBBtn
          style={{ float: "left", marginLeft: 0 }}
          color="primary"
          onClick={props.getBankName}
          disabled={props.data.routingNumber.length < 3 || props.isRoutingLoading}
        >
          Continue {props.isRoutingLoading ? <MDBSpinner small /> : null}
        </MDBBtn>
      </MDBCol>
    </MDBRow>
  );
};

export default routingNumberControl;
