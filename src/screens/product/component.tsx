import TopNavComponent from "containers/components/layout/top-nav";
import { MDBBadge, MDBBtn, MDBCol, MDBIcon, MDBInput, MDBRow } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IProps, IState } from "./propState";
import { logInAction } from "./redux/actions";

class ProductComponent extends React.Component<IState, IProps> {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      repeat_password: "",
      flipped: false
    };
  }

  render() {
    return (
      <MDBRow>
        <MDBCol sm="12" md="12" lg="12" xl="12" className="mx-auto my-auto">
          <TopNavComponent />
          <MDBRow style={{ marginTop: 100 }}>
            <MDBCol sm="6" md="3" lg="3" xl="3"></MDBCol>
            <MDBCol sm="6" md="3" lg="3" xl="3">
              <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg"
                className="img-fluid"
                alt=""
              />
            </MDBCol>
            <MDBCol sm="6" md="3" lg="3" xl="3" style={{ marginLeft: 50 }}>
              <MDBRow>
                <MDBBadge color="secondary">Category</MDBBadge>
                <MDBBadge color="primary" className="ml-2">
                  New
                </MDBBadge>
              </MDBRow>
              <MDBRow className="mt-3">
                <strong style={{ textDecoration: "line-through" }}>$200</strong>
                <strong className="ml-2">$100</strong>
              </MDBRow>
              <MDBRow className="mt-3">
                <strong style={{ fontWeight: "bold" }}>Description</strong>
              </MDBRow>
              <MDBRow className="mt-3">
                <strong>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolor suscipit libero eos atque quia ipsa
                  sint voluptatibus! Beatae sit assumenda asperiores iure at maxime atque repellendus maiores quia
                  sapiente.
                </strong>
              </MDBRow>
              <MDBRow>
                <MDBInput outline value={this.state.username} style={{ height: 45, width: 100 }}>
                  {/* <MDBIcon icon="caret-up" />
                  <MDBIcon icon="caret-down" /> */}
                </MDBInput>
                <MDBBtn style={{ height: 45, marginTop: 23, marginLeft: 15 }} color="primary">
                  ADD TO CART <MDBIcon icon="shopping-cart" />
                </MDBBtn>
              </MDBRow>
            </MDBCol>
          </MDBRow>
          <hr style={{ width: 1000 }} />
          <MDBRow style={{ marginTop: 30 }}>
            <MDBCol sm="6" md="3" lg="3" xl="3"></MDBCol>
            <MDBCol sm="12" md="6" lg="6" xl="6" style={{ textAlign: "center" }}>
              <MDBRow className="mt-3">
                <strong style={{ fontWeight: "bold", textAlign: "center" }}>Additional information</strong>
              </MDBRow>
              <MDBRow className="mt-3">
                <strong>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolor suscipit libero eos atque quia ipsa
                  sint voluptatibus! Beatae sit assumenda asperiores iure at maxime atque repellendus maiores quia
                  sapiente.
                </strong>
              </MDBRow>
              <MDBRow style={{ marginTop: 40 }}>
                <MDBCol sm="6" md="3" lg="3" xl="3">
                  <img
                    src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/12.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </MDBCol>
                <MDBCol sm="6" md="3" lg="3" xl="3">
                  <img
                    src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/12.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </MDBCol>
                <MDBCol sm="6" md="3" lg="3" xl="3">
                  <img
                    src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/12.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </MDBCol>
                <MDBCol sm="6" md="3" lg="3" xl="3">
                  <img
                    src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/12.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol sm="12" md="6" lg="6" xl="6" style={{ marginTop: 50 }}></MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ logInAction }, dispatch);

export default connect(null, mapDispatchToProps)(ProductComponent);
