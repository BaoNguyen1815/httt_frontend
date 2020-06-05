import TopNavComponent from "containers/components/layout/top-nav";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBRow } from "mdbreact";
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
          <section className="text-center my-5">
            <h2 className="h1-responsive font-weight-bold text-center my-5">Our bestsellers</h2>
            <p className="grey-text text-center w-responsive mx-auto mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident
              voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur veniam.
            </p>
            <MDBRow>
              <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
                <MDBCard cascade narrow ecommerce>
                  <MDBCardImage
                    cascade
                    src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/1.jpg"
                    top
                    alt="sample photo"
                    overlay="white-slight"
                  />
                  <MDBCardBody cascade className="text-center">
                    <a href="#!" className="grey-text">
                      <h5>Denim</h5>
                    </a>
                    <MDBCardTitle>
                      <strong>
                        <a href="#!">Denim trousers</a>
                      </strong>
                    </MDBCardTitle>
                    <ul className="rating">
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon far icon="star" />
                      </li>
                    </ul>
                    <MDBCardText>Neque porro quisquam est, qui dolorem ipsum quia dolor sit.</MDBCardText>
                    <hr />
                    <span className="float-left font-weight-bold">
                      <strong>49$</strong>
                    </span>
                    <span className="float-right">
                      <MDBIcon icon="shopping-cart" className="ml-10" />
                      <MDBIcon icon="share-alt" className="ml-10" />
                      <MDBIcon icon="heart" className="ml-10" />
                    </span>{" "}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
                <MDBCard cascade narrow ecommerce>
                  <MDBCardImage
                    cascade
                    src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/2.jpg"
                    top
                    alt="sample photo"
                    overlay="white-slight"
                  />
                  <MDBCardBody cascade className="text-center">
                    <a href="#!" className="grey-text">
                      <h5>Shoes</h5>
                    </a>
                    <MDBCardTitle>
                      <strong>
                        <a href="#!">High heels</a>
                      </strong>
                    </MDBCardTitle>
                    <ul className="rating">
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                    </ul>
                    <MDBCardText>Neque porro quisquam est, qui dolorem ipsum quia dolor sit.</MDBCardText>
                    <hr />
                    <span className="float-left font-weight-bold">
                      <strong>49$</strong>
                    </span>
                    <span className="float-right">
                      <MDBIcon icon="shopping-cart" className="ml-10" />
                      <MDBIcon icon="share-alt" className="ml-10" />
                      <MDBIcon icon="heart" className="ml-10" />
                    </span>{" "}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
                <MDBCard cascade narrow ecommerce>
                  <MDBCardImage
                    cascade
                    src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/4.jpg"
                    top
                    alt="sample photo"
                    overlay="white-slight"
                  />
                  <MDBCardBody cascade className="text-center">
                    <a href="#!" className="grey-text">
                      <h5>Outwear</h5>
                    </a>
                    <MDBCardTitle>
                      <strong>
                        <a href="#!">Brown coat</a>
                      </strong>
                    </MDBCardTitle>
                    <ul className="rating">
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon far icon="star-half" />
                      </li>
                    </ul>
                    <MDBCardText>Neque porro quisquam est, qui dolorem ipsum quia dolor sit.</MDBCardText>
                    <hr />
                    <span className="float-left font-weight-bold">
                      <strong>49$</strong>
                    </span>
                    <span className="float-right">
                      <MDBIcon icon="shopping-cart" className="ml-10" />
                      <MDBIcon icon="share-alt" className="ml-10" />
                      <MDBIcon icon="heart" className="ml-10" />
                    </span>{" "}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
                <MDBCard cascade narrow ecommerce>
                  <MDBCardImage
                    cascade
                    src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/3.jpg"
                    top
                    alt="sample photo"
                    overlay="white-slight"
                  />
                  <MDBCardBody cascade className="text-center">
                    <a href="#!" className="grey-text">
                      <h5>Blouses</h5>
                    </a>
                    <MDBCardTitle>
                      <strong>
                        <a href="#!">Shirt</a>
                      </strong>
                    </MDBCardTitle>
                    <ul className="rating">
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon icon="star" />
                      </li>
                      <li>
                        <MDBIcon far icon="star" />
                      </li>
                    </ul>
                    <MDBCardText>Neque porro quisquam est, qui dolorem ipsum quia dolor sit.</MDBCardText>
                    <hr />
                    <span className="float-left font-weight-bold">
                      <strong>49$</strong>
                    </span>
                    <span className="float-right">
                      <MDBIcon icon="shopping-cart" className="ml-10" />
                      <MDBIcon icon="share-alt" className="ml-10" />
                      <MDBIcon icon="heart" className="ml-10" />
                    </span>{" "}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </section>
        </MDBCol>
      </MDBRow>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ logInAction }, dispatch);

export default connect(null, mapDispatchToProps)(CartComponent);
