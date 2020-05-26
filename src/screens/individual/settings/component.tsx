import ContainerComponent from "containers/components/layout/container";
import { MDBIcon, MDBNav, MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane } from "mdbreact";
import { default as React } from "react";
import AlertControls from "./alert-setting/component";
import ApiSettingControls from "./api-setting/component";
import DetailSettingControls from "./details-setting/component";
import SecurityControls from "./security-setting/component";
import VerificationSettingControls from "./verification-setting/component";
class SettingsComponent extends React.Component<any, any> {
  state = {
    activeItemClassicTabs3: "1"
  };
  async componentDidMount() {
    // const isInvoiceWorkflow = await sessionStorage.getItem("invoiceWorkflow");
    // if (isInvoiceWorkflow !== null) {
    //   setTimeout(() => {
    //     this.setState({ ...this.state, activeItemClassicTabs3: "2" });
    //   }, 200);
    // }
  }

  componentWillUnmount() {
    sessionStorage.setItem("invoiceWorkflow", null);
  }

  toggleClassicTab = tab => () => {
    if (this.state.activeItemClassicTabs3 !== tab) {
      this.setState({
        ...this.state,
        activeItemClassicTabs3: tab
      });
    }
  };
  render() {
    return (
      <ContainerComponent>
        <div className="classic-tabs pl-16 pt-20 setting-page">
          <MDBNav className="mt-5" classicTabs color="primary">
            <MDBNavItem>
              <MDBNavLink
                to="#"
                className={this.state.activeItemClassicTabs3 === "1" ? "rewrite-active" : null}
                active={this.state.activeItemClassicTabs3 === "1"}
                onClick={this.toggleClassicTab("1")}
              >
                <MDBIcon icon="user" size="2x" />
                <br />
                Details
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                to="#"
                className={this.state.activeItemClassicTabs3 === "2" ? "rewrite-active" : null}
                active={this.state.activeItemClassicTabs3 === "2"}
                onClick={this.toggleClassicTab("2")}
              >
                <MDBIcon icon="heart" size="2x" />
                <br />
                Verification
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
          <MDBTabContent className="card mb-5" activeItem={this.state.activeItemClassicTabs3}>
            <MDBTabPane tabId="1">
              {this.state.activeItemClassicTabs3 === "1" ? <DetailSettingControls /> : null}
            </MDBTabPane>
            <MDBTabPane tabId="2">
              {this.state.activeItemClassicTabs3 === "2" ? <VerificationSettingControls /> : null}
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
export default SettingsComponent;
