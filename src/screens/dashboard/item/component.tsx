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
import { getAllItemsAction } from "./redux/actions";

class ItemsScreen extends React.Component<IProps> {
  state: IState = {
    modalAddStatus: false,
    modalEditStatus: false
  };

  componentDidMount() {
    // this.props.getAllItemsAction();
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
    // const modalAddItem = this.state.modalEditStatus ? (
    //   <MDBModal isOpen={this.state.modalEditStatus} toggle={this.toggleModalEdit}>
    //     <MDBModalHeader toggle={this.toggleModalEdit}>
    //       <strong>Add a new item</strong>
    //     </MDBModalHeader>
    //     <MDBModalBody>
    //       <MDBInput label="Sell Price" />
    //       <MDBInput label="Sale" />
    //       <MDBInput label="Description" />
    //     </MDBModalBody>
    //     <MDBModalFooter>
    //       <MDBBtn color="secondary" onClick={this.toggleModalEdit}>
    //         Close
    //       </MDBBtn>
    //       <MDBBtn color="primary" onClick={this.saveAdd}>
    //         Save
    //       </MDBBtn>
    //     </MDBModalFooter>
    //   </MDBModal>
    // ) : null;

    const modalEditItem = this.state.modalEditStatus ? (
      <MDBModal isOpen={this.state.modalEditStatus} toggle={this.toggleModalEdit}>
        <MDBModalHeader toggle={this.toggleModalEdit}>
          <strong>Edit the item</strong>
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
        {/* {modalAddItem} */}
        {modalEditItem}
        <MDBContainer>
          {/* <MDBBtn>Add a new item</MDBBtn> */}
          <MDBTable>
            <MDBTableHead color="primary-color" textWhite>
              <tr>
                <th>#</th>
                <th>ProductId</th>
                <th>Sale</th>
                <th>Selling Price</th>
                <th>Options</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.props.listItems.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.productId}</td>
                    <td>{item.sale}</td>
                    <td>{item.sellingPrice}</td>
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
    listItems: state.screen.item
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ getAllItemsAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ItemsScreen);
