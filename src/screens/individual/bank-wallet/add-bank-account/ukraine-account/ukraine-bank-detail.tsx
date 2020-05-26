import React from "react";
import { MDBInput, MDBBtn, MDBCol, MDBRow, MDBAlert, MDBSpinner } from "mdbreact";
import Cleave from "cleave.js/dist/cleave-react";
const UkraineBankDetailComponent = props => {
  const onCreditCardTypeChanged = (type) => {
    console.log("type", type);
    // debugger;
  }
  return (
    <MDBRow md="12">
      <MDBCol md="6">
        <MDBInput
          label="Card Owner Name"
          className="mt-4"
          value={props.data.cardOwnerName}
          name="cardOwnerName"
          onChange={event => props.inputChange(event)}
          type="text"
          onBlur={event => props.onBlurChange(event)}
          required
        />
      </MDBCol>
      <MDBCol md="6" />
      <MDBCol md="6">
        <span style={{ marginBottom: -20 }} className={props.validUntil ? "fake-label" : "fake-label"}>Card Number</span>
        <div className="cardNumber">
          <Cleave
            style={{ marginTop: "2rem" }}
            className="date-type"
            placeholder="Card Number"
            value={props.data.cardNumber}
            options={{ creditCard: true, onCreditCardTypeChanged: onCreditCardTypeChanged, delimiter: ' ' }}
            onChange={event => props.inputChange(event)}
            name="cardNumber"
            onBlur={event => props.onBlurChange(event)}
          />
        </div>
        <MDBInput
          style={{ marginTop: 45 }}
          label="Tax Identification Number"
          className="mt-4"
          value={props.data.identificationNumber}
          name="identificationNumber"
          onChange={event => props.inputChange(event)}
          type="text"
          onBlur={event => props.onBlurChange(event)}
          required
        />
        {props.data.isValidNumber ? null : (
          <MDBAlert color="danger"> {props.data.responseMess ? props.data.responseMess : "Some fields are invalid, please try again!"} </MDBAlert>
        )}
        <MDBBtn style={{ float: "left", marginLeft: 0 }} disabled={!props.data.formValid || props.data.isLoading} type="submit" color="primary">
          Continue {props.data.isLoading ? <MDBSpinner small /> : null}
        </MDBBtn>
      </MDBCol>
      <MDBCol md="6">
        <div className="cardNumber" style={{ marginBottom: 30 }}>
          <span style={{ marginBottom: -20 }} className={props.validUntil ? "fake-label" : "fake-label"}>Repeat Card Number</span>
          <Cleave
            style={{ marginTop: "2rem" }}
            className="date-type"
            placeholder="Repeat Card Number"
            value={props.data.repeatCardNumber}
            options={{ creditCard: true, onCreditCardTypeChanged: onCreditCardTypeChanged, delimiter: ' ' }}
            onChange={event => props.inputChange(event)}
            name="repeatCardNumber"
            onBlur={event => props.onBlurChange(event)}
          />
        </div>

        <span className={props.validUntil ? "fake-label" : "fake-label"}>Valid until</span>
        <Cleave
          style={{ marginTop: 5 }}
          className="date-type valid-until"
          placeholder="MM/YY"
          value={props.data.validUntil}
          options={{ date: true, datePattern: ["m", "d"] }}
          onChange={event => props.inputChange(event)}
          name="validUntil"
          onBlur={event => props.onBlurChange(event)}
        />
      </MDBCol>
    </MDBRow>
  );
};

export default UkraineBankDetailComponent;
