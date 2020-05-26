import React from "react";
import { MDBInput, MDBBtn, MDBCol, MDBRow, MDBSpinner, MDBAlert } from "mdbreact";

const BTCAddListAddressComponent = props => {
  return (
    <MDBRow md="12">
      <MDBCol md="8" className="text-left">
        <p>Upload up to 100 addresses for enhanced privacy.</p>
        <br />
        <p>
          For each payroll we will use a new address from this list starting from the first line. After we reach the end
          we will distribute all future payrolls to the last address in the list.
        </p>
        <br />
        <p>each line: bitcoin_address</p>
        <MDBInput
          type="textarea"
          className="mt-4"
          name="cryptoCurrencyAddress"
          label="Bitcoin Address"
          rows="5"
          value={props.data.cryptoCurrencyAddress}
          onChange={event => props.inputChange(event)}
          required
          onBlur={event => props.onBlurChange(event)}
        />
        {!props.data.isValidCrypto ? (
          <MDBAlert color="danger">This CryptoCurrency Wallet address is invalid, please try again!</MDBAlert>
        ) : null}
        {props.data.isExited ? (
          <MDBAlert color="danger">CryptoCurrency wallet already exists, please try again!</MDBAlert>
        ) : null}
        <MDBBtn
          style={{ float: "left", marginLeft: 0 }}
          color="primary"
          disabled={!props.data.formValid || props.data.isLoading}
          type="submit"
        >
          Continue {props.data.isLoading ? <MDBSpinner small /> : null}
        </MDBBtn>
      </MDBCol>
    </MDBRow>
  );
};

export default BTCAddListAddressComponent;
