import TopNavComponent from "containers/components/layout/top-nav";
import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IProps, IState } from "./propState";
import { logInAction } from "./redux/actions";

class CheckoutComponent extends React.Component<IState, IProps> {
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
              <strong style={{ fontWeight: "bold", fontSize: 30 }}>Checkout</strong>
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
              <MDBRow>
                <strong>Chọn hình thức giao hàng</strong>
                <MDBCol sm="12" md="12" lg="12" xl="12">
                  <MDBInput checked={true} label="Default unchecked" type="radio" id="radio1" />
                  <MDBInput label="Default unchecked" type="radio" id="radio1" />
                  <MDBInput label="Default unchecked" type="radio" id="radio1" />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <strong>Chọn hình thức thanh toán</strong>
                <MDBCol sm="12" md="12" lg="12" xl="12">
                  <MDBInput checked={true} label="Default unchecked" type="radio" id="radio1" />
                  <MDBInput label="Default unchecked" type="radio" id="radio1" />
                  <MDBInput label="Default unchecked" type="radio" id="radio1" />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol sm="12" md="12" lg="12" xl="12" style={{ marginTop: 20 }}>
                  <MDBBtn color="primary">Thanh toán</MDBBtn>
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
                <MDBCol sm="10" md="3" lg="3" xl="3">
                  <MDBInput label="Fullname" disabled />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol sm="10" md="3" lg="3" xl="3">
                  <MDBInput label="Username" disabled />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol sm="10" md="5" lg="5" xl="5">
                  <MDBInput label="Address" disabled />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <strong>Chọn hình thức giao hàng</strong>
                <MDBCol sm="10" md="5" lg="5" xl="5"></MDBCol>
              </MDBRow>
              <MDBRow>
                <strong>Chọn hình thức thanh toán</strong>
                <MDBCol sm="10" md="5" lg="5" xl="5"></MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ logInAction }, dispatch);

export default connect(null, mapDispatchToProps)(CheckoutComponent);
