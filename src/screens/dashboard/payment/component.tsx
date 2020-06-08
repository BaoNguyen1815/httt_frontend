import ContainerComponent from "containers/components/layout/container";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBSelect
} from "mdbreact";
import React from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IProps, IState } from "./propState";
import { addNewPaymentAction, deletePaymentAction, editPaymentAction, getAllPaymentsAction } from "./redux/actions";

class PaymentScreen extends React.Component<IProps> {
  state: IState = {
    modalAddStatus: false,
    modalEditStatus: false,
    name: null,
    phone: null,
    age: null,
    sex: "Male",
    username: null,
    password: null,
    id: null,
    options: [
      {
        checked: true,
        text: "Male",
        value: "Male"
      },
      {
        text: "Female",
        value: "Female"
      },
      {
        text: "Other",
        value: "Other"
      }
    ],
    searchKey: ""
  };

  componentDidMount() {
    this.props.getAllPaymentsAction();
  }

  toggleModalAdd = () => {
    this.clear();
    this.setState({
      modalAddStatus: !this.state.modalAddStatus
    });
  };

  openModalEdit = (
    id: number,
    name: string,
    phone: string,
    age: number,
    sex: string,
    username: string,
    password: string
  ) => () => {
    this.setState({
      modalEditStatus: true,
      id,
      name,
      phone,
      age,
      sex,
      username,
      password
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
      name: null,
      phone: null,
      age: null,
      sex: "Male",
      username: null,
      password: null
    });
  };

  saveAdd = () => {
    this.props.addNewPaymentAction(
      this.state.name,
      this.state.phone,
      this.state.age,
      this.state.sex,
      this.state.username,
      this.state.password
    );
    this.toggleModalAdd();
  };

  saveEdit = () => {
    this.props.editPaymentAction(
      this.state.id,
      this.state.name,
      this.state.phone,
      this.state.age,
      this.state.sex,
      this.state.username,
      this.state.password
    );
    this.closeModalEdit();
  };

  delete = (id: number) => () => {
    this.props.deletePaymentAction(id);
    this.props.listCustomer.data.map((x, index) => {
      if (x.id === x) {
        this.props.listCustomer.data.splice(index, 1);
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
          <strong>Add a new customer</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="Name" value={this.state.name ? this.state.name : ""} onChange={this.handleChange("name")} />
          <MDBInput
            label="Phone"
            value={this.state.phone ? this.state.phone : ""}
            onChange={this.handleChange("phone")}
          />
          <MDBInput label="Age" value={this.state.age ? this.state.age : ""} onChange={this.handleChange("age")} />
          <MDBSelect
            options={this.state.options}
            selected="Choose Sex"
            label="Sex"
            getValue={this.handleSelectChange}
          />
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
          <strong>Edit the user</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="Name" value={this.state.name ? this.state.name : ""} onChange={this.handleChange("name")} />
          <MDBInput
            label="Phone"
            value={this.state.phone ? this.state.phone : ""}
            onChange={this.handleChange("phone")}
          />
          <MDBInput label="Age" value={this.state.age ? this.state.age : ""} onChange={this.handleChange("age")} />
          <MDBSelect
            options={this.state.options}
            selected="Choose Sex"
            label="Sex"
            getValue={this.handleSelectChange}
          />
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
        name: "Name",
        selector: "name",
        sortable: true,
        width: "300px"
      },
      {
        name: "Phone",
        selector: "phone",
        sortable: true,
        width: "200px"
      },
      {
        name: "Age",
        selector: "age",
        sortable: true,
        width: "100px"
      },
      {
        name: "Sex",
        selector: "sex",
        sortable: true,
        width: "100px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
            <MDBBtn
              onClick={this.openModalEdit(row.id, row.name, row.phone, row.age, row.sex, row.username, row.password)}
            >
              Edit
            </MDBBtn>
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
    const data = this.props.listCustomer.data.filter(x => {
      return x.name.toLowerCase().includes(this.state.searchKey.toLowerCase());
    });
    return (
      <ContainerComponent>
        {modalAddUser}
        {modalEditUser}
        <MDBContainer>
          <MDBBtn onClick={this.toggleModalAdd}>Add a new customer</MDBBtn>
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
    listCustomer: state.screen.customer
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getAllPaymentsAction, addNewPaymentAction, editPaymentAction, deletePaymentAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
