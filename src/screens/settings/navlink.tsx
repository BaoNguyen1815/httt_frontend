import { MDBIcon, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { default as React } from "react";
import { IProps } from "./propState";
import './settings.css';
class NavLink extends React.Component<IProps> {
  state = {
    activeItemClassicTabs3: "1",
    data: 'passdata'
  }

  toggleClassicTabs3 = tab => () => {
    if (this.state.activeItemClassicTabs3 !== tab) {
      this.setState({
        activeItemClassicTabs3: tab
      });
    }
  }
  render() {
    return (
      <div className="classic-tabs">
        <MDBNav classicTabs color="orange" className="mt-5">
          <MDBNavItem>
            <MDBNavLink
              to="/settings-page/details"
              active={this.state.activeItemClassicTabs3 === "1"}
            // onClick={this.toggleClassicTabs3("1")}
            >
              <MDBIcon icon="user" size="2x" />
              <br />
              Details
                </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              to="/settings-page/verification"
              active={this.state.activeItemClassicTabs3 === "2"}
              onClick={this.toggleClassicTabs3("2")}
            >
              <MDBIcon icon="heart" size="2x" />
              <br />
              Verification
                </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              to="/settings-page/security"
              active={this.state.activeItemClassicTabs3 === "3"}
              onClick={this.toggleClassicTabs3("3")}
            >
              <MDBIcon icon="envelope" size="2x" />
              <br />
              Security
                </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              to="/settings-page/alerts"
              active={this.state.activeItemClassicTabs3 === "4"}
              onClick={this.toggleClassicTabs3("4")}
            >
              <MDBIcon icon="star" size="2x" />
              <br />
              alerts
                </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              to="/settings-page/api"
              active={this.state.activeItemClassicTabs3 === "5"}
              onClick={this.toggleClassicTabs3("5")}
            >
              <MDBIcon icon="star" size="2x" />
              <br />
              API
                </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
      </div>
    );
  }
}
export default NavLink;
