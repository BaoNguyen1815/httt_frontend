import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBCardHeader
} from "mdbreact";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { updateGauthUserAction, setGauthUserAction } from "../ducks/actions";

class ApiSettingControls extends Component<any, any & any> {
  constructor(props) {
    super(props);
    this.state = {
      switch1: false,
      switch2: false,
      switch3: true,
      collapseID: "",
      modalSupport: false
    };
  }

  handleSwitchChange = nr => () => {
    const switchNumber = `switch${nr}`;
    this.setState({
      [switchNumber]: !this.state[switchNumber]
    });
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  _openModalSupport = () => {
    this.setState({
      modalSupport: true
    });
  };

  _toogleModalSupport = () => {
    this.setState({
      modalSupport: !this.state.modalSupport
    });
  };

  render() {
    // const { collapseID } = this.state;

    return (
      <MDBContainer fluid className="md-accordion api-tab">
        <MDBCard className="mt-3">
          <MDBCardHeader>
            <p>
              <MDBIcon icon="crosshairs" className="mr-2" />
              API Key/Secret
            </p>
            <hr />
          </MDBCardHeader>
          <MDBCardBody>
            <p className="note note-info mb-2">
              Use Bitwage API v1
              <a target="_blank" href="https://docs.bitwage.com/#api-key-secret">
                API Key:Secret
                <sup>
                  <MDBIcon icon="external-link-alt" />
                </sup>
              </a>
              Authentication to access your own worker and employer resources.
            </p>
            <p className="note note-danger">
              API Key and Secret only available if you are an admin of a Bitwage employer.
            </p>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardHeader>
            <p>
              <MDBIcon icon="cube" className="mr-2" />
              Web Application Flow
            </p>
            <hr />
          </MDBCardHeader>
          <MDBCardBody>
            <p className="note note-info mb-2">
              3rd-Party Applications that use the Bitwage API v1
              <a target="_blank" href="https://docs.bitwage.com/#web-application-flow">
                Web Application Flow
                <sup>
                  <MDBIcon icon="external-link-alt" />
                </sup>
              </a>
              Authentication to access others' employer resources.
            </p>
            <p className="note note-danger">
              Contact
              <span className="text-primary cursor-pointer" onClick={this._openModalSupport}>
                {" "}
                Bitwage Support{" "}
              </span>
              for authorization to Register Web Application Flow Applications.
            </p>
            <MDBRow className="mt-4">
              <MDBCol md="12">
                <h5>
                  My Applications
                  <MDBIcon icon="info-circle" className="mr-2" />
                </h5>
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th>Name</th>
                      <th>Client ID</th>
                      <th>Created</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>12-1-1111</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardHeader>
            <p>
              <MDBIcon icon="cubes" className="mr-2" />
              Username/Password
            </p>
            <hr />
          </MDBCardHeader>
          <MDBCardBody>
            <p className="note note-info mb-2">
              Use Bitwage API v1
              <a target="_blank" href="https://docs.bitwage.com/#username-and-password">
                Username:Password
                <sup>
                  <MDBIcon icon="external-link-alt" />
                </sup>
              </a>
              Authentication to access your own worker and employer resources.
            </p>
            <p className="note note-danger mb-2">
              Contact
              <span className="text-primary cursor-pointer" onClick={this._openModalSupport}>
                {" "}
                Bitwage Support{" "}
              </span>
              for authorization to register new Username:Password Applications.
            </p>
          </MDBCardBody>
        </MDBCard>

        {/*Modal support*/}
        <MDBModal size="lg" isOpen={this.state.modalSupport} toggle={this._toogleModalSupport}>
          <MDBModalHeader toggle={this._toogleModalSupport}>Bitwage Support </MDBModalHeader>
          <MDBModalBody>
            <div>
              <h6 className="text-italic">
                <MDBIcon className="mr-2" icon="map-marker-alt" />
                Bitwage, Inc. 70 Zoe Street, Suite 200 San Francisco, CA 94107, USA
              </h6>
              <h6 className="text-italic">
                <MDBIcon className="mr-2" icon="map-marker-alt" />
                Bitwage, Inc. 70 Zoe Street, Suite 200 San Francisco, CA 94107, USA
              </h6>
            </div>
            <form>
              <div className="grey-text">
                <MDBRow>
                  <MDBCol lg="6">
                    <MDBInput
                      label="Full Name"
                      placeholder="Enter full name"
                      icon="user"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      required
                    >
                      <div className="invalid-feedback">Name is required</div>
                    </MDBInput>
                  </MDBCol>
                  <MDBCol lg="6">
                    <MDBInput
                      label="Reply Email"
                      placeholder="Enter email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      required
                    >
                      <div className="invalid-feedback">Email is required</div>
                    </MDBInput>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol lg="12">
                    <MDBInput
                      label="Message"
                      placeholder="Enter message"
                      icon="comment"
                      group
                      type="textarea"
                      validate
                      error="wrong"
                      success="right"
                      required
                    >
                      <div className="invalid-feedback">Message is required</div>
                    </MDBInput>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol lg="12" className="d-flex justify-content-center">
                    <MDBBtn size="lg" color="primary">
                      Send
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </div>
            </form>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this._toogleModalSupport}>
              Close
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
    isLoading: state.common.isLoading,
    userInfo: state.user.userInfo
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ updateGauthUserAction, setGauthUserAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ApiSettingControls);
