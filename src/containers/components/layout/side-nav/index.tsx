import { MDBIcon, MDBSideNav, MDBSideNavCat, MDBSideNavLink, MDBSideNavNav } from "mdbreact";
import React from "react";

export default class SideNavComponent extends React.Component {
  state = {
    isOpen: false
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  public render() {
    return (
      <MDBSideNav
        logo="https://mdbootstrap.com/img/logo/mdb-transparent.png"
        hidden={false}
        // breakWidth={1300}
        className="deep-blue darken-3"
        fixed
        responsive={true}
      >
        <li>
          <ul className="social">
            <li>
              <a href="#!">
                <MDBIcon fab icon="facebook-f" />
              </a>
            </li>
            <li>
              <a href="#!">
                <MDBIcon fab icon="pinterest" />
              </a>
            </li>
            <li>
              <a href="#!">
                <MDBIcon fab icon="google-plus-g" />
              </a>
            </li>
            <li>
              <a href="#!">
                <MDBIcon fab icon="twitter" />
              </a>
            </li>
          </ul>
        </li>
        <MDBSideNavNav>
          <MDBSideNavLink to="/dashboard" topLevel>
            <MDBIcon icon="home" className="mr-2" />
            Phần mềm hỗ trợ quản lý cửa hàng
          </MDBSideNavLink>
          <MDBSideNavCat name="Quản lý bán hàng" id="store" icon="store-alt">
            <MDBSideNavLink icon="store-alt" to="/dashboard/item">
              Quản lý sản phẩm bán
            </MDBSideNavLink>
            <MDBSideNavLink to="/dashboard/order">Quản lý loại đơn hàng</MDBSideNavLink>
            <MDBSideNavLink to="/dashboard/payment">Quản lý phương thức thanh toán</MDBSideNavLink>
            <MDBSideNavLink to="/dashboard/shipping">Quản lý loại đơn vị vận chuyển</MDBSideNavLink>
          </MDBSideNavCat>
          <MDBSideNavCat name="Quản lý kho" id="warehouse" icon="warehouse" href="#">
            <MDBSideNavLink to="/dashboard/product">Quản lý sản phẩm nhập</MDBSideNavLink>
            <MDBSideNavLink to="/dashboard/item">Quản lý sản phẩm xuất</MDBSideNavLink>
            <MDBSideNavLink to="/dashboard/category">Quản lý thể loại sản phẩm</MDBSideNavLink>
          </MDBSideNavCat>
          <MDBSideNavCat name="Quản lý người dùng" id="user" icon="user" href="#">
            <MDBSideNavLink to="/dashboard/user">Quản lý người dùng</MDBSideNavLink>
            <MDBSideNavLink to="/dashboard/customer">Quản lý khách hàng</MDBSideNavLink>
          </MDBSideNavCat>
          <MDBSideNavCat name="Thống kê" id="stats" icon="chart-bar" href="#">
            <MDBSideNavLink to="/stats">Thống kê</MDBSideNavLink>
          </MDBSideNavCat>
          <MDBSideNavCat name="About" id="about" icon="eye">
            <MDBSideNavLink>Instruction</MDBSideNavLink>
            <MDBSideNavLink>Monthly meetings</MDBSideNavLink>
          </MDBSideNavCat>
          <MDBSideNavCat name="Contact me" id="contact-me" icon="envelope">
            <MDBSideNavLink>FAQ</MDBSideNavLink>
            <MDBSideNavLink>Write a message</MDBSideNavLink>
          </MDBSideNavCat>
        </MDBSideNavNav>
      </MDBSideNav>
    );
  }
}
