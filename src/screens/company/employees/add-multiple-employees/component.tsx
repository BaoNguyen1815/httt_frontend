// import SuccessComponent from "containers/components/alerts";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
// import { IProps, IState } from "./propState";
import {
  MDBBtn,
  MDBContainer,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBCol,
  MDBInput,
  MDBAlert,
  MDBIcon,
  MDBRow,
  MDBSpinner
} from "mdbreact";
import CSVReader from "react-csv-reader";
import DataTable from "react-data-table-component";
import { DATA_TABLE } from "containers/contants/data";
import { uploadBulkInvite } from "../services";
import { getDataEmployeeAction } from "../ducks/actions"
class BulkInviteComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      errMessage: "",
      dataCSV: null,
      fileName: "Upload your file",
      inviteList: [],
      isLoadingData: false,
      isSuccess: false,
      isCVS: true,
      warningMess: null,
      data: DATA_TABLE,
      jobRule: [
        {
          value: "employee"
        },
        {
          value: "admin"
        },
        {
          value: "admincreate"
        },
        {
          value: "contractor"
        },
        {
          value: "admininvite"
        }
      ]
    };
  }

  componentDidMount() { }

  onSubmit = async () => {
    this.setState({ isloadingData: true, isSuccess: false });
    const response = await uploadBulkInvite(
      this.props.userInfo.user_id,
      this.props.userInfo.company_id,
      this.state.inviteList
    );
    if (response) {
      this.setState({ isSuccess: true });
      setTimeout(() => {
        this.props.modalClosed();
      }, 5000);
      this.props.getDataEmployeeAction(this.props.userInfo.user_id, this.props.userInfo.company_id);
    }
    this.setState({ isloadingData: false });
  };

  handleForce = (data, fileName) => {
    const fileType = fileName.split(".").pop();
    if (fileType !== "csv") {
      this.setState({ isCVS: false, fileName, inviteList: [], dataCSV: null });
      return;
    }
    if (data.length > 200) {
      this.setState({
        errMessage: "Your upload exceeds the limit Aof 200 employees. Please check again.",
        isCVS: false
      });
    }
    const inviteList = this.convertToObj(data);
    this.setState({ dataCSV: data, fileName, inviteList });
  };

  handleDarkSideForce = (data, fileName) => {
    console.log(data, fileName);
  };

  convertToObj = arr => {
    const obj = [];
    const regEmail = /^\w+([\+.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({ ...this.state, warningMess: null });
    arr.forEach(item => {
      const data = {
        email: item[0],
        role: item[1].toLowerCase()
      };
      let isRuleCorrect = this.state.jobRule.filter(function (rule) {
        return rule.value === data.role;
      });

      if (!regEmail.test(data.email)) {
        this.setState({
          ...this.state,
          isCVS: false,
          warningMess: `Provided E-mail addresses (${data.email}) are invalid, please check again.`
        });
        return;
      }
      if (isRuleCorrect.length === 0) {
        this.setState({
          ...this.state,
          isCVS: false,
          warningMess: `Provided Job roles (${data.role + " of " + data.email}) are invalid, please check again.`
        });
        return;
      }
      obj.push(data);
    });
    return obj;
  };

  public render() {
    const papaparseOptions = {
      header: false,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };

    const columns = [
      {
        name: "Email",
        selector: "email",
        sortable: true
      },
      {
        name: "Role",
        selector: "role",
        sortable: true
      }
    ];

    return (
      <MDBContainer>
        <MDBModal isOpen={this.props.show} toggle={this.props.modalClosed} className="modal-1000" size="lg">
          <MDBModalHeader toggle={this.props.modalClosed}>Bulk Invite Upload</MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              <MDBCol size="6" className="bulk-note">
                <h6>Bulk Invitation CSV Format</h6>
                <p>
                  <b>Each Line: </b>user_email ,role
                </p>
                <p>user_email is valid email for payee to invite</p>
                <p>
                  <b>role is either:</b> <span>admin</span>, <span>admincreate</span>, <span>admininvite</span>,{" "}
                  <span>employee</span> , or <span>contractor</span> .
                </p>
                <p>Total lines must be from 1 to 200.</p>
                <p>File upload only supported on Chrome and Firefox</p>
                <p>
                  <b>Example:</b> <span>test@example.com, contractor</span>
                </p>
              </MDBCol>
              <MDBCol md="6" className="csv-upload">
                <h5>Upload Bulk invitation CSV</h5>
                <p>Bitwage will send emails invitee, invitee must click on invitation link in email</p>
                {this.state.isCVS ? null :
                  <MDBAlert color="warning">
                    {this.state.warningMess ? this.state.warningMess : `Please check file ${this.state.fileName} not correct.`}
                  </MDBAlert>
                }
                {this.state.isSuccess ? (
                  <MDBAlert color="success">
                    Please check file{" "}
                    <a href="#!" className="alert-link">
                      {this.state.fileName}
                    </a>{" "}
                    not correct.
                  </MDBAlert>
                ) : null}
                <br />
                <div style={{ position: "relative" }}>
                  <CSVReader
                    cssClass="bulk-upload"
                    label="Choose File"
                    onFileLoaded={this.handleForce}
                    onError={this.handleDarkSideForce}
                    parserOptions={papaparseOptions}
                    inputId="bulk-invite"
                    inputStyle={{ color: "black" }}
                  />
                  <MDBInput label={this.state.fileName} disabled />
                </div>
              </MDBCol>
            </MDBRow>
            <br />
            <MDBCol hidden={this.state.inviteList.length === 0}>
              <DataTable title="Invitation list preview" columns={columns} data={this.state.inviteList} pagination />
            </MDBCol>
          </MDBModalBody>
          <MDBModalFooter className="justify-content-end">
            <MDBBtn color="primary" outline onClick={this.props.modalClosed}>
              Close
            </MDBBtn>
            <MDBBtn color="primary" onClick={this.onSubmit} disabled={!this.state.dataCSV || this.state.isloadingData}>
              Submit Bulk Invitation <MDBIcon icon="file-upload" className="ml-1" /> {this.state.isloadingData ? <MDBSpinner small /> : null}
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
    isSuccess: state.common.isSuccess,
    successMessage: state.common.successMessage
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ getDataEmployeeAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BulkInviteComponent);
