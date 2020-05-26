import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBSpinner } from 'mdbreact';
import VerificationStep from "../steps-verification/component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addUserAdvanceAction } from "../ducks/actions";

class ModalPage extends Component<any, any> {
  state = {
    modal13: false,
    isDisable: true,
    formData: null
  };

  toggle = nr => () => {
    const modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  callbackFunction = (childData, stateData) => {
    this.setState({ isDisable: childData, formData: stateData });
  };

  updateUserIDs = () => {
    this.props.addUserAdvanceAction(this.state.formData);
  };

  render() {
    const { isDisable } = this.state;
    return (
      <div>
        <MDBBtn color="primary" onClick={this.toggle(13)}>
          BEGIN VERIFICATION
        </MDBBtn>
        <MDBModal size="lg" isOpen={this.state.modal13} toggle={this.toggle(13)}>
          <MDBModalHeader toggle={this.toggle(13)}>Verification</MDBModalHeader>
          <MDBModalBody>
            <VerificationStep parentCallback={this.callbackFunction} />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle(13)}>
              Close
            </MDBBtn>
            <MDBBtn color="primary" disabled={isDisable || this.props.isLoading} onClick={this.updateUserIDs}>
              Save changes
              {this.props.isLoading ? <MDBSpinner small /> : null}
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    isLoading: state.common.isLoading,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ addUserAdvanceAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalPage);
