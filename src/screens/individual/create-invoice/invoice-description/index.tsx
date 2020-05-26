import React from "react";
// components
import DescriptionInput from "./components/DescriptionInput";
import DescriptionTotal from "./components/DescriptionTotal";
import { MDBRow, MDBContainer } from "mdbreact";
// types
import { IState, IProps } from "./propState";

const initialState = {
  listDescription: [
    {
      description: "",
      quantity: "",
      unitPrice: ""
    }
  ],
  taxes: ""
};

export default class InvoiceDescription extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidUpdate(prevProps, _) {
    if (prevProps !== this.props) {
      this.setState(initialState);
    }
  }
  addNewDescript = () => {
    this.setState(state => ({
      listDescription: [
        ...state.listDescription,
        {
          description: "",
          quantity: "",
          unitPrice: ""
        }
      ]
    }));
  };
  formatPrice = inputValue => {
    const format = inputValue.split(".");
    const numberRegex = /[0-9]/gi;
    const formatInput = input => {
      return input.match(numberRegex) ? input.match(numberRegex).join("") : "";
    };
    if (format.length === 1) {
      inputValue = inputValue.match(numberRegex) ? inputValue.match(numberRegex).join("") : "";
    } else if (format.length === 2) {
      let head = format[0];
      let tail = format[1];
      head = formatInput(head);
      tail = formatInput(tail);
      if (tail.length > 2) {
        tail = tail.substring(0, 2);
      }
      inputValue = `${head}.${tail}`;
    } else {
      inputValue = `${formatInput(format[0])}.${format[1]}`;
    }
    return inputValue;
  };
  removeDescript = (index: number) => {
    this.setState(state => ({
      listDescription: state.listDescription.filter((_, currentIndex) => currentIndex !== index)
    }));
  };
  handleDescriptChange = (index, name, value) => {
    let inputValue = value;
    const numberRegex = /[0-9]/gi;
    this.setState(state => ({
      listDescription: state.listDescription.map((currentDescript, currentIndex) => {
        if (currentIndex === index) {
          if (name === "unitPrice") {
            inputValue = this.formatPrice(inputValue);
          } else if (name === "quantity") {
            inputValue = inputValue.match(numberRegex) ? inputValue.match(numberRegex).join("") : "";
          }
          return { ...currentDescript, [name]: inputValue };
        }
        return currentDescript;
      })
    }));
  };
  handleTaxChange = value => {
    const inputValue = this.formatPrice(value);
    this.setState({
      taxes: inputValue
    });
  };
  checkValidForm = (listDescription): boolean => {
    return (
      listDescription.filter(descript => descript.description && descript.quantity && descript.unitPrice).length ===
      listDescription.length
    );
  };
  render() {
    this.props.checkValidForm(this.checkValidForm(this.state.listDescription));
    return (
      <MDBRow className="invoice-description">
        <MDBContainer fluid>
          <DescriptionInput
            listDescription={this.state.listDescription}
            handleDescriptChange={this.handleDescriptChange}
            addNewDescript={this.addNewDescript}
            removeDescript={this.removeDescript}
            checkValid={this.checkValidForm}
            currentClient={this.props.currentClient}
          />
          <DescriptionTotal
            taxes={this.state.taxes}
            listDescription={this.state.listDescription}
            handleTaxChange={this.handleTaxChange}
          />
        </MDBContainer>
      </MDBRow>
    );
  }
}
