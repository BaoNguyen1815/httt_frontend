import React from "react";
// components
import InputRow from "./InputRow";
import { MDBRow, MDBContainer } from "mdbreact";
// types
import { IListDescriptProps, IFunctionProps, ICheckValid } from "../propState";

// tslint:disable-next-line: prettier
export default class DescriptionInput extends React.Component<IListDescriptProps & IFunctionProps & ICheckValid & {currentClient: object}> {
  render() {
    return (
      <MDBRow className="description-input">
        <MDBContainer fluid className="wrap">
          {this.props.listDescription.map((descript, index) => (
            <InputRow
              key={index}
              descript={descript}
              index={index}
              handleDescriptChange={this.props.handleDescriptChange}
              addNewDescript={this.props.addNewDescript}
              removeDescript={this.props.removeDescript}
              valid={this.props.checkValid(this.props.listDescription)}
              currentClient={this.props.currentClient}
            />
          ))}
        </MDBContainer>
      </MDBRow>
    );
  }
}
