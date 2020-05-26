import ContainerComponent from "containers/components/layout/container";
import { MDBBtn, MDBContainer, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IProps } from "./propState";
import { getAllItemsAction } from "./redux/actions";

class ItemsScreen extends React.Component<IProps> {
  componentDidMount() {
    this.props.getAllItemsAction();
  }

  render() {
    return (
      <ContainerComponent>
        <MDBContainer>
          <MDBBtn>Add a new item</MDBBtn>
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
              {this.props.listItems.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.productId}</td>
                    <td>{item.sale}</td>
                    <td>{item.sellingPrice}</td>
                    <td>
                      <MDBBtn>Edit</MDBBtn>
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
    listItems: state.screen.item
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ getAllItemsAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ItemsScreen);
