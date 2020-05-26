import { MDBCol, MDBContainer, MDBFileInput, MDBRow, MDBSimpleChart, MDBSpinner, MDBAlert, MDBIcon } from "mdbreact";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { uploadDocumentTypeAction, addUserAdvanceAction, getProfileAdvanceAction, setUserAdvanceAction } from "./ducks/actions";
import { checkFileType, getBase64 } from "containers/utils/utils";
import { GOVERNMENT_TYPE } from "containers/contants";
import { IProps, IStateVerification } from "./propState";
import { getLinkImage } from "../services";
import { offSuccessAction } from "../../../../containers/redux/actions";
import { uploadIDsByType } from "screens/company/settings/services";
class VerificationSettingControls extends Component<IProps, IStateVerification, any> {
  static getDerivedStateFromProps(nextProps, prevState) {
    const obj = {
      userAdvance: null,
      isIdfront: true,
      isIdback: true,
      isSelf: true,
      isProo: true
    };
    if (nextProps.userAdv !== prevState.userAdvance) {
      if (nextProps.userAdv) {
        const kyc = [...nextProps.userAdv.kyc_images];
        kyc.forEach(item => {
          switch (item.category) {
            case "idfront":
              obj.isIdfront = false;
              break;
            case "idback":
              obj.isIdback = false;

              break;
            case "selfiewithid":
              obj.isSelf = false;

              break;
            case "proofofresidency":
              obj.isProo = false;

              break;
          }
        });
      }
      obj.userAdvance = nextProps.userAdv;
      return obj;
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      collapseID: "",
      selectedFile: null,
      options: GOVERNMENT_TYPE,
      userAdvance: null,
      checked: null,
      category: "",
      base64_image: null,
      category1: "idfront",
      base64_image1: null,
      isIdfront: true,
      category2: "idback",
      base64_image2: null,
      isIdback: true,
      category3: "selfiewithid",
      base64_image3: null,
      isSelf: true,
      category4: "proofofresidency",
      base64_image4: null,
      isProo: true,
      countFile: 0,
      isDisabled: true,
      isLoadingUpload: false,
      uploadSuccess: false,
      uploadFalse: false
    };
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  handleSelectChange = event => {
    this.setState({ ...this.state, category: event[0] });
  };

  async componentDidMount() {
    this.props.getProfileAdvanceAction(this.props.userInfo.user_id);
  }

  formatData = async () => {
    const countFile = [];
    const state = { ...this.state };
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        const element = state[key];
        if (key.indexOf("base64_image") !== -1) {
          if (element) {
            const file = {
              key: element,
              character: key.substr(key.length - 1)
            };
            countFile.push(file);
          }
        }
      }
    }
    console.log("countFile", countFile);
    if (countFile.length <= 3) {
      this.setState({ ...this.state, checked: false, isDisabled: true });
      return;
    }
    await this.setState({ ...this.state, checked: false, isDisabled: false });
  };

  uploadDocByType = async event => {
    const countFile = [];
    event.preventDefault();
    this.props.offSuccessAction("", false);
    await this.setState({ ...this.state, checked: false, isLoadingUpload: false, uploadSuccess: false, uploadFalse: false });
    const state = { ...this.state };
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        const element = state[key];
        if (key.indexOf("base64_image") !== -1) {
          if (element) {
            const file = {
              key: element,
              character: key.substr(key.length - 1)
            };
            countFile.push(file);
          }
        }
      }
    }

    if (countFile.length === 0) {
      this.setState({ ...this.state, checked: true });
      return;
    }

    // if (countFile.length > 1) {

    if (countFile.length < 3) {
      this.setState({ ...this.state, checked: true });
      return;
    }
    // multiple upload
    const data = {
      user_id: this.props.userInfo.user_id,
      category1: this.state.category1,
      base64_image1: this.state.base64_image1,
      category2: this.state.category2,
      base64_image2: this.state.base64_image2,
      category3: this.state.category3,
      base64_image3: this.state.base64_image3,
      category4: this.state.category4,
      base64_image4: this.state.base64_image4
    };

    if (this.state.userAdvance.kyc_images && this.state.userAdvance.kyc_images.length !== 0) {
      // const useAdv = [
      //   {
      //     user_id: this.props.userInfo.user_id,
      //     category: this.state.category1,
      //     base64_image: this.state.base64_image1
      //   },
      //   {
      //     user_id: this.props.userInfo.user_id,
      //     category: this.state.category2,
      //     base64_image: this.state.base64_image2
      //   },
      //   {
      //     user_id: this.props.userInfo.user_id,
      //     category: this.state.category3,
      //     base64_image: this.state.base64_image3
      //   },
      //   {
      //     user_id: this.props.userInfo.user_id,
      //     category: this.state.category4,
      //     base64_image: this.state.base64_image4
      //   }
      // ];
      const idfront = {
        user_id: this.props.userInfo.user_id,
        category: this.state.category1,
        base64_image: this.state.base64_image1
      }
      const idback = {
        user_id: this.props.userInfo.user_id,
        category: this.state.category2,
        base64_image: this.state.base64_image2
      }
      const selfiewithid = {
        user_id: this.props.userInfo.user_id,
        category: this.state.category3,
        base64_image: this.state.base64_image3
      }
      const proofofresidency = {
        user_id: this.props.userInfo.user_id,
        category: this.state.category4,
        base64_image: this.state.base64_image4
      }
      this.setState({ ...this.state, isLoadingUpload: true });
      const resIdFont = await uploadIDsByType(idfront);
      const resIdBank = await uploadIDsByType(idback);
      const resSelfie = await uploadIDsByType(selfiewithid);
      const resProofo = await uploadIDsByType(proofofresidency);
      this.setState({ ...this.state, isLoadingUpload: false });
      if (resIdFont && resIdBank && resSelfie && resProofo) {
        this.setState({ ...this.state, uploadSuccess: true });
      } else {
        this.setState({ ...this.state, uploadFalse: true });
      }
      // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      // const parameterArr = [idfront, idback, selfiewithid, proofofresidency];
      // parameterArr.reduce(function (promise, item) {
      //   return promise.then(function () {
      //     return Promise.all([delay(100), uploadIDsByType(item)]);
      //   })
      // }, Promise.resolve())
      console.log("---------------", resIdFont, resIdBank, resSelfie, resProofo);
    } else {
      console.log("multiple upload");
      this.props.addUserAdvanceAction(data);
    }

    // } else {
    //   // single upload
    //   console.log("single upload");
    //   if (countFile.length === 0) {
    //     this.setState({ ...this.state, isSelectImage: false });
    //     return;
    //   }
    //   const lastChar = countFile[0].character;
    //   const user_adv = {
    //     user_id: this.props.userInfo.user_id,
    //     category: this.state["category" + lastChar],
    //     base64_image: this.state["base64_image" + lastChar]
    //   };
    //   this.props.uploadDocumentTypeAction(user_adv);
    // }
  };

  onChangeHandleFile = categoryId => files => {
    const file = files[0];
    // const category = event.currentTarget.dataset.id;
    if (checkFileType(file.type, file.size)) {
      getBase64(file, result => {
        if (!result) {
          alert("Invalid format");
          this.setState({
            selectedFile: null,
            isDisabled: true
          });
          return;
        }
        switch (categoryId) {
          case "idfront":
            this.setState({
              base64_image1: result
            });
            break;
          case "idback":
            this.setState({
              base64_image2: result
            });
            break;
          case "selfiewithid":
            this.setState({
              base64_image3: result
            });
            break;
          case "proofofresidency":
            this.setState({
              base64_image4: result
            });
            break;
        }
      });
    } else {
      alert("Invalid format");
      this.setState({
        selectedFile: null,
        isDisabled: true
      });
    }
    setTimeout(() => {
      this.formatData();
    }, 500);
  };

  handleClick = async category => {
    console.log(category);
    let imageId = null;
    if (this.props.userAdv && this.props.userAdv.kyc_images) {
      const kyc = [...this.props.userAdv.kyc_images];
      console.log("kyc", kyc);
      kyc.forEach(item => {
        if (item.category === category) {
          imageId = item.image_id;
        }
      });
    }
    if (imageId) {
      let newTab = window.open();
      const results = await getLinkImage(imageId, this.props.userInfo.user_id);
      newTab.document.body.innerHTML = `<img src="${results.content}">`;
    }
  };

  render() {
    return (
      <MDBContainer fluid className="md-accordion mt-5">
        <MDBRow>
          <MDBCol md="4">
            <div className="d-flex align-items-center justify-content-center pt-2">
              <MDBSimpleChart
                width={250}
                height={250}
                strokeWidth={8}
                percent={56}
                strokeColor="#4FB64E"
                labelFontWeight="300"
                labelColor="#000"
              />
            </div>
            <div className="text-center mt-3">
              <p>
                Currently you can make transactions of up to $1,000 per year. Verify for identity when you're
                approaching th limit to unlock it!
              </p>
            </div>
          </MDBCol>
          <MDBCol md="8">
            {/* <TimeLineVerification /> */}
            <div>
              {/* <ModalPage /> */}
              <form className="form-upload-kyc">
                <MDBRow>
                  <MDBCol md="3">
                    <h5>Proof of address</h5>
                    <p>(utility bill, bank statement, other supporting document)</p>
                  </MDBCol>
                  <MDBCol md="7">
                    <MDBFileInput
                      textFieldTitle={this.state.isProo ? "No file chosen" : "Uploaded"}
                      className="m-0"
                      getValue={this.onChangeHandleFile("proofofresidency")}
                    />
                  </MDBCol>
                  <MDBCol md="2">
                    <MDBIcon
                      hidden={this.state.isProo}
                      far
                      size="lg"
                      icon="eye"
                      className="mt-40"
                      color="primary-color"
                      onClick={() => {
                        this.handleClick("proofofresidency");
                      }}
                    />
                  </MDBCol>
                  <MDBCol md="3">
                    <h5 style={{ marginTop: 35 }}>Front of ID</h5>
                  </MDBCol>
                  <MDBCol md="7">
                    <MDBFileInput
                      textFieldTitle={this.state.isIdfront ? "No file chosen" : "Uploaded"}
                      className="m-0"
                      getValue={this.onChangeHandleFile("idfront")}
                    />
                  </MDBCol>
                  <MDBCol md="2">
                    <MDBIcon
                      hidden={this.state.isIdfront}
                      far
                      size="lg"
                      icon="eye"
                      className="mt-40"
                      color="primary-color"
                      onClick={() => {
                        this.handleClick("idfront");
                      }}
                    />
                  </MDBCol>
                  <MDBCol md="3">
                    <h5 style={{ marginTop: 35 }}>Back of ID</h5>
                  </MDBCol>
                  <MDBCol md="7">
                    <MDBFileInput
                      textFieldTitle={this.state.isIdback ? "No file chosen" : "Uploaded"}
                      className="m-0"
                      getValue={this.onChangeHandleFile("idback")}
                    />
                  </MDBCol>
                  <MDBCol md="2">
                    <MDBIcon
                      hidden={this.state.isIdback}
                      far
                      size="lg"
                      icon="eye"
                      className="mt-40"
                      color="primary-color"
                      onClick={() => {
                        this.handleClick("idback");
                      }}
                    />
                  </MDBCol>
                  <MDBCol md="3">
                    <h5 style={{ marginTop: 35 }}>Self with ID</h5>
                  </MDBCol>
                  <MDBCol md="7">
                    <MDBFileInput
                      textFieldTitle={this.state.isSelf ? "No file chosen" : "Uploaded"}
                      className="m-0"
                      getValue={this.onChangeHandleFile("selfiewithid")}
                    />
                  </MDBCol>
                  <MDBCol md="2">
                    <MDBIcon
                      hidden={this.state.isSelf}
                      far
                      size="lg"
                      icon="eye"
                      className="mt-40"
                      color="primary-color"
                      onClick={() => {
                        this.handleClick("selfiewithid");
                      }}
                    />
                  </MDBCol>
                  <MDBCol md="10">
                    {this.props.isSuccess || this.state.uploadSuccess ? (
                      <MDBAlert color="success" className="alert-label" dismiss>
                        File upload Successfully!
                      </MDBAlert>
                    ) : null}
                    {this.props.error || this.state.uploadFalse ? (
                      <MDBAlert color="danger" className="alert-label" dismiss>
                        Upload failed! please check the size and type of your file!
                      </MDBAlert>
                    ) : null}
                    {this.state.checked ? (
                      <MDBAlert color="warning" className="alert-label" dismiss>
                        You should select all field!
                      </MDBAlert>
                    ) : null}
                  </MDBCol>
                  <MDBCol md="3" />
                  <MDBCol md="7" className="float-right pull-right">
                    <div className="form-group">
                      <button
                        className="btn btn-primary float-right"
                        style={{ position: "relative" }}
                        disabled={this.props.isLoading || this.state.isDisabled || this.state.isLoadingUpload}
                        onClick={this.uploadDocByType}
                      >
                        Submit for approval
                        {this.props.isLoading || this.state.isLoadingUpload ? <MDBSpinner small /> : null}
                      </button>
                    </div>
                  </MDBCol>
                </MDBRow>
              </form>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    isLoading: state.common.isLoading,
    userInfo: state.user.userInfo,
    userAdv: state.screen.setting.userVerify.userAdv,
    isSuccess: state.common.isSuccess,
    successMessage: state.common.successMessage
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getProfileAdvanceAction, uploadDocumentTypeAction, setUserAdvanceAction, addUserAdvanceAction, offSuccessAction },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(VerificationSettingControls);
