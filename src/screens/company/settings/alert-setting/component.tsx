import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBSwitch,
  MDBTooltip,
  MDBDataTable,
  MDBCardHeader
} from "mdbreact";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { alertAction, alertEmailPreferenceEditAction } from "../ducks/actions";
import { getUserAlertsHistory } from "../ducks/actions";
class AlertControls extends Component<any, any & any> {
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.alertDetails !== prevState.alertDetails) {
      update['switch1'] = nextProps.alertDetails.block_login_new_ip_email;
      update['switch2'] = nextProps.alertDetails.block_push_notifications;
      update['alertDetails'] = nextProps.alertDetails;
    }

    if (nextProps.alertHistory !== prevState.alertHistory) {
      const dataTable = {
        columns: [
          {
            label: "Time sent",
            field: "aws_created",
            sort: "asc",
            width: 150
          },
          {
            label: "To (Worker Email)",
            field: "recipient",
            sort: "asc",
            width: 270
          },
          {
            label: "Subject",
            field: "subject",
            sort: "asc",
            width: 200
          }
        ],
        rows: nextProps.alertHistory.sessions
      };
      update['alertHistory'] = dataTable;

    }
    return update;
  }


  constructor(props) {
    super(props);
    this.state = {
      switch1: false,
      switch2: false,
      switch3: false,
      alertDetails: null,
      alertHistory: null,
      collapseID: ""
    };
  }

  handleSwitchChange = nr => async () => {
    const switchNumber = `switch${nr}`;
    await this.setState({ ...this.state, [switchNumber]: !this.state[switchNumber] }
    );
    if (switchNumber === "switch1") {
      this.props.alertEmailPreferenceEditAction(
        this.props.userInfo.user_id,
        this.state.switch1 === true ? "True" : "False"
      );
    }
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  async componentDidMount() {
    await this.props.alertAction(this.props.userInfo.user_id);
    setTimeout(() => {
      this.props.getUserAlertsHistory(this.props.userInfo.user_id);
    }, 500);
  }

  render() {
    const { switch1, switch2, alertHistory } = this.state;
    return (
      <MDBContainer fluid className="md-accordion alert">
        <MDBCard className="mt-3">
          <MDBCardHeader>
            <p>
              <MDBIcon icon="envelope" className="mr-2" />
              Email Notifications
            </p>
            <hr />
          </MDBCardHeader>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md="6">
                <MDBRow className="my-2">
                  <MDBCol md="8">
                    <div className="d-flex flex-row align-items-center">
                      <MDBIcon icon="map-marker-alt" />
                      <span className="mx-2">Login from New IP Address </span>
                    </div>
                  </MDBCol>
                  <MDBCol md="4">
                    <MDBSwitch labelLeft="" labelRight="" checked={switch1} onChange={this.handleSwitchChange(1)} />
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardHeader>
            <p>
              <MDBIcon icon="mobile" className="mr-2" />Push Notifications
            </p>
            <hr />
          </MDBCardHeader>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md="6">
                <MDBRow className="my-2">
                  <MDBCol md="8">
                    <div className="d-flex flex-row align-items-center">
                      <MDBIcon icon="map-marker-alt" />
                      <div className="wrap-hide-payroll">
                        <span className="mx-2">Enable Push Notifications </span>
                        <MDBTooltip material placement="top" className="tooltip">
                          <MDBBtn flat>
                            <MDBIcon icon="info-circle" className="mr-2" />
                          </MDBBtn>
                          <p className="font-10">Push Notifications include: Change Distribution and Receive Payroll</p>
                        </MDBTooltip>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol md="4">
                    <MDBSwitch labelLeft="" labelRight="" checked={switch2} onChange={this.handleSwitchChange(2)} />
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardHeader>
            <p>
              <MDBIcon icon="user-secret" className="mr-2" />
              Alert History
            </p>
            <hr />
          </MDBCardHeader>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md="12">
                {alertHistory !== null ? (
                  <MDBDataTable data={alertHistory} sorting={"false"} searching={false} paging={true} />
                ) : null}
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    isLoading: state.common.isLoading,
    userInfo: state.user.userInfo,
    alertDetails: state.screen.setting.userSetting.alertDetails,
    alertHistory: state.screen.setting.userSetting.alertHistory
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ alertAction, alertEmailPreferenceEditAction, getUserAlertsHistory }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AlertControls);
