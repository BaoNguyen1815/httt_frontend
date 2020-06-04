import ContainerComponent from "containers/components/layout/container";
import { MDBBtn, MDBContainer } from "mdbreact";
import React from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IProps, IState } from "./propState";
import { deleteUserAction, getAllUsersAction } from "./redux/actions";

class UserScreen extends React.Component<IProps> {
  state: IState = {
    modalAddStatus: false,
    modalEditStatus: false
  };

  componentDidMount() {
    this.props.getAllUsersAction();
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

  delete = id => () => {
    this.props.deleteUserAction(id);
    this.props.listUser.data.map((x, index) => {
      if (x.id === x) {
        this.props.listUser.data.splice(index, 1);
      }
    });
  };

  render() {
    const columns = [
      {
        name: "#",
        selector: "id",
        sortable: true,
        width: "70px"
      },
      {
        name: "Username",
        selector: "username",
        sortable: true,
        width: "300px"
      },
      {
        name: "Full Name",
        selector: "fullName",
        sortable: true,
        width: "200px"
      },
      {
        name: "Role",
        selector: "role",
        sortable: true,
        width: "100px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
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
    return (
      <ContainerComponent>
        <MDBContainer>
          <DataTable columns={columns} theme="solarized" data={this.props.listUser.data} pagination={true} />
        </MDBContainer>
      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    listUser: state.screen.user
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getAllUsersAction, deleteUserAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
