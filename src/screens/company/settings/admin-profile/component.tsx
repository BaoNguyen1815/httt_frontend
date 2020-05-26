import {
  MDBContainer
} from "mdbreact";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { updateGauthUserAction, setGauthUserAction } from "../ducks/actions";
import AdminInformation from "screens/company/dashboard/admin-information";

class AdminProfileComponent extends Component<any, any & any> {
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
  render() {
    return (
      <MDBContainer fluid className="md-accordion api-tab">
        <AdminInformation isAdminProfile={true} isShow={true} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfileComponent);
