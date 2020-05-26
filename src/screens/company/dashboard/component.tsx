import ContainerComponent from "containers/components/layout/container";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getProfileAction } from "../../individual/settings/ducks/actions";
import { getAdminProfileAction } from "./ducks/actions";
import { IProps, IUserDetailState } from "./propState";
import CompanyInfoComponent from "./company-information/component";
import AdminInfoComponent from "./admin-information/component";
import { offSuccessAction, offLoadingDataAction } from "../../../containers/redux/actions";
// import SettingsComponent from "screens/settings/component";
class CompanyDashBoardComponent extends React.Component<IProps, IUserDetailState> {
  constructor(props) {
    super(props);
    this.state = {
      toggleStateA: false,
      // breakWidth: 1300,
      windowWidth: 0
    };
  }

  componentDidMount = async () => {
    this.props.offLoadingDataAction();
    // if (this.props.userInfo.company_id !== null && this.props.adminDetail === null) {
    //   await this.props.getAdminProfileAction(this.props.userInfo.user_id, this.props.userInfo.company_id);
    // }
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    if (!this.props.userDetail) {
      return;
    }
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.handleResize);
  };

  handleResize = () =>
    this.setState({
      windowWidth: window.innerWidth
    });

  handleToggleClickA = () => {
    const { toggleStateA } = this.state;
    this.setState({
      toggleStateA: !toggleStateA
    });
  };
  render() {
    const mainStyle = {
      margin: "0 6%",
      paddingTop: "5.5rem"
      // paddingLeft: windowWidth > breakWidth ? "240px" : "0"
    };

    return (
      <ContainerComponent>
        {/* <div className="fixed-sn"> */}
        <main style={mainStyle} className="dashboard">
          <div
            hidden={
              this.props.dashboardInfo &&
              this.props.dashboardInfo.isCompleted &&
              this.props.userInfo && this.props.userInfo.company_id
            }
          >
            <CompanyInfoComponent
              isShow={this.props.dashboardInfo && this.props.dashboardInfo.isStep1}
              isCopProfile={false}
            />
            {this.props.dashboardInfo && !this.props.dashboardInfo.isCompleted ? <AdminInfoComponent
              isShow={this.props.dashboardInfo && this.props.dashboardInfo.isStep2}
              isAdminProfile={false}
            /> : null}

          </div>
          <div hidden={this.props.dashboardInfo && !this.props.dashboardInfo.isCompleted}>
            <p>This Dashboard page.</p>
          </div>
          <br />
        </main>
        {/* </div> */}
      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    isLoading: state.common.isLoading,
    dashboardInfo: state.screen.companyDashboard.information.dashboardInfo,
    adminDetail: state.screen.companyDashboard.information.adminDetail,
    userInfo: state.user.userInfo
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getProfileAction, getAdminProfileAction, offSuccessAction, offLoadingDataAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDashBoardComponent);
