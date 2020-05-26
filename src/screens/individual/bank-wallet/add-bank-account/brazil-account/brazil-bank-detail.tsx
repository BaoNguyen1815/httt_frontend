import React from "react";
import { MDBInput, MDBBtn, MDBCol, MDBRow, MDBSelect, MDBSpinner, MDBAlert } from "mdbreact";

const BrazilBankDetailComponent = props => {
  return (
    <MDBRow md="12">
      <MDBCol md="6">
        <MDBInput
          label="Account Owner Name"
          className=""
          value={props.data.accountOwner}
          name="accountOwner"
          onChange={event => props.inputChange(event)}
          type="text"
          onBlur={event => props.onBlurChange(event)}
          required
        />
        <MDBInput
          label="Numero Do Banco"
          className=""
          value={props.data.numeroDoBanco}
          name="numeroDoBanco"
          onChange={event => props.inputChange(event)}
          type="number"
          onBlur={event => props.onBlurChange(event)}
          required
        />
        <MDBInput
          label="Agencia"
          className=""
          value={props.data.agencia}
          name="agencia"
          onChange={event => props.inputChange(event)}
          type="number"
          onBlur={event => props.onBlurChange(event)}
          required
        />
        <MDBInput
          label="Conta"
          className=""
          value={props.data.conta}
          name="conta"
          onChange={event => props.inputChange(event)}
          type="number"
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
        <MDBInput
          label="Account Owner CPF"
          hint="123.456.789-12"
          className=""
          value={props.data.accountOwnerCPF}
          name="accountOwnerCPF"
          onChange={event => props.inputChange(event)}
          type="text"
          onBlur={event => props.onBlurChange(event)}
          required
        />
        <MDBSelect
          selected="Select account type"
          className="text-left"
          options={props.data.brazilAccountType}
          label="Account Type"
          getValue={event => props.handleSelectChange(event, "accountType")}
          value={props.data.accountType}
        />
        <MDBInput
          label="Agencia Digit"
          className=""
          value={props.data.agenciaDigit}
          name="agenciaDigit"
          onChange={event => props.inputChange(event)}
          type="number"
          onBlur={event => props.onBlurChange(event)}
        />
        <MDBInput
          label="Conta Digit"
          className=""
          value={props.data.contaDigit}
          name="contaDigit"
          onChange={event => props.inputChange(event)}
          type="number"
          onBlur={event => props.onBlurChange(event)}
          required
        />
      </MDBCol>
    </MDBRow>
  );
};

export default BrazilBankDetailComponent;
