import React from "react";
// components
import { MDBRow, MDBContainer, MDBInput } from "mdbreact";
// types
import { ITotalProps, IListDescriptProps, ITotalFunctionProps } from "../propState";

export default class DescriptionTotal extends React.Component<ITotalProps & IListDescriptProps & ITotalFunctionProps> {
  calTotal = listDescription => {
    return listDescription.reduce((current, descript) => {
      const quantity = descript.quantity ? parseFloat(descript.quantity) : 0.0;
      const unitPrice = descript.unitPrice ? parseFloat(descript.unitPrice) : 0.0;
      return current + quantity * unitPrice;
    }, 0);
  };
  calAmount = (total, taxes) => {
    return parseFloat(taxes) ? parseFloat(total) + parseFloat(taxes) : parseFloat(total) + 0;
  };
  render() {
    return (
      <MDBRow className="description-total">
        <MDBContainer className="justify-end" fluid>
          <div className="wrap">
            <div className="left-side">
              <p className="title">Total</p>
              <p className="title taxes">Taxes</p>
              <p className="title">Total Invoice Amount</p>
            </div>
            <div className="right-side">
              <p>{parseFloat(this.calTotal(this.props.listDescription)).toFixed(2)}$</p>
              <MDBInput
                label="Taxes"
                value={this.props.taxes}
                onChange={(e: any) => this.props.handleTaxChange(e.target.value)}
              />
              <p>{this.calAmount(this.calTotal(this.props.listDescription), this.props.taxes).toFixed(2)}$</p>
            </div>
          </div>
        </MDBContainer>
      </MDBRow>
    );
  }
}
