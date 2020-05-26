import ContainerComponent from "containers/components/layout/container";
import {
  MDBBtn,
  MDBContainer,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBSelect,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IProps, IState } from "./propState";
import { getAllProductsAction } from "./redux/actions";

class ProductScreen extends React.Component<IProps> {
  state: IState = {
    modalAddStatus: false,
    modalEditStatus: false,
    modalSellStatus: false,
    options: [
      {
        text: "Option 1",
        value: "1"
      },
      {
        checked: true,
        text: "Option 2",
        value: "2"
      },
      {
        text: "Option 3",
        value: "3"
      }
    ]
  };

  componentDidMount() {
    // this.props.getAllProductsAction();
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

  toggleModalSell = () => {
    this.setState({
      modalSellStatus: !this.state.modalSellStatus
    });
  };

  delete = () => {};

  saveAdd = () => {};

  saveEdit = () => {};

  saveSell = () => {};

  render() {
    console.log(this.state.modalAddStatus, "state");
    const modalAddProduct = this.state.modalAddStatus ? (
      <MDBModal isOpen={this.state.modalAddStatus} toggle={this.toggleModalAdd}>
        <MDBModalHeader toggle={this.toggleModalAdd}>
          <strong>Add a new product</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="Name" />
          <MDBInput label="Code" />
          <MDBInput label="Description" />
          <MDBInput label="Price" />
          <MDBInput label="Author" />
          <MDBInput label="Publisher" />
          <MDBSelect options={this.state.options} selected="Choose category" label="Category" />
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
      <MDBModal isOpen={this.state.modalEditStatus} toggle={this.toggleModalEdit}>
        <MDBModalHeader toggle={this.toggleModalEdit}>
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
          <MDBBtn color="secondary" onClick={this.toggleModalEdit}>
            Close
          </MDBBtn>
          <MDBBtn color="primary" onClick={this.saveEdit}>
            Save
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    ) : null;

    const modalSellProduct = this.state.modalSellStatus ? (
      <MDBModal isOpen={this.state.modalSellStatus} toggle={this.toggleModalSell}>
        <MDBModalHeader toggle={this.toggleModalSell}>
          <strong>Sell the product</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="Product Name" value="Abc" disabled />
          <MDBInput label="Product Code" value="#123" disabled />
          <MDBInput label="Sell Price" />
          <MDBInput label="Sale" />
          <MDBInput label="Description" />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggleModalSell}>
            Close
          </MDBBtn>
          <MDBBtn color="primary" onClick={this.saveSell}>
            Save
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    ) : null;

    const data = [
      {
        id: 1,
        name: "Danh",
        code: "abc",
        description: "abc"
      }
    ];

    return (
      <ContainerComponent>
        {modalAddProduct}
        {modalEditProduct}
        {modalSellProduct}
        <MDBContainer>
          <MDBBtn onClick={this.toggleModalAdd}>Add a new product</MDBBtn>
          <MDBTable>
            <MDBTableHead color="primary-color" textWhite>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Code</th>
                <th>Description</th>
                <th>Price</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Category</th>
                <th>Options</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.code}</td>
                    <td>{item.description}</td>
                    {/* <td>{item.price}</td>
                    <td>{item.author}</td>
                    <td>{item.publisher}</td>
                    <td>{item.categoryId}</td> */}
                    <td>
                      <MDBBtn onClick={this.toggleModalEdit}>Edit</MDBBtn>
                      <MDBBtn onClick={this.delete}>Delete</MDBBtn>
                      <MDBBtn onClick={this.toggleModalSell}>Sell</MDBBtn>
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
    listProducts: state.screen.product
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ getAllProductsAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);
