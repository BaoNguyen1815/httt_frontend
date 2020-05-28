import ContainerComponent from "containers/components/layout/container";
import { MDBBtn, MDBContainer, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IProps } from "./propState";
import { getAllOrderAction } from "./redux/actions";

class OrderScreen extends React.Component<IProps> {
  componentDidMount() {
    // this.props.getAllOrderAction();
  }

  render() {
    return (
      <ContainerComponent>
        <MDBContainer>
          <MDBBtn>Add a new order</MDBBtn>
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
              {this.props.listOrder.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.type}</td>
                    <td>{item.description}</td>
                    <td>
                      <MDBBtn>Edit</MDBBtn>
                      <MDBBtn>Delete</MDBBtn>
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
    listOrder: state.screen.order
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ getAllOrderAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
