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
import { getAllCategoryAction } from "./redux/actions";

class CategoryScreen extends React.Component<IProps> {
  state: IState = {
    modalAddStatus: false,
    modalEditStatus: false
  };
  componentDidMount() {
    // this.props.getAllCategoryAction();
    console.log("gix");
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
    const modalAddCategory = this.state.modalAddStatus ? (
      <MDBModal isOpen={this.state.modalAddStatus} toggle={this.toggleModalAdd}>
        <MDBModalHeader toggle={this.toggleModalAdd}>
          <strong>Add a new category</strong>
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

    const modalEditCategory = this.state.modalEditStatus ? (
      <MDBModal isOpen={this.state.modalEditStatus} toggle={this.toggleModalEdit}>
        <MDBModalHeader toggle={this.toggleModalEdit}>
          <strong>Edit the category</strong>
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
        {modalAddCategory}
        {modalEditCategory}
        <MDBContainer>
          <MDBBtn onClick={this.toggleModalAdd}>Add a new cateogry</MDBBtn>
          <MDBTable>
            <MDBTableHead color="primary-color" textWhite>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Description</th>
                <th>Options</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.props.listCategory.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.type}</td>
                    <td>{item.description}</td>
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
    listCategory: state.screen.category
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ getAllCategoryAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
