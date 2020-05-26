// import SuccessComponent from "containers/components/alerts";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import ContainerComponent from "containers/components/layout/container";
import { MDBCard, MDBCardBody, MDBToastContainer, MDBBtn, MDBIcon } from "mdbreact";
import ModalConfirm from "containers/components/modal/confirm-modal";
import DataTable from "react-data-table-component";
import { IState, IProps } from "./propState";
import { CLIENT_COLUMNS_TABLE, EMPLOYERS_COLUMNS_TABLE } from "containers/contants/table-data";
import EditUserComponent from "./add-client-employer/component";
import {
  individualGetEmployersAction,
  individualGetClientsAction,
  individualRemoveClientAction,
  individualRemoveEmployerAction,
  individualEditClientAction,
  individualEditEmployerAction,
  individualGetBpiContractsAction
} from "./ducks/actions";
import { ROLES } from "containers/contants";
class IndividualEmployeeComponent extends React.Component<IProps, IState> {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.employers !== prevState.listEmployee) {
      const employers = nextProps.employers;
      return {
        listEmployee: employers
      };
    }
    if (nextProps.clients !== prevState.listClient) {
      const clients = nextProps.clients;
      return {
        listClient: clients
      };
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isEditUser: false,
      isRemove: false,
      listClient: [],
      listEmployee: [],
      isEmployer: false,
      role: "",
      defineClientsTable: CLIENT_COLUMNS_TABLE,
      defineEmployersTable: EMPLOYERS_COLUMNS_TABLE
    };
  }

  async componentDidMount() {
    this.setState({ ... this.state, role: localStorage.getItem("role") });
    await this.getDataEmployee();
    debugger;
    if (sessionStorage.getItem("invoiceWorkflow") !== "null") {
      this.addNewUser(false)
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.employers !== prevProps.employers) {
      const employers = this.props.employers;
      this.setState({
        ...this.state,
        listEmployee: employers
      });
    }
  }

  componentWillUnmount() {
    sessionStorage.setItem("invoiceWorkflow", null);
  }

  getDataEmployee = () => {
    this.props.individualGetBpiContractsAction(this.props.userInfo.user_id);
  };

  // add edit user
  addNewUser = async isEmployee => {
    await this.setState({ ...this.state, isEmployer: isEmployee ? true : false, isEditUser: true, currentUser: null });
  };
  // \\

  // functions
  changeHandler = async (event: any) => {
    event.persist();
    await this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  hideModal = () => {
    this.setState({ isRemove: false, isEditUser: false });
  };

  removeBpiContractById = async () => {
    if (this.state.currentUser.employer_id) {
      this.props.individualRemoveEmployerAction(this.props.userInfo.user_id, this.state.currentUser.employer_id, this.hideModal);
    } else {
      this.props.individualRemoveClientAction(this.props.userInfo.user_id, this.state.currentUser.client_id, this.hideModal);
    }
  };

  handleButtonClientClick = async (data, isRemove) => {
    if (!isRemove) {
      await this.setState({ isEditUser: true, currentUser: data, isEmployer: false });
    } else {
      await this.setState({ isRemove: true, currentUser: data, isEmployer: false });
    }
  };

  handleButtonEmployerClick = async (data, isRemove) => {
    debugger;
    if (!isRemove) {
      await this.setState({ isEditUser: true, currentUser: data, isEmployer: true });
    } else {
      await this.setState({ isRemove: true, currentUser: data, isEmployer: true });
    }
  };

  employeeWithout = async (data, isRemove) => {
    if (!isRemove) {
      // edit User
    } else {
      // open remove employee popup
      this.props.offSuccessAction("", false);
      await this.setState({ isRemove: true, currentUser: data, });
    }
  };

  // handle Add Client Modal

  handleNextPrevClick = a => param => e => {
    console.log(e);
    this.setState({
      ["formActivePanel" + a]: param,
      ["formActivePanel" + a + "Changed"]: true
    });
  };

  handleSubmission = () => {
    alert("Form submitted!");
  };

  calculateAutofocus = a => {
    if (this.state["formActivePanel" + a + "Changed"]) {
      return true;
    }
  };
  // \\

  public render() {
    const {
      defineClientsTable,
      defineEmployersTable,
      isRemove,
      listClient,
      listEmployee,
      isEditUser,
      currentUser,
      isEmployer
    } = this.state;

    const mainStyle = {
      margin: "0 6%",
      paddingTop: "5.5rem"
    };

    const confirmModal = isRemove ? (
      <ModalConfirm
        show={isRemove}
        modalContent={`Do you want to remove `}
        content1={`${isEmployer ? "Employer: " : "Client: "} ${
          this.state.currentUser !== null ? this.state.currentUser.name : ""
          }`}
        content2={`Role: ${this.state.currentUser.job_role !== null ? this.state.currentUser.job_role : ""} ?`}
        modalClosed={this.hideModal}
        modalSubmit={this.removeBpiContractById}
        disabled={this.props.isLoading}
        isSuccess={this.props.isSuccess}
      />
    ) : null;
    const addClientModal = isEditUser ? (
      <EditUserComponent
        show={isEditUser}
        userData={currentUser}
        isEmployer={isEmployer}
        formActivePanel1={currentUser !== null ? 2 : this.state.formActivePanel1}
        formActivePanel1Changed={this.state.formActivePanel1Changed}
        // swapFormActive={this.swapFormActive}
        handleNextPrevClick={this.handleNextPrevClick}
        // handleSubmission={this.handleSubmission}
        calculateAutofocus={this.calculateAutofocus}
        modalClosed={this.hideModal}
      />
    ) : null;
    const isHideClients = this.state.role === ROLES.EMPLOYEE && listClient.length === 0;
    const isHideEmployers = this.state.role === ROLES.CONTRACTOR && listEmployee.length === 0;
    return (
      <ContainerComponent>
        {confirmModal}
        {addClientModal}
        <MDBToastContainer className="toast-content" hideProgressBar={true} newestOnTop={true} autoClose={3000} />
        <main style={mainStyle} className="employee">
          <MDBCard>
            <MDBCardBody>
              <div hidden={isHideClients}>
                <h5>
                  Clients
                <MDBBtn
                    tag="a"
                    size="sm"
                    color="primary"
                    floating
                    className="mr-0"
                    onClick={() => this.addNewUser(false)}
                  >
                    <MDBIcon icon="user-plus" />
                  </MDBBtn>
                </h5>
                <hr />
                <DataTable
                  data={listClient}
                  noHeader={true}
                  columns={defineClientsTable(this.handleButtonClientClick)}
                  pagination={true}
                />
              </div>
              <div hidden={isHideEmployers}>
                <h5>
                  Employers{" "}
                  <MDBBtn
                    tag="a"
                    size="sm"
                    floating
                    color="primary"
                    className="mt-0 mb-0"
                    onClick={() => this.addNewUser(true)}
                  >
                    <MDBIcon icon="user-plus" />
                  </MDBBtn>
                  {/* <MDBBadge color="info">{listEmployee && listEmployee.length ? listEmployee.length : null}</MDBBadge> */}
                </h5>
                <hr />
                <DataTable
                  data={listEmployee}
                  noHeader={true}
                  columns={defineEmployersTable(this.handleButtonEmployerClick)}
                  pagination={true}
                />
              </div>

            </MDBCardBody>
          </MDBCard>
        </main>
      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    errorMess: state.common.errMess,
    isLoading: state.common.isLoading,
    userInfo: state.user.userInfo,
    isSuccess: state.common.isSuccess,
    successMessage: state.common.successMessage,
    employers: state.screen.individualUser.listBpiContracts.employers,
    clients: state.screen.individualUser.listBpiContracts.clients
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      individualGetEmployersAction,
      individualGetClientsAction,
      individualRemoveClientAction,
      individualRemoveEmployerAction,
      individualEditClientAction,
      individualEditEmployerAction,
      individualGetBpiContractsAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(IndividualEmployeeComponent);
