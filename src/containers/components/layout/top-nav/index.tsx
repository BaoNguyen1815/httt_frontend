import {
  MDBCollapse,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";
import React from "react";

export default class TopNavComponent extends React.Component {
  state = {
    collapse: false,
    dropdownOpen: false
  };

  onClick = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  public render() {
    return (
      <MDBNavbar color="default-color" dark expand="md" style={{ width: "100%" }}>
        <MDBNavbarBrand>
          <strong className="white-text">HTTT</strong>
        </MDBNavbarBrand>
        {/* <MDBNavbarToggler/> */}
        <MDBCollapse id="navbarCollapse3" navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon far icon="envelope" />
                Contact
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon far icon="comments" />
                Support
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Settings</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Log out</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}
