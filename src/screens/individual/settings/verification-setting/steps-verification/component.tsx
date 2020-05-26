import React from "react";
import { MDBContainer, MDBStepper, MDBStep, MDBBtn, MDBFileInput } from "mdbreact";
// @ts-ignore
import ComcastBill from "../../../../assets/images/verification-setting/comcast_bill_example.jpg";
// @ts-ignore
import GovIdFront from "../../../../assets/images/verification-setting/gov_id_front_example.jpg";
// @ts-ignore
import GovIdBack from "../../../../assets/images/verification-setting/govid_back_example.png";
import { checkFileType, getBase64 } from "containers/utils/utils";
import { IStateStepVerify } from "../propState";
import { connect } from "react-redux";

class VerificationStep extends React.Component<any, IStateStepVerify> {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      formActivePanel3: 1,
      formActivePanel1Changed: false,
      checked: true,
      category1: "idfront",
      textFieldTitle1: null,
      base64_image1: null,
      id_doc_type1: "PP",
      id_doc_issuing_country1: "USA",
      id_doc_number1: "103",
      category2: "idback",
      textFieldTitle2: null,
      base64_image2: null,
      id_doc_type2: "PP",
      id_doc_issuing_country2: "USA",
      id_doc_number2: "103",
      category3: "selfiewithid",
      textFieldTitle3: null,
      base64_image3: null,
      id_doc_type3: "PP",
      id_doc_issuing_country3: "USA",
      id_doc_number3: "103"
    };
  }

  onChangeHandleFile = categoryId => files => {
    const file = files[0];
    // const category = event.currentTarget.dataset.id;
    if (checkFileType(file.type, file.size)) {
      getBase64(file, result => {
        switch (categoryId) {
          case "idfront":
            this.setState({
              base64_image1: result,
              textFieldTitle1: file.name,
              checked: false
            });
            break;
          case "idback":
            this.setState({
              base64_image2: result,
              textFieldTitle2: file.name,
              checked: false
            });
            break;
          case "selfiewithid":
            this.setState({
              base64_image3: result,
              textFieldTitle3: file.name,
              checked: false
            });
            const data = {
              user_id: this.props.userInfo.user_id,
              category1: "idfront",
              base64_image1: this.state.base64_image1,
              id_doc_type1: "PP",
              id_doc_issuing_country1: "USA",
              id_doc_number1: "103",
              category2: "idback",
              base64_image2: this.state.base64_image2,
              id_doc_type2: "PP",
              id_doc_issuing_country2: "USA",
              id_doc_number2: "103",
              category3: "selfiewithid",
              base64_image3: this.state.base64_image3,
              id_doc_type3: "PP",
              id_doc_issuing_country3: "USA",
              id_doc_number3: "103"
            }
            this.props.parentCallback(false, data);
            break;
          default:
            break;
        }
      });
    } else {
      alert("Invalid format");
      this.props.parentCallback(true, null);
      this.setState({
        selectedFile: null
      });
    }
  };

  submitStep = (a, param) => {
    this.setState({
      ["formActivePanel" + a]: param,
      ["formActivePanel" + a + "Changed"]: true,
      checked: true
    });
  };

  handleNextPrevClick = a => param => () => {
    this.submitStep(a, param);
  };

  changeStepClick = a => param => () => {
    if (this.state["base64_image" + param] === null) {
      return;
    }
    this.submitStep(a, param);
  };

  render() {
    const { base64_image1, base64_image2, base64_image3, textFieldTitle1, textFieldTitle2, textFieldTitle3 } = this.state;
    return (
      <MDBContainer>
        <p>
          File Upload only supported on Chrome and Firefox. Pictures taken by mobile phone camera are fine if below 4mb
          and clear quality
          <label className="label-input">Accepted file types: PDF, PNG, or JPG</label>
        </p>
        <small>(please make sure letters, numbers, and barcode are clearly visible)</small>
        <MDBStepper className="step-verify" vertical>
          <MDBStep className="completed">
            <a onClick={this.changeStepClick(3)(1)}>
              <span className="circle">1</span>
              <span className="label">Step 1</span>
            </a>
            {this.state.formActivePanel3 === 1 && (
              <div className="step-content">
                <p className="step-subtitle">Proof of address</p>
                {/* <img src={ComcastBill} style={{ width: 350 }} alt="" /> */}
                <img src={base64_image1} style={{ width: 350 }} className="mb-10" alt="" />
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Doc Type</label>
                  <input type="text" className="form-control" placeholder="hard code PP" id="formGroupExampleInput" />
                  <label htmlFor="formGroupExampleInput">Issuing Country</label>
                  <input type="text" className="form-control" placeholder="hard code USA" id="formGroupExampleInput" />
                  <label htmlFor="formGroupExampleInput">Doc Number</label>
                  <input type="text" className="form-control" placeholder="hard code 103" id="formGroupExampleInput" />
                </div>
                <div className="form-group">
                  <MDBFileInput
                    reverse
                    textFieldTitle={textFieldTitle1 ? textFieldTitle1 : "No file chosen"}
                    className="m-0"
                    getValue={this.onChangeHandleFile("idfront")}
                  />
                </div>
                <div className="form-group">
                  <MDBBtn
                    disabled={this.state.base64_image1 === null}
                    id="btnSubmit1"
                    color="primary"
                    size="sm"
                    onClick={this.handleNextPrevClick(3)(2)}
                  >
                    Continue
                  </MDBBtn>
                </div>
              </div>
            )}
          </MDBStep>
          <MDBStep stepName="wer wer we" className="active">
            <a onClick={this.changeStepClick(3)(2)}>
              <span className="circle">2</span>
              <span className="label">Step 2</span>
            </a>
            {this.state.formActivePanel3 === 2 && (
              <div className="step-content">
                <p className="step-subtitle">Front of ID</p>
                <img src={base64_image2} style={{ width: 350 }} className="mb-10" alt="" />
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Doc Type</label>
                  <input type="text" className="form-control" placeholder="hard code PP" id="formGroupExampleInput" />
                  <label htmlFor="formGroupExampleInput">Issuing Country</label>
                  <input type="text" className="form-control" placeholder="hard code USA" id="formGroupExampleInput" />
                  <label htmlFor="formGroupExampleInput">Doc Number</label>
                  <input type="text" className="form-control" placeholder="hard code 103" id="formGroupExampleInput" />
                </div>
                <div className="form-group">
                  <MDBFileInput
                    reverse
                    textFieldTitle={textFieldTitle2 ? textFieldTitle2 : "No file chosen"}
                    className="m-0"
                    data-id={this.state.formActivePanel3}
                    getValue={this.onChangeHandleFile("idback")}
                  />
                </div>
                <div className="form-group">
                  <MDBBtn
                    disabled={this.state.base64_image2 === null}
                    id="btnSubmit1"
                    color="primary"
                    size="sm"
                    onClick={this.handleNextPrevClick(3)(3)}
                  >
                    Continue
                  </MDBBtn>
                </div>
              </div>
            )}
          </MDBStep>
          <MDBStep className="active">
            <a onClick={this.changeStepClick(3)(2)}>
              <span className="circle">3</span>
              <span className="label">Step 3</span>
            </a>
            {this.state.formActivePanel3 === 3 && (
              <div className="step-content">
                <p className="step-subtitle">Back of ID</p>
                <img src={base64_image3} style={{ width: 350 }} className="mb-10" alt="" />
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Doc Type</label>
                  <input type="text" className="form-control" placeholder="hard code PP" id="formGroupExampleInput" />
                  <label htmlFor="formGroupExampleInput">Issuing Country</label>
                  <input type="text" className="form-control" placeholder="hard code USA" id="formGroupExampleInput" />
                  <label htmlFor="formGroupExampleInput">Doc Number</label>
                  <input type="text" className="form-control" placeholder="hard code 103" id="formGroupExampleInput" />
                </div>
                <div className="form-group">
                  <MDBFileInput
                    reverse
                    textFieldTitle={textFieldTitle3 ? textFieldTitle3 : "No file chosen"}
                    className="m-0"
                    data-id={this.state.formActivePanel3}
                    getValue={this.onChangeHandleFile("selfiewithid")}
                  />
                </div>
                {/* <div className="form-group">
                  <MDBBtn
                    disabled={this.state.base64_image3 === null}
                    id="btnSubmit1"
                    color="primary"
                    size="sm"
                    onClick={this.handleNextPrevClick(3)(4)}
                  >
                    Continue
                  </MDBBtn>
                </div> */}
              </div>
            )}
          </MDBStep>
          {/* <MDBStep>
            <a>
              <span className="circle">4</span>
              <span className="label">Step 4</span>
            </a>
            {this.state.formActivePanel3 === 4 && (
              <div className="step-content">
                <p className="step-subtitle">Self of ID</p>
                <div className="form-group">
                  <MDBFileInput
                    reverse
                    textFieldTitle="No file chosen"
                    className="m-0"
                    data-id={this.state.formActivePanel3}
                    getValue={this.onChangeHandleFile}
                  />
                </div>
              </div>
            )}
          </MDBStep> */}
        </MDBStepper>
      </MDBContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    isLoading: state.common.isLoading,
    userInfo: state.user.userInfo,
  };
};

export default connect(mapStateToProps, null)(VerificationStep);

