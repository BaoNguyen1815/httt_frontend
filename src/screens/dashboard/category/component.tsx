import ContainerComponent from "containers/components/layout/container";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader
} from "mdbreact";
import React from "react";
import DataTable from "react-data-table-component";
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
    id: null,
    searchKey: ""
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
    this.props.listCategory.data.map((x, index) => {
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

    const columns = [
      {
        name: "#",
        selector: "index",
        sortable: true,
        width: "50px"
      },
      {
        name: "Name",
        selector: "name",
        sortable: true,
        width: "300px"
      },
      {
        name: "Description",
        selector: "description",
        sortable: true,
        width: "200px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
            <MDBBtn onClick={this.openModalEdit(row.id, row.name, row.description)}>Edit</MDBBtn>
            <MDBBtn onClick={this.delete(row.id)}>Delete</MDBBtn>
          </div>
        ),
        right: true,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "200px"
      }
    ];
    const data = this.props.listCategory.data.filter(x => {
      return x.name.toLowerCase().includes(this.state.searchKey.toLowerCase());
    });
    return (
      <ContainerComponent>
        {modalAddCategory}
        {modalEditCategory}
        <MDBContainer>
          <MDBBtn onClick={this.toggleModalAdd}>Add a new cateogry</MDBBtn>
          <MDBCol md="6">
            <MDBInput hint="Search" type="text" containerClass="mt-0" onChange={this.handleChange("searchKey")} />
          </MDBCol>
          <DataTable columns={columns} theme="solarized" data={data} pagination={true} />
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
