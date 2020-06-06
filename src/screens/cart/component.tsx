import TopNavComponent from "containers/components/layout/top-nav";
import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IProps, IState } from "./propState";
import { logInAction } from "./redux/actions";

class CartComponent extends React.Component<IState, IProps> {
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
          <MDBRow style={{ margin: 50 }}>
            <MDBCol sm="12" md="12" lg="12" xl="12" style={{ textAlign: "center" }}>
              <strong style={{ fontWeight: "bold", fontSize: 30 }}>Giỏ hàng</strong>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol sm="4" md="2" lg="2" xl="2"></MDBCol>
            <MDBCol
              sm="12"
              md="5"
              lg="5"
              xl="5"
              style={{ backgroundColor: "#fff", border: "0.5px solid grey", padding: 30, borderRadius: 8 }}
            >
              <MDBRow>
                <MDBCol sm="12" md="12" lg="12" xl="12">
                  <MDBInput label="Fullname" disabled />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol sm="12" md="12" lg="12" xl="12">
                  <MDBInput label="Username" disabled />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol sm="12" md="12" lg="12" xl="12">
                  <MDBInput label="Address" disabled />
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol
              sm="12"
              md="3"
              lg="3"
              xl="3"
              style={{
                backgroundColor: "#fff",
                border: "0.5px solid grey",
                padding: 30,
                borderRadius: 8,
                marginLeft: 20
              }}
            >
              <MDBRow>
                <MDBCol sm="12" md="6" lg="6" xl="6">
                  Tạm tính:
                </MDBCol>
                <MDBCol sm="12" md="6" lg="6" xl="6">
                  155000 VND
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="12" md="6" lg="6" xl="6">
                  Thành tiền:
                </MDBCol>
                <MDBCol sm="12" md="6" lg="6" xl="6">
                  <strong style={{ color: "red", fontSize: 24 }}>155000 VND</strong>
                  <br />
                  <i style={{ fontSize: 12 }}>(Đã bao gồm VAT nếu có)</i>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol sm="12" md="12" lg="12" xl="12" style={{ marginTop: 20 }}>
                  <MDBBtn color="danger">Tiến hành đặt hàng</MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ logInAction }, dispatch);

export default connect(null, mapDispatchToProps)(CartComponent);
