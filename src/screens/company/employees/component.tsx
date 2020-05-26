// import SuccessComponent from "containers/components/alerts";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getDataEmployeeAction, removeEmployeeAction, removeEmployeeNotRegAction } from "./ducks/actions";
import ContainerComponent from "containers/components/layout/container";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBInput,
  MDBCol,
  MDBSelect,
  MDBIcon,
  MDBBadge,
  MDBTooltip,
  MDBSpinner,
  MDBToastContainer,
  MDBToast
} from "mdbreact";
import ModalConfirm from "containers/components/modal/confirm-modal";
import BulkInviteComponent from "./add-multiple-employees/component";
import EditEmployeeComponent from "./edit/component";
import DataTable from "react-data-table-component";
import { IState, IProps } from "./propState";
import memoize from "memoize-one";
import { sendInviteUser, sendReminder } from "./services";
import { validateField } from "containers/utils/utils";
import { offSuccessAction } from "../../../containers/redux/actions";
class CompanyEmployeeComponent extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      employeeEmail: "",
      employeeRole: "",
      options: [
        {
          text: "Employee",
          value: "employee"
        },
        {
          text: "Admin",
          value: "admin"
        },
        {
          text: "Admin Create",
          value: "admincreate"
        },
        {
          text: "Contractor",
          value: "contractor"
        },
        {
          text: "Admin Invite",
          value: "admininvite"
        }
      ],
      currentEmploy: null,
      formInputValid: {
        employeeEmailValid: false,
        employeeRoleValid: false
      },
      formErrors: {
        employeeEmail: "",
        employeeRole: ""
      },
      isLoadingData: false,
      isSendReminder: false,
      formValid: false,
      selectedRows: [],
      isRemove: false,
      isEditEmp: false,
      isUploadBulk: false,
      dataWithDist: [],
      dataWithOutDist: [],
      withDist: memoize(clickHandler => [
        {
          name: "Employee Name",
          cell: row => (
            <div>
              {row.email}{" "}
              <MDBIcon
                icon="minus-circle"
                onClick={() => clickHandler(row, true)}
                className="red-text pl-1 cursor remove-emp"
              />
            </div>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: false,
          grow: 1,
          sortable: true,
          selector: "email",
          width: "300px",
        },
        {
          name: "Email",
          selector: "email",
          sortable: true
        },
        {
          name: "Team Role",
          selector: "role",
          sortable: true
        },
        {
          name: "Job role",
          selector: "job_role",
          sortable: true,
          right: true
        },
        {
          name: "Details",
          cell: row => (
            <MDBBtn hidden={row.employee_id === undefined} color="primary" rounded onClick={() => clickHandler(row, false)} size="sm">
              Edit
            </MDBBtn>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true
        }
      ]),
      withOutDist: memoize(clickHandler => [
        {
          name: "Email",
          cell: row => (
            <div>
              {row.email}{" "}
              <MDBIcon hidden={row.role === "user"}
                icon="minus-circle"
                onClick={() => clickHandler(row, true)}
                className="red-text pl-1 cursor remove-emp"
              />
            </div>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: false,
          width: "300px",
          sortable: true,
          selector: "email",
        },
        {
          name: "Team Role",
          selector: "role",
          sortable: true
        },
        // {
        //   name: "is Registered",
        //   cell: row => <div>{row.phone_number ? "true" : "false"} </div>
        // },
        {
          name: "Reminder",
          cell: row => (
            <MDBBtn
              hidden={row.role === "user"}
              color="primary"
              disabled={this.state.isSendReminder}
              rounded
              onClick={() => clickHandler(row, false)}
              size="sm"
            >
              Send reminder
            </MDBBtn>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
          width: "200px"
        }
      ])
    };
  }
  async componentDidMount() {
    await this.getDataEmployee();
    let dataWithOutDist = this.props.dataWithOutDist;
    if (this.props.listEmployeeNotRegistered !== null && this.props.listEmployeeNotRegistered.length !== 0) {
      dataWithOutDist = dataWithOutDist.concat(this.props.listEmployeeNotRegistered);
    }
    this.setState({
      ...this.state,
      dataWithDist: this.props.dataWithDist,
      dataWithOutDist
    });
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.listEmployeeNotRegistered !== null &&
        (this.props.listEmployeeNotRegistered !== prevProps.listEmployeeNotRegistered) ||
        this.props.dataWithDist !== prevProps.dataWithDist ||
        this.props.dataWithOutDist !== prevProps.dataWithOutDist)
    ) {
      let dataWithOutDist = this.props.dataWithOutDist;
      if (this.props.listEmployeeNotRegistered.length !== 0) {
        dataWithOutDist = dataWithOutDist.concat(this.props.listEmployeeNotRegistered);
      }
      this.setState({
        ...this.state,
        dataWithDist: this.props.dataWithDist,
        dataWithOutDist
      });
    }
  }

  getDataEmployee = () => {
    this.props.getDataEmployeeAction(this.props.userInfo.user_id, this.props.userInfo.company_id);
  };

  addEmployee = async () => {
    this.setState({ isLoadingData: true });
    const inviteUser = [{
      email: this.state.employeeEmail,
      role: this.state.employeeRole
    }
    ];
    const response = await sendInviteUser(this.props.userInfo.user_id, this.props.userInfo.company_id, inviteUser);
    if (response && response.company_id && response.status) {
      let message = response.status[0].status
      await this.getDataEmployee();
      MDBToast["success"](message,
        {
          closeButton: false
        });
    }
    // clean data.
    this.setState({
      ...this.state,
      isLoadingData: false,
      employeeEmail: "",
      employeeRole: "",
      formInputValid: {
        employeeEmailValid: false,
        employeeRoleValid: false
      },
      formValid: false,
      options: [
        {
          text: "Employee",
          value: "employee"
        },
        {
          text: "Admin",
          value: "admin"
        },
        {
          text: "Admin Create",
          value: "admincreate"
        },
        {
          text: "Contractor",
          value: "contractor"
        },
        {
          text: "Admin Invite",
          value: "admininvite"
        }
      ]
    });
  };

  // functions
  changeHandler = async (event: any) => {
    event.persist();
    await this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  handleSelectChange = async (value, option) => {
    const state = { ...this.state };
    if (value.length !== 0) {
      switch (option) {
        case "employeeRole":
          state.formInputValid.employeeRoleValid = true;
          break;
      }
    }
    state[option] = value[0];
    await this.setState(state, this.validateForm);
  };

  onBlurValid = (event: any) => {
    this.validate(event.target.type, event.target.value, event.target.name);
  };

  validate = (type, value, field) => {
    const fieldValidationErrors = this.state.formErrors;
    const formInputValid = this.state.formInputValid;
    const validate = validateField(type, value, field);
    formInputValid[`${field}Valid`] = validate.filedValid;
    fieldValidationErrors[field] = validate.fieldValidationErrors;
    this.setState(
      {
        formErrors: fieldValidationErrors,
        formInputValid
      },
      this.validateForm
    );
  };

  validateForm = () => {
    this.setState({
      formValid: this.state.formInputValid.employeeEmailValid && this.state.formInputValid.employeeRoleValid
    });
  };

  hideModal = () => {
    this.setState({ isRemove: false, isUploadBulk: false, isEditEmp: false });
  };

  removeEmployeeById = async () => {
    if (this.state.currentEmploy.employee_id) {
      this.props.removeEmployeeAction(this.props.userInfo.user_id, this.props.userInfo.company_id, this.state.currentEmploy.employee_id, this.hideModal);
    } else {
      this.props.removeEmployeeNotRegAction(this.props.userInfo.user_id, this.props.userInfo.company_id, this.state.currentEmploy.email, this.state.currentEmploy.role, this.hideModal);
    }
  };

  openBulkModal = () => {
    this.setState({ isUploadBulk: true });
  };

  handleButtonClick = async (data, isRemove) => {
    if (!isRemove) {
      await this.setState({ isEditEmp: true, currentEmploy: data });
    } else {
      await this.setState({ isRemove: true, currentEmploy: data });
    }
  };

  employeeWithout = async (data, isRemove) => {
    if (!isRemove) {
      // send reminder
      await this.setState({ isSendReminder: true });
      const res = await sendReminder(this.props.userInfo.user_id, this.props.userInfo.company_id, data.email, data.role);
      if (res && res.company_id) {
        MDBToast["success"](`Email Sent`, {
          closeButton: false
        });
      }
      this.setState({ isSendReminder: false });
    } else {
      // open remove employee popup 
      this.props.offSuccessAction("", false);
      await this.setState({ isRemove: true, currentEmploy: data });
    }
  };

  public render() {
    const {
      employeeEmail,
      options,
      employeeRole,
      formValid,
      isLoadingData,
      withDist,
      isEditEmp,
      isRemove,
      isUploadBulk,
      dataWithDist,
      dataWithOutDist
    } = this.state;
    const mainStyle = {
      margin: "0 6%",
      paddingTop: "5.5rem"
    };
    // const modalBody = `Are you sure you want to remove the worker ${
    //   this.state.currentEmploy !== null ? this.state.currentEmploy.first_name : ""
    //   } ID: ${this.state.currentEmploy !== null ? this.state.currentEmploy.employee_id : ""} ?`;
    const editEmpModal = isEditEmp ? (
      <EditEmployeeComponent
        showModel={isEditEmp}
        modalClosed={this.hideModal}
        employeeData={this.state.currentEmploy}
      />
    ) : null;
    const confirmModal = isRemove ? (
      <ModalConfirm
        show={isRemove}
        modalContent={`Are you sure you want to remove the worker ${
          this.state.currentEmploy !== null ? this.state.currentEmploy.email : ""
          } Role: ${this.state.currentEmploy !== null ? this.state.currentEmploy.role : ""} ?`}
        modalClosed={this.hideModal}
        modalSubmit={this.removeEmployeeById}
        disabled={this.props.isLoading}
        isSuccess={this.props.isSuccess}
      />
    ) : null;
    const uploadModal = isUploadBulk ? <BulkInviteComponent show={isUploadBulk} modalClosed={this.hideModal} /> : null;
    return (
      <ContainerComponent>
        {uploadModal}
        {confirmModal}
        {editEmpModal}
        <MDBToastContainer className="toast-content" hideProgressBar={true} newestOnTop={true} autoClose={3000} />
        <main style={mainStyle} className="employee">
          <MDBCard>
            <MDBCardBody>
              <h5>Add Employee</h5>
              <hr />
              <MDBCardText>
                Some quick example text to build on the card title and make up the bulk of the card&apos;s content.
              </MDBCardText>
              <MDBRow>
                <MDBCol md="3">
                  <MDBInput
                    value={employeeEmail}
                    onChange={this.changeHandler}
                    onBlur={this.onBlurValid}
                    type="email"
                    name="employeeEmail"
                    label="Employee Email"
                  />
                </MDBCol>
                <MDBCol md="3" className="select-role">
                  <MDBSelect
                    search
                    options={options}
                    selected="Choose team role"
                    label="Team Role"
                    getValue={event => this.handleSelectChange(event, "employeeRole")}
                    value={employeeRole}
                  />
                  <MDBTooltip material placement="top">
                    <MDBBtn flat>
                      <MDBIcon icon="info-circle" className="mr-2" />
                    </MDBBtn>
                    <p className="font-10">Note about different Team roles. </p>
                  </MDBTooltip>
                </MDBCol>
                <MDBCol md="3" className="add-employee">
                  <MDBBtn
                    color="primary"
                    className="detail-button mt-15"
                    disabled={!formValid || isLoadingData}
                    onClick={this.addEmployee}
                  >
                    Add Employee
                    {isLoadingData ? <MDBSpinner small /> : null}
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
            <MDBCardBody>
              <h5>Add Multiple Employees</h5>
              <hr />
              <div className="add-multiple">
                <MDBBtn color="primary" onClick={this.openBulkModal}>
                  Bulk invite upload <MDBIcon icon="file-upload" className="ml-1" />
                </MDBBtn>
              </div>
            </MDBCardBody>
            <MDBCardBody>
              <h5>
                Employees Without Distributions <MDBBadge color="info">{dataWithOutDist && dataWithOutDist.length ? dataWithOutDist.length : null}</MDBBadge>
              </h5>
              <hr />
              <DataTable data={dataWithOutDist} noHeader={true} columns={this.state.withOutDist(this.employeeWithout)} pagination />
              <h5>
                Employees With Distributions <MDBBadge color="info">{dataWithDist && dataWithDist.length ? dataWithDist.length : null}</MDBBadge>
              </h5>
              <hr />
              <DataTable data={dataWithOutDist} noHeader={true} columns={withDist(this.handleButtonClick)} pagination />
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
    listEmployeeNotRegistered: state.screen.employee.listEmployeeNotRegistered,
    dataWithDist: state.screen.employee.listDataWithDist,
    dataWithOutDist: state.screen.employee.listDataWithOutDist
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getDataEmployeeAction, removeEmployeeAction, removeEmployeeNotRegAction, offSuccessAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompanyEmployeeComponent);
