import ContainerComponent from "containers/components/layout/container";
import {
  MDBBtn,
  MDBContainer,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IProps, IState } from "./propState";
import { getAllCustomersAction } from "./redux/actions";

class CustomerScreen extends React.Component<IProps> {
  state: IState = {
    modalAddStatus: false,
    modalEditStatus: false
  };

  componentDidMount() {
    // this.props.getAllCustomersAction();
  }

  toggleModalAdd = () => {
    this.setState({
      modalAddStatus: !this.state.modalAddStatus
    });
  };

  toggleModalEdit = () => {
    this.setState({
      modalEditStatus: !this.state.modalEditStatus
    });
  };

  saveAdd = () => {};

  saveEdit = () => {};

  delete = () => {};

  render() {
    const modalAddUser = this.state.modalAddStatus ? (
      <MDBModal isOpen={this.state.modalAddStatus} toggle={this.toggleModalAdd}>
        <MDBModalHeader toggle={this.toggleModalAdd}>
          <strong>Add a new customer</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="Sell Price" />
          <MDBInput label="Sale" />
          <MDBInput label="Description" />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggleModalAdd}>
            Close
          </MDBBtn>
          <MDBBtn color="primary" onClick={this.saveAdd}>
            Save
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    ) : null;

    const modalEditUser = this.state.modalEditStatus ? (
      <MDBModal isOpen={this.state.modalEditStatus} toggle={this.toggleModalEdit}>
        <MDBModalHeader toggle={this.toggleModalEdit}>
          <strong>Edit the user</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="Sell Price" />
          <MDBInput label="Sale" />
          <MDBInput label="Description" />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggleModalEdit}>
            Close
          </MDBBtn>
          <MDBBtn color="primary" onClick={this.saveEdit}>
            Save
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    ) : null;
    return (
      <ContainerComponent>
        {modalAddUser}
        {modalEditUser}
        <MDBContainer>
          <MDBBtn onClick={this.toggleModalAdd}>Add a new customer</MDBBtn>
          <MDBTable>
            <MDBTableHead color="primary-color" textWhite>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Options</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.props.listCustomer.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.age}</td>
                    <td>{item.sex}</td>
                    <td>
                      <MDBBtn onClick={this.toggleModalEdit}>Edit</MDBBtn>
                      <MDBBtn onClick={this.delete}>Delete</MDBBtn>
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </MDBContainer>
      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    listCustomer: state.screen.customer
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ getAllCustomersAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerScreen);
