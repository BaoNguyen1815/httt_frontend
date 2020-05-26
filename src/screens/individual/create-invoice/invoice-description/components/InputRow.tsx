import React from "react";
import { IDescriptProps, IFunctionProps } from "../propState";
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from "mdbreact";

export default class InputRow extends React.Component<
  { descript: IDescriptProps; index: number; valid: boolean; currentClient: any } & IFunctionProps
> {
  render() {
    return (
      <MDBRow className="input-row">
        <MDBCol lg="6">
          <MDBInput
            type="textarea"
            label="Description"
            name="description"
            value={this.props.descript.description}
            rows="1"
            // onChange={event => this.props.handleDescriptChange(this.props.index, event)}
            onChange={(event: any) =>
              this.props.handleDescriptChange(this.props.index, event.target.name, event.target.value)
            }
          />
        </MDBCol>

        <MDBCol lg="6">
          <MDBRow>
            <MDBCol size="2">
              <MDBInput
                label="Quantity"
                value={this.props.descript.quantity}
                name="quantity"
                onChange={(event: any) =>
                  this.props.handleDescriptChange(this.props.index, event.target.name, event.target.value)
                }
              />
            </MDBCol>

            <MDBCol size="4">
              <MDBInput
                label="Unit Price"
                value={this.props.descript.unitPrice}
                name="unitPrice"
                onChange={(event: any) =>
                  this.props.handleDescriptChange(this.props.index, event.target.name, event.target.value)
                }
              />
            </MDBCol>

            <MDBCol size="4">
              <MDBInput
                label="Currency"
                value={Object.keys(this.props.currentClient).length ? this.props.currentClient.invoice_currency : ""}
                className="current-input"
                disabled
              />
            </MDBCol>

            <MDBCol size="2">
              <div className="wrap-button">
                {this.props.index === 0 ? (
                  <div className="button-add">
                    <MDBBtn
                      color="primary"
                      onClick={() => this.props.addNewDescript()}
                      disabled={!this.props.valid || !Object.keys(this.props.currentClient).length}
                    >
                      <MDBIcon icon="plus" size="2x" />
                    </MDBBtn>
                  </div>
                ) : (
                  <div className="button-delete">
                    <MDBBtn color="danger" onClick={() => this.props.removeDescript(this.props.index)}>
                      <MDBIcon icon="minus" size="2x" />
                    </MDBBtn>
                  </div>
                )}
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    );
  }
}
