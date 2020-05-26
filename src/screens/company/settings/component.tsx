import ContainerComponent from "containers/components/layout/container";
import { MDBIcon, MDBNav, MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane } from "mdbreact";
import { default as React } from "react";
import AlertControls from "./alert-setting/component";
import ApiSettingControls from "./api-setting/component";
import CompanyProfileComponent from "./company-profile/component";
import AdminProfileComponent from "./admin-profile/component";
import SecurityControls from "./security-setting/component";
import { connect } from "react-redux";
class CompanySettingsComponent extends React.Component<any, any> {
  state = {
    activeItemClassicTabs3: "1"
  };

  toggleClassicTab = tab => () => {
    if (this.state.activeItemClassicTabs3 !== tab) {
      this.setState({
        ...this.state,
        activeItemClassicTabs3: tab
      });
    }
  };

  componentDidMount = () => {
    if (this.props.userInfo.company_id === null) {
      this.setState({ activeItemClassicTabs3: "3" });
    }
  };

  render() {
    return (
      <ContainerComponent>
        <div className="classic-tabs pl-16 pt-20 setting-page">
          <MDBNav className="mt-5" classicTabs color="primary">
            <MDBNavItem hidden={this.props.userInfo.company_id === null}>
              <MDBNavLink
                to="#"
                className={this.state.activeItemClassicTabs3 === "1" ? "rewrite-active" : null}
                active={this.state.activeItemClassicTabs3 === "1"}
                onClick={this.toggleClassicTab("1")}
              >
                <MDBIcon icon="user" size="2x" />
                <br />
                Company profile
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem hidden={this.props.userInfo.company_id === null}>
              <MDBNavLink
                to="#"
                className={this.state.activeItemClassicTabs3 === "2" ? "rewrite-active" : null}
                active={this.state.activeItemClassicTabs3 === "2"}
                onClick={this.toggleClassicTab("2")}
              >
                <MDBIcon icon="heart" size="2x" />
                <br />
                Admin profile
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                to="#"
                className={this.state.activeItemClassicTabs3 === "3" ? "rewrite-active" : null}
                active={this.state.activeItemClassicTabs3 === "3"}
                onClick={this.toggleClassicTab("3")}
              >
                <MDBIcon icon="envelope" size="2x" />
                <br />
                Security
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                to="#"
                className={this.state.activeItemClassicTabs3 === "4" ? "rewrite-active" : null}
                active={this.state.activeItemClassicTabs3 === "4"}
                onClick={this.toggleClassicTab("4")}
              >
                <MDBIcon icon="star" size="2x" />
                <br />
                alerts
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                to="#"
                className={this.state.activeItemClassicTabs3 === "5" ? "rewrite-active" : null}
                active={this.state.activeItemClassicTabs3 === "5"}
                onClick={this.toggleClassicTab("5")}
              >
                <MDBIcon icon="cube" size="2x" />
                <br />
                API
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>
          <MDBTabContent className="card mb-5 min-h500" activeItem={this.state.activeItemClassicTabs3}>
            <MDBTabPane tabId="1" hidden={this.props.userInfo.company_id === null}>
              <CompanyProfileComponent isSettingPage={true} />
            </MDBTabPane>
            <MDBTabPane tabId="2" hidden={this.props.userInfo.company_id === null}>
              {this.state.activeItemClassicTabs3 === "2" ? <AdminProfileComponent isSettingPage={true} /> : null}
            </MDBTabPane>
            <MDBTabPane tabId="3">{this.state.activeItemClassicTabs3 === "3" ? <SecurityControls /> : null}</MDBTabPane>
            <MDBTabPane tabId="4">{this.state.activeItemClassicTabs3 === "4" ? <AlertControls /> : null}</MDBTabPane>
            <MDBTabPane tabId="5">
              {this.state.activeItemClassicTabs3 === "5" ? <ApiSettingControls /> : null}
            </MDBTabPane>
          </MDBTabContent>
        </div>
      </ContainerComponent>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo
  };
};

export default connect(mapStateToProps, null)(CompanySettingsComponent);
