// import SuccessComponent from "containers/components/alerts";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
// import { IProps, IState } from "./propState";
import DatePicker from "react-datepicker";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBCol,
  MDBSelect,
  MDBSpinner,
  MDBAlert
} from "mdbreact";
import { validateField } from "containers/utils/utils";
import { editEmployeeAction } from "../ducks/actions";
import { offSuccessAction } from "../../../../containers/redux/actions";
class EditEmployeeComponent extends React.Component<any, any> {
  state = {
    isOpenModal: false,
    workerId: "",
    name: "",
    surname: "",
    dateOfBirth: new Date(),
    address: "",
    email: "",
    phoneNumber: "",
    jobRole: "",
    role: "",
    formErrors: {
      name: "",
      surname: "",
      dateOfBirth: "",
      address: "",
      email: "",
      phoneNumber: "",
      jobRole: "",
      role: ""
    },
    formInputValid: {
      // nameValid: false,
      // surnameValid: false,
      // addressValid: false,
      // emailValid: false,
      // phoneValid: false,
      jobRoleValid: false,
      roleValid: false
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
    ],
    jobRoleOptions: [
      {
        text: "Software engineer",
        value: "Software engineer"
      },
      {
        text: "Software tester",
        value: "Software tester"
      },
      {
        text: "Product Owner",
        value: "Product Owner"
      },
      {
        text: "Project manager",
        value: "Project manager"
      },
      {
        text: "Business analyst",
        value: "Business analyst"
      }
    ]
  };
  constructor(props) {
    super(props);
  }

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.showModel !== this.props.showModel;
  // }

  async componentDidMount() {
    this.props.offSuccessAction("", false);
    if (this.props.employeeData) {
      await this.setState({ role: this.props.employeeData.role, jobRole: this.props.employeeData.job_role });
      this.formatDataSelect();
    }
  }

  editEmployee = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    this.props.editEmployeeAction(
      this.props.userInfo.user_id,
      this.props.userInfo.company_id,
      this.props.employeeData.employee_id,
      this.state.role,
      this.state.jobRole
    );
  };

  handleSelectChange = async (value, option) => {
    const state = { ...this.state };
    if (value.length !== 0) {
      switch (option) {
        case "jobRole":
          state.formInputValid.jobRoleValid = true;
          state[option] = value[0];
          await this.setState(state, this.validateForm);
          break;
        case "role":
          state.formInputValid.roleValid = true;
          state[option] = value[0];
          await this.setState(state, this.validateForm);
          break;
        default:
          break;
      }
    }
  };

  handleChange = event => {
    event.persist();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  validate(type, value, field) {
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
  }

  validateForm = () => {
    this.setState({
      formValid: this.state.formInputValid.jobRoleValid && this.state.formInputValid.roleValid
    });
  };

  onBlurValid = (event: any) => {
    this.validate(event.target.type, event.target.value, event.target.name);
  };

  formatDataSelect = () => {
    const job = this.state.jobRoleOptions;
    const role = this.state.options;
    const employee = this.props.employeeData;
    const arrJob = [];
    const arrRole = [];
    job.forEach(item => {
      const element = {
        checked: item.value === employee.job_role ? true : false,
        text: item.text,
        value: item.value
      };
      arrJob.push(element);
    });

    role.forEach(item => {
      const element = {
        checked: item.value === employee.role ? true : false,
        text: item.text,
        value: item.value
      };
      arrRole.push(element);
    });

    this.setState({ ...this.state, options: arrRole, jobRoleOptions: arrJob });
  };

  public render() {
    const { options, formValid, jobRoleOptions } = this.state;
    const employee = this.props.employeeData;
    return (
      <MDBContainer>
        <MDBModal isOpen={this.props.showModel} toggle={this.props.modalClosed} centered size="lg">
          <MDBModalHeader toggle={this.props.modalClosed}>EDIT EMPLOYEE INFOMATION</MDBModalHeader>
          <MDBModalBody>
            <MDBCol md="12">
              <MDBInput
                label="Worker ID"
                value={employee.employee_id}
                type="text"
                name="workerId"
                onBlur={this.onBlurValid}
                onChange={this.handleChange}
                disabled
              />
              <MDBInput
                label="Name"
                value={employee.first_name}
                type="text"
                name="name"
                onBlur={this.onBlurValid}
                onChange={this.handleChange}
                disabled
              />
              <MDBInput
                label="Surname"
                value={employee.last_name}
                type="text"
                onBlur={this.onBlurValid}
                name="surname"
                onChange={this.handleChange}
                disabled
              />
              <label hidden={employee.date_of_birth === "0"}>Date of birth</label>
              {employee.date_of_birth !== "0" ? (
                <DatePicker
                  selected={
                    employee.date_of_birth ? new Date(employee.date_of_birth) : new Date(employee.date_of_birth)
                  }
                  name="dateOfBirth"
                  onChange={this.handleChange}
                  maxDate={new Date()}
                  placeholderText="Click to select a date"
                  type="text"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  className="date-picker"
                  disabled
                />
              ) : null}
              {employee.street_address !== "0" ? (
                <MDBInput
                  label="Address"
                  value={employee.street_address}
                  type="text"
                  onBlur={this.onBlurValid}
                  name="address"
                  onChange={this.handleChange}
                  disabled
                />
              ) : null}

              <MDBInput
                label="Email"
                type="email"
                onBlur={this.onBlurValid}
                value={employee.email}
                name="email"
                onChange={this.handleChange}
                disabled
              />
              <MDBInput
                label="Phone"
                value={employee.phone_number}
                name="phoneNumber"
                onBlur={this.onBlurValid}
                type="number"
                onChange={this.handleChange}
                disabled
              />
              <MDBSelect
                options={jobRoleOptions}
                className="is-valid"
                selected="Select job role"
                label="Job Role"
                getValue={event => this.handleSelectChange(event, "jobRole")}
                value={this.state.jobRole}
              />
              <MDBSelect
                options={options}
                className="is-valid"
                selected="Select role"
                label="Role"
                getValue={event => this.handleSelectChange(event, "role")}
                value={this.state.role}
              />
            </MDBCol>
            <MDBCol md="12">
              <div className="d-flex align-items-center justify-content-center mb-3">Available Team Roles</div>
              <div>
                <div>
                  Contractor or Employee : <span className="font-size-14"> choose distributions and make invoices</span>{" "}
                </div>
                <div>
                  Invite-Admin :
                  <span className="font-size-14">
                    {" "}
                    employee role plus vieew employer portal , invite employees <br /> and constractor
                  </span>
                </div>
                <div>
                  Create-Admin :
                  <span className="font-size-14"> invite - admin role plus invite - admins and create orders</span>
                </div>
                <div>
                  Full-Admin :{" "}
                  <span className="font-size-14">create-admin role plus invite create-admin and approve orders</span>
                </div>
              </div>
              {this.props.isSuccess ? (
                <MDBAlert color="success" className="mt-3">
                  update successfully!
                </MDBAlert>
              ) : (
                ""
              )}
            </MDBCol>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="primary" outline onClick={this.props.modalClosed}>
              Close
            </MDBBtn>
            <MDBBtn color="primary" onClick={this.editEmployee} disabled={!formValid || this.props.isLoading}>
              Save changes
              {this.props.isLoading ? <MDBSpinner small /> : null}
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    message: state.common.errMess,
    isLoading: state.common.isLoading,
    userInfo: state.user.userInfo,
    isSuccess: state.common.isSuccess
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ editEmployeeAction, offSuccessAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployeeComponent);
