import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBCollapse, MDBMask, MDBRow, MDBCol, MDBBtn, MDBView, MDBContainer, MDBFormInline, MDBBtnGroup, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import "./index.css";
class HomePage extends React.Component<any, any> {
  state = {
    collapsed: false
  };

  handleTogglerClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  loginViaIndividual = isContractor => {
    isContractor ? localStorage.setItem("role", "contractor") : localStorage.setItem("role", "employee");
    if (isContractor) {
      this.props.history.push("/contractor/login");
    } else {
      this.props.history.push("/employee/login");
    }

  };

  loginViaCompany = () => {
    localStorage.setItem("role", "admin");
    this.props.history.push("/company/login");
  };

  render() {
    const overlay = (
      <div id="sidenav-overlay" style={{ backgroundColor: "transparent" }} onClick={this.handleTogglerClick} />
    );
    return (
      <div id="apppage">
        <Router>
          <div>
            <MDBNavbar color="primary-color" dark expand="md" fixed="top" scrolling transparent>
              <MDBContainer>
                {/* <MDBNavbarBrand>
                  <strong className="white-text">MDB</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.handleTogglerClick} /> */}
                <MDBCollapse isOpen={this.state.collapsed} navbar>
                  {/* <MDBNavbarNav left>
                    <MDBNavItem active>
                      <MDBNavLink to="#!">Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="#!">Link</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="#!">Profile</MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav> */}
                  <MDBNavbarNav right>
                    <MDBNavItem>
                      <MDBFormInline waves>
                        <div className="md-form my-0">
                          <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                          />
                        </div>
                      </MDBFormInline>
                    </MDBNavItem>
                  </MDBNavbarNav>
                </MDBCollapse>
              </MDBContainer>
            </MDBNavbar>
            {this.state.collapsed && overlay}
          </div>
        </Router>
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>
                <div className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                  <h1 className="h1-responsive font-weight-bold mt-sm-5">
                    This is the homepage{" "}
                  </h1>
                  <hr className="hr-light" />
                  <Link className="text-primary" to="/company/login">
                    <MDBBtn color="info" onClick={() => this.loginViaCompany()}>Company</MDBBtn>
                  </Link>
                  <MDBBtnGroup>
                    <MDBDropdown rounded color="warning">
                      <MDBDropdownToggle caret color="primary">
                        Individual
                        </MDBDropdownToggle>
                      <MDBDropdownMenu basic color="primary">
                        <MDBDropdownItem onClick={() => this.loginViaIndividual(true)}>Contractor</MDBDropdownItem>
                        <MDBDropdownItem onClick={() => this.loginViaIndividual(false)}>Employee</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBBtnGroup>
                  {/* <Link className="text-primary" to="/individual/login">
                    <MDBBtn outline color="success">
                      Individual
                      </MDBBtn>
                  </Link> */}
                </div>
                {/* <MDBCol md="6" xl="5" className="mt-xl-5">
                  <img
                    src="https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png"
                    alt=""
                    className="img-fluid"
                  />
                </MDBCol> */}
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>

        <MDBContainer>
          <MDBRow className="py-5">
            <MDBCol md="12" className="text-center">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default HomePage;