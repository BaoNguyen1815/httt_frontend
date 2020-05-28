import ContainerComponent from "containers/components/layout/container";
import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { IProps, IState } from "./propState";

class AddOrderScreen extends React.Component<IProps> {
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
    return (
      <ContainerComponent>
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
              {/* {this.props.listItems.data.map((item, index) => {
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
              })} */}
            </MDBTableBody>
          </MDBTable>
        </MDBContainer>
      </ContainerComponent>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     listItems: state.screen.item
//   };
// };
// const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({  }, dispatch);

export default connect(null, null)(AddOrderScreen);
