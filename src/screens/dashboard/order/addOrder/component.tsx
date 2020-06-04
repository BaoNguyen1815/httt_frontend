import ContainerComponent from "containers/components/layout/container";
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow, MDBTable } from "mdbreact";
import React from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getAllCustomersAction } from "../../customer/redux/actions";
import { getAllItemsAction } from "../../item/redux/actions";
import { setListItemsCartAction } from "../redux/actions";
import { IProps, IState } from "./propState";

class AddOrderScreen extends React.Component<IProps> {
  state: IState = {
    modalAddStatus: false,
    modalEditStatus: false,
    searchKey: "",
    itemOrder: [],
    totalCost: 0
  };

  static getDerivedStateFromProps(state, props) {
    if (props.listCart !== state.itemOrder) {
      return {
        itemOrder: props.listCart
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.getAllItemsAction();
    this.props.getAllCustomersAction();
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

  delete = item => () => {
    this.props.listCart.dataCart.map((x, index) => {
      if (x.id === item.id) {
        this.props.listCart.dataCart.splice(index, 1);
        this.setState({
          totalCost: this.state.totalCost - (item.sellingPrice - (item.sellingPrice * item.sale) / 100)
        });
        this.props.setListItemsCartAction(this.props.listCart.dataCart);
      }
    });
  };

  addItem = item => () => {
    let new_item = {
      id: item.id,
      product: item.product,
      productId: item.productId,
      sale: item.sale,
      sellingPrice: item.sellingPrice,
      status: item.status,
      quantity: 1
    };
    // if (this.state.itemOrder.dataCart && this.state.itemOrder.dataCart.length > 0) {
    //   this.state.itemOrder.dataCart.map(x => {
    //     if (x.id === new_item.id) {
    //       x.quantity = x.quantity + 1;
    //       this.props.setListItemsCartAction(this.state.itemOrder.dataCart);
    //     } else {
    //       this.state.itemOrder.dataCart.push(new_item);
    //       this.props.setListItemsCartAction(this.state.itemOrder.dataCart);
    //     }
    //   });
    // } else {
    this.props.listCart.dataCart.push(new_item);
    this.setState({
      totalCost: this.state.totalCost + new_item.sellingPrice - (new_item.sellingPrice * new_item.sale) / 100
    });
    this.props.setListItemsCartAction(this.props.listCart.dataCart);
    // }
  };

  // confirmOrder = (
  //   createdDate: Date,
  //   code: string,
  //   paymentStatus: string,
  //   totalCost: number,
  //   paymentId: number,
  //   shippingId: number,
  //   accountId: number,
  //   addressId: number
  // ) => {};

  handleChange = (field: string) => (event: any) => {
    event.persist();
    this.setState(state => ({ ...state, [field]: event.target.value }));
  };

  render() {
    const columns = [
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
        name: "Quantity",
        selector: "product.quantity",
        sortable: true,
        width: "100px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
            <MDBBtn onClick={this.addItem(row)}>Add</MDBBtn>
          </div>
        ),
        right: true,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "200px"
      }
    ];

    const columnItem = [
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
        name: "Quantity",
        selector: "quantity",
        sortable: true,
        width: "100px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
            <MDBBtn onClick={this.delete(row)}>Delete</MDBBtn>
          </div>
        ),
        right: true,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "200px"
      }
    ];

    // const columnCustomer = [
    //   {
    //     name: "Name",
    //     selector: "name",
    //     sortable: true,
    //     width: "200px"
    //   },
    //   {
    //     name: "Product Code",
    //     selector: "product.code",
    //     sortable: true,
    //     width: "100px"
    //   },
    //   {
    //     name: "Selling Price",
    //     selector: "sellingPrice",
    //     sortable: true,
    //     width: "100px"
    //   },
    //   {
    //     name: "Sale",
    //     selector: "sale",
    //     sortable: true,
    //     width: "100px"
    //   },
    //   {
    //     name: "Quantity",
    //     selector: "quantity",
    //     sortable: true,
    //     width: "100px"
    //   },
    //   {
    //     name: "Options",
    //     cell: row => (
    //       <div>
    //         <MDBBtn onClick={this.delete(row)}>Delete</MDBBtn>
    //       </div>
    //     ),
    //     right: true,
    //     ignoreRowClick: true,
    //     allowOverflow: true,
    //     button: true,
    //     width: "200px"
    //   }
    // ];

    const data = this.props.listItems.data.filter(x => {
      return x.product.name.toLowerCase().includes(this.state.searchKey.toLowerCase());
    });
    return (
      <ContainerComponent>
        <MDBContainer>
          <MDBRow>
            <MDBRow>
              <MDBCol md="9">
                <DataTable
                  title="Items in cart"
                  columns={columnItem}
                  theme="solarized"
                  data={this.props.listCart.dataCart}
                  pagination={true}
                />
              </MDBCol>
              <MDBCol md="9">
                <MDBInput hint="Search" type="text" containerClass="mt-0" onChange={this.handleChange("searchKey")} />
                <DataTable title="Items" columns={columns} theme="solarized" data={data} pagination={true} />
              </MDBCol>
              <MDBCol md="3">
                <MDBRow>
                  <MDBCol>Khách hàng</MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <MDBTable>
                        <tr>
                          <td>Tổng tiền</td>
                          <td>{this.state.totalCost}</td>
                        </tr>
                      </MDBTable>
                      <MDBBtn primary>Thanh toán</MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBRow>
        </MDBContainer>
      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    listItems: state.screen.item,
    listCustomers: state.screen.customer,
    listCart: state.screen.order
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getAllItemsAction, getAllCustomersAction, setListItemsCartAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddOrderScreen);
