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
import { addNewCategoryAction, deleteCategoryAction, editCategoryAction, getAllCategoryAction } from "./redux/actions";

class CategoryScreen extends React.Component<IProps> {
  state: IState = {
    modalAddStatus: false,
    modalEditStatus: false,
    name: "",
    description: "",
    list: this.props.listCategory.data,
    id: null
  };
  componentDidMount() {
    this.props.getAllCategoryAction();
  }

  toggleModalAdd = () => {
    this.clear();
    this.setState({
      modalAddStatus: !this.state.modalAddStatus
    });
  };

  clear = () => {
    this.setState({
      name: "",
      description: ""
    });
  };

  openModalEdit = (id: number, name: string, description: string) => () => {
    this.setState({
      modalEditStatus: true,
      id,
      name,
      description
    });
  };

  closeModalEdit = () => {
    this.clear();
    this.setState({
      modalEditStatus: false
    });
  };

  saveAdd = () => {
    this.props.addNewCategoryAction(this.state.name, this.state.description);
    this.toggleModalAdd();
  };

  saveEdit = () => {
    this.props.editCategoryAction(this.state.id, this.state.name, this.state.description);
    this.closeModalEdit();
  };

  delete = (id: number) => () => {
    this.props.deleteCategoryAction(id);
    console.log(id);
    this.props.listCategory.data.map((x, index) => {
      console.log(index);
      console.log(x);
      if (x.id === x) {
        this.props.listCategory.data.splice(index, 1);
      }
    });
  };

  handleChange = (field: string) => (event: any) => {
    event.persist();
    this.setState(state => ({ ...state, [field]: event.target.value }));
  };

  render() {
    const modalAddCategory = this.state.modalAddStatus ? (
      <MDBModal isOpen={this.state.modalAddStatus} toggle={this.toggleModalAdd}>
        <MDBModalHeader toggle={this.toggleModalAdd}>
          <strong>Add a new category</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="Name" value={this.state.name} onChange={this.handleChange("name")} />
          <MDBInput label="Description" value={this.state.description} onChange={this.handleChange("description")} />
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
      <MDBModal isOpen={this.state.modalEditStatus} toggle={this.closeModalEdit}>
        <MDBModalHeader toggle={this.closeModalEdit}>
          <strong>Edit the category</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="Name" value={this.state.name} onChange={this.handleChange("name")} />
          <MDBInput label="Description" value={this.state.description} onChange={this.handleChange("description")} />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.closeModalEdit}>
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
                <th>Name</th>
                <th>Description</th>
                <th>Options</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.props.listCategory.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <MDBBtn onClick={this.openModalEdit(item.id, item.name, item.description)}>Edit</MDBBtn>
                      <MDBBtn onClick={this.delete(item.id)}>Delete</MDBBtn>
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
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { getAllCategoryAction, addNewCategoryAction, deleteCategoryAction, editCategoryAction },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
