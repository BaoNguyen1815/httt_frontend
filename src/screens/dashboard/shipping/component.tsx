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
import { addNewShippingAction, deleteShippingAction, editShippingAction, getAllShippingsAction } from "./redux/actions";

class ShippingScreen extends React.Component<IProps> {
  state: IState = {
    modalAddStatus: false,
    modalEditStatus: false,
    id: null,
    type: "",
    cost: null,
    searchKey: ""
  };

  componentDidMount() {
    this.props.getAllShippingsAction();
  }

  toggleModalAdd = () => {
    this.clear();
    this.setState({
      modalAddStatus: !this.state.modalAddStatus
    });
  };

  openModalEdit = (id: number, type: string, cost: number) => () => {
    this.setState({
      modalEditStatus: true,
      id,
      type,
      cost
    });
  };

  closeModalEdit = () => {
    this.clear();
    this.setState({
      modalEditStatus: false
    });
  };

  clear = () => {
    this.setState({
      type: null,
      cost: null
    });
  };

  saveAdd = () => {
    this.props.addNewShippingAction(this.state.type, this.state.cost);
    this.toggleModalAdd();
  };

  saveEdit = () => {
    this.props.editShippingAction(this.state.id, this.state.type, this.state.cost);
    this.closeModalEdit();
  };

  delete = (id: number) => () => {
    this.props.deleteShippingAction(id);
    this.props.listShipping.data.map((x, index) => {
      if (x.id === x) {
        this.props.listShipping.data.splice(index, 1);
      }
    });
  };

  handleChange = (field: string) => (event: any) => {
    event.persist();
    this.setState(state => ({ ...state, [field]: event.target.value }));
  };
  handleSelectChange = event => {
    this.setState({ ...this.state, sex: event[0] });
  };

  render() {
    const modalAddUser = this.state.modalAddStatus ? (
      <MDBModal isOpen={this.state.modalAddStatus} toggle={this.toggleModalAdd}>
        <MDBModalHeader toggle={this.toggleModalAdd}>
          <strong>Add a new shipping</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="Type" value={this.state.type ? this.state.type : ""} onChange={this.handleChange("type")} />
          <MDBInput label="Cost" value={this.state.cost ? this.state.cost : ""} onChange={this.handleChange("cost")} />
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
      <MDBModal isOpen={this.state.modalEditStatus} toggle={this.closeModalEdit}>
        <MDBModalHeader toggle={this.closeModalEdit}>
          <strong>Edit the shipping</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="Type" value={this.state.type ? this.state.type : ""} onChange={this.handleChange("type")} />
          <MDBInput label="Cost" value={this.state.cost ? this.state.cost : ""} onChange={this.handleChange("cost")} />
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
        selector: "id",
        sortable: true,
        width: "70px"
      },
      {
        name: "Type",
        selector: "type",
        sortable: true,
        width: "300px"
      },
      {
        name: "Cost",
        selector: "cost",
        sortable: true,
        width: "200px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
            <MDBBtn onClick={this.openModalEdit(row.id, row.type, row.cost)}>Edit</MDBBtn>
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
    const data = this.props.listShipping.data.filter(x => {
      return x.type.toLowerCase().includes(this.state.searchKey.toLowerCase());
    });
    return (
      <ContainerComponent>
        {modalAddUser}
        {modalEditUser}
        <MDBContainer>
          <MDBBtn onClick={this.toggleModalAdd}>Add a new shipping</MDBBtn>
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
    listShipping: state.screen.shipping
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { getAllShippingsAction, addNewShippingAction, editShippingAction, deleteShippingAction },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShippingScreen);
