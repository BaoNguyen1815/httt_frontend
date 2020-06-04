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
import { getAllCategoryAction } from "../category/redux/actions";
import { addNewItemAction } from "../item/redux/actions";
import { IProps, IState } from "./propState";
import { addNewProductAction, deleteProductAction, editProductAction, getAllProductsAction } from "./redux/actions";

class ProductScreen extends React.Component<IProps> {
  state: IState = {
    modalAddStatus: false,
    modalEditStatus: false,
    modalSellStatus: false,
    name: null,
    code: null,
    description: null,
    quantity: null,
    price: null,
    author: null,
    publisher: null,
    categoryId: null,
    options: [],
    sale: null,
    sellingPrice: null,
    productId: null,
    searchKey: ""
  };

  componentDidMount() {
    this.props.getAllProductsAction();
    this.props.getAllCategoryAction();
  }

  toggleModalAdd = () => {
    console.log(this.props.listCategory, "Danh");
    this.setState({
      modalAddStatus: !this.state.modalAddStatus
    });
  };

  openModalEdit = (
    id: number,
    name: string,
    code: string,
    description: string,
    quantity: number,
    price: number,
    author: string,
    publisher: string,
    categoryId: number
  ) => () => {
    this.setState({
      modalEditStatus: true,
      id,
      name,
      code,
      description,
      quantity,
      price,
      author,
      publisher,
      categoryId
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
      code: null,
      description: null,
      quantity: null,
      price: null,
      author: null,
      publisher: null,
      categoryId: null
    });
  };

  openModalSell = (productId: number, name: string, code: string) => () => {
    this.setState({
      modalSellStatus: true,
      productId,
      name,
      code
    });
  };

  closeModalSell = () => {
    this.setState({
      modalSellStatus: false,
      sale: null,
      sellingPrice: null,
      productId: null
    });
  };

  delete = (id: number) => () => {
    this.props.deleteProductAction(id);
    this.props.listProducts.data.map((x, index) => {
      if (x.id === x) {
        this.props.listProducts.data.splice(index, 1);
      }
    });
  };

  saveAdd = () => {
    this.props.addNewProductAction(
      this.state.name,
      this.state.code,
      this.state.description,
      this.state.quantity,
      this.state.price,
      this.state.author,
      this.state.publisher,
      this.state.categoryId
    );
    this.toggleModalAdd();
  };

  saveEdit = () => {};

  saveSell = () => {
    this.props.addNewItemAction(this.state.sale, this.state.sellingPrice, this.state.productId);
    // this.delete(this.state.productId);
    this.closeModalSell();
  };

  handleChange = (field: string) => (event: any) => {
    event.persist();
    this.setState(state => ({ ...state, [field]: event.target.value }));
  };
  handleSelectChange = event => {
    this.setState({ ...this.state, categoryId: event[0] });
  };

  render() {
    this.props.listCategory.data.map(x => {
      let new_item = {
        text: x.name,
        value: x.id
      };
      this.state.options.push(new_item);
    });

    const modalAddProduct = this.state.modalAddStatus ? (
      <MDBModal isOpen={this.state.modalAddStatus} toggle={this.toggleModalAdd}>
        <MDBModalHeader toggle={this.toggleModalAdd}>
          <strong>Add a new product</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="Name" value={this.state.name ? this.state.name : ""} onChange={this.handleChange("name")} />
          <MDBInput label="Code" value={this.state.code ? this.state.code : ""} onChange={this.handleChange("code")} />
          <MDBInput
            label="Description"
            value={this.state.description ? this.state.description : ""}
            onChange={this.handleChange("description")}
          />
          <MDBInput
            label="Quantity"
            value={this.state.quantity ? this.state.quantity : ""}
            onChange={this.handleChange("quantity")}
          />
          <MDBInput
            label="Price"
            value={this.state.price ? this.state.price : ""}
            onChange={this.handleChange("price")}
          />
          <MDBInput
            label="Author"
            value={this.state.author ? this.state.author : ""}
            onChange={this.handleChange("author")}
          />
          <MDBInput
            label="Publisher"
            value={this.state.publisher ? this.state.publisher : ""}
            onChange={this.handleChange("publisher")}
          />
          <MDBSelect
            options={this.state.options}
            selected="Choose category"
            label="Category"
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

    const modalEditProduct = this.state.modalEditStatus ? (
      <MDBModal isOpen={this.state.modalEditStatus} toggle={this.closeModalEdit}>
        <MDBModalHeader toggle={this.closeModalEdit}>
          <strong>Edit the product</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="Name" value="Abc" />
          <MDBInput label="Code" value="#123" />
          <MDBInput label="Description" value="Des" />
          <MDBInput label="Price" value="123000" />
          <MDBInput label="Author" value="Harry" />
          <MDBInput label="Publisher" value="NXB" />
          <MDBSelect options={this.state.options} selected="Choose category" label="Category" />
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

    const modalSellProduct = this.state.modalSellStatus ? (
      <MDBModal isOpen={this.state.modalSellStatus} toggle={this.closeModalSell}>
        <MDBModalHeader toggle={this.closeModalSell}>
          <strong>Sell the product</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="Product Name" value={this.state.name} disabled />
          <MDBInput label="Product Code" value={this.state.code} disabled />
          <MDBInput
            label="Sell Price"
            value={this.state.sellingPrice ? this.state.sellingPrice : ""}
            onChange={this.handleChange("sellingPrice")}
          />
          <MDBInput label="Sale" value={this.state.sale ? this.state.sale : ""} onChange={this.handleChange("sale")} />
          <MDBInput
            label="Description"
            value={this.state.description ? this.state.description : ""}
            onChange={this.handleChange("description")}
          />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.closeModalSell}>
            Close
          </MDBBtn>
          <MDBBtn color="primary" onClick={this.saveSell}>
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
        name: "Name",
        selector: "name",
        sortable: true,
        width: "200px"
      },
      {
        name: "Code",
        selector: "code",
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
        name: "Quantity",
        selector: "quantity",
        sortable: true,
        width: "100px"
      },
      {
        name: "Price",
        selector: "price",
        sortable: true,
        width: "100px"
      },
      {
        name: "Author",
        selector: "author",
        sortable: true,
        width: "150px"
      },
      {
        name: "Publisher",
        selector: "publisher",
        sortable: true,
        width: "150px"
      },
      {
        name: "Category",
        // selector: "category",
        sortable: true,
        width: "100px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
            <MDBBtn
              onClick={this.openModalEdit(
                row.id,
                row.name,
                row.code,
                row.description,
                row.quantity,
                row.price,
                row.author,
                row.publisher,
                row.categoryId
              )}
            >
              Edit
            </MDBBtn>
            <MDBBtn onClick={this.delete(row.id)}>Delete</MDBBtn>
            <MDBBtn onClick={this.openModalSell(row.id, row.name, row.code)}>Sell</MDBBtn>
          </div>
        ),
        right: true,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "200px"
      }
    ];
    const data = this.props.listProducts.data.filter(x => {
      return x.name.toLowerCase().includes(this.state.searchKey.toLowerCase());
    });
    return (
      <ContainerComponent>
        {modalAddProduct}
        {modalEditProduct}
        {modalSellProduct}
        <MDBContainer>
          <MDBBtn onClick={this.toggleModalAdd}>Add a new product</MDBBtn>
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
    listProducts: state.screen.product,
    listCategory: state.screen.category
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAllProductsAction,
      getAllCategoryAction,
      editProductAction,
      addNewProductAction,
      deleteProductAction,
      addNewItemAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);
