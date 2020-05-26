import {
  MDBContainer
} from "mdbreact";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getCopProfileAction } from "../ducks/actions";
import CompanyInformation from "screens/company/dashboard/company-information";

class CompanyProfileComponent extends Component<any, any & any> {
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
  async componentDidMount() {
    // await this.props.getCopProfileAction(this.props.userInfo.user_id);
  }

  render() {
    return (
      <MDBContainer fluid className="md-accordion api-tab">
        <CompanyInformation isCopProfile={true} isShow={true}/>
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
  bindActionCreators({ getCopProfileAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfileComponent);
