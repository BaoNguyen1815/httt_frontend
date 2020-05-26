import ContainerComponent from "containers/components/layout/container";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getProfileAction } from "../settings/ducks/actions";
import { IProps, IUserDetailState } from "./propState";
import { individualGetBpiContractsAction } from "../employers-clients/ducks/actions"
// import SettingsComponent from "screens/settings/component";
class DashBoardComponent extends React.Component<IProps, IUserDetailState> {
  constructor(props) {
    super(props);
    this.state = {
      toggleStateA: false,
      // breakWidth: 1300,
      windowWidth: 0
    };
  }

  componentDidMount = () => {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    // get Client/Employee list for check 
    // this.props.individualGetBpiContractsAction(this.props.userInfo.user_id);
    // check profile basic --> if empty update
    this.props.getProfileAction(this.props.userInfo.user_id);
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
        <div className="fixed-sn">
          <main style={mainStyle}>
            <h2>This's dashboard page</h2>
            <br />
          </main>
        </div>
      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    isLoading: state.common.isLoading,
    userInfo: state.user.userInfo,
    userDetail: state.user.userDetail
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ getProfileAction, individualGetBpiContractsAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardComponent);
