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
import { addNewItemAction, deleteItemAction, editItemAction, getAllItemsAction } from "./redux/actions";

class ItemsScreen extends React.Component<IProps> {
  state: IState = {
    modalAddStatus: false,
    modalEditStatus: false,
    id: null,
    sale: null,
    sellingPrice: null,
    productId: null,
    searchKey: ""
  };

  componentDidMount() {
    this.props.getAllItemsAction();
    this.props.getAllProductsAction;
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

  delete = (id: number) => () => {
    console.log(id);
  };

  handleChange = (field: string) => (event: any) => {
    event.persist();
    this.setState(state => ({ ...state, [field]: event.target.value }));
  };

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

    const columns = [
      {
        name: "#",
        selector: "id",
        sortable: true,
        width: "50px"
      },
      {
        name: "Product Name",
        selector: "product.name",
        sortable: true,
        width: "200px"
      },
      {
        name: "Product Code",
        selector: "product.code",
        sortable: true,
        width: "100px"
      },
      {
        name: "Quantity",
        selector: "quantity",
        sortable: true,
        width: "100px"
      },
      {
        name: "Selling Price",
        selector: "sellingPrice",
        sortable: true,
        width: "100px"
      },
      {
        name: "Sale",
        selector: "sale",
        sortable: true,
        width: "100px"
      },
      {
        name: "Description",
        selector: "description",
        sortable: true,
        width: "100px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
            <MDBBtn onClick={this.toggleModalEdit}>Edit</MDBBtn>
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
    const data = this.props.listItems.data.filter(x => {
      if (x) {
        return x.product.name.toLowerCase().includes(this.state.searchKey.toLowerCase());
      } else {
        return;
      }
    });
    return (
      <ContainerComponent>
        {modalEditItem}
        <MDBContainer>
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
    listItems: state.screen.item
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getAllItemsAction, addNewItemAction, editItemAction, deleteItemAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ItemsScreen);
