// import SuccessComponent from "containers/components/alerts";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import ContainerComponent from "containers/components/layout/container";
import {
  MDBCard,
  MDBCardBody,
  MDBToastContainer,
  MDBRow,
  MDBCol,
  MDBAvatar,
  MDBFileInput,
  MDBAlert,
  MDBSelect,
  MDBInput,
  MDBBtn
} from "mdbreact";
import { IState, IProps } from "./propState";
import Cleave from "cleave.js/dist/cleave-react";
import "cropperjs/dist/cropper.css";
import { getBase64, validateField } from "containers/utils/utils";
import UploadLogo from "containers/components/screen-components/upload-logo/upload-logo";
import SendInvoice from "containers/components/screen-components/send-invoice/send-invoice";
import Cropper from "react-cropper";
import { getClient } from "../employers-clients/services";
import Skeleton from "react-loading-skeleton";
import InvoiceDescription from "./invoice-description";
import moment from "moment/moment";
import EditUserComponent from "../employers-clients/add-client-employer/component";
import { individualSetCurrentClientAction } from "../employers-clients/ducks/actions";
import { sendInvoiceAction } from "./ducks/actions";

const initialState = {
  currentClient: {},
  clientOptions: [],
  listClient: [],
  isOpen: false,
  isCheckedImage: null,
  base64_image: null,
  avt_image: null,
  isLoading: false,
  checkOption: {
    email: false,
    phone: false
  },
  detailInvoice: {
    invoice: "",
    invoiceDate: "",
    invoiceDueDate: ""
  },
  isEditUser: false,
  isSaveClient: false,
  modalOptionsStatus: false,
  modalSendInvoiceStatus: false,
  modalPreviewInvoiceStatus: false,
  formErrors: { email: "" },
  emailValid: null,
  formValid: false,
  email: "",
  message: ""
};
class CreateInvoiceComponent extends React.Component<IProps, IState> {
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return null;
  // }
  myCropper: Cropper;
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    this.setState(initialState);
    sessionStorage.setItem("invoiceWorkflow", null);
    if (this.props.clients.length === 0) {
      return;
    }
    this._getClientDetail();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.clients !== prevProps.clients) {
      this._getClientDetail();
    }
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState({ ...this.state, currentClient: this.props.currentUser });
    }
  }

  _getClientDetail = () => {
    if (this.props.clients && this.props.clients.length === 1) {
      this.getClientInfo(this.props.clients[0].client_id);
    } else {
      const clientOptions = this.formatDataOptions(this.props.clients);
      this.setState({ ...this.state, clientOptions });
    }
  };

  formatDataOptions = data => {
    const optData = [];
    data.forEach(item => {
      const element = {
        checked: false,
        text: item.name,
        value: item.client_id
      };
      optData.push(element);
    });
    return optData;
  };

  getClientInfo = async client_id => {
    if (this.state.isSaveClient) {
      return;
    }
    this.setState({ ...this.state, isLoading: true });
    const currentUser = await getClient(this.props.userInfo.user_id, client_id);
    if (currentUser) {
      this.props.individualSetCurrentClientAction(currentUser);
      this.setState({
        ...this.state,
        currentClient: currentUser,
        isLoading: false,
        isEditUser: true,
        isSaveClient: true
      });
    }
  };

  openUserProfile = () => {
    const invoiceWorkflow = {
      workFlow: "Profile"
    };
    sessionStorage.setItem("invoiceWorkflow", JSON.stringify(invoiceWorkflow));
    this.props.history.push("/individual/settings-page");
  };

  openClientInfo = () => {
    const invoiceWorkflow = {
      workFlow: "Client"
    };
    sessionStorage.setItem("invoiceWorkflow", JSON.stringify(invoiceWorkflow));
    this.props.history.push("/individual/clients-info");
  };

  _uploadPhoto = file => {
    if (file[0].type.toString().includes("image")) {
      getBase64(file[0], result => {
        this.setState({
          base64_image: result,
          isOpen: true,
          isCheckedImage: true
        });
      });
    } else {
      this.setState({
        isCheckedImage: false
      });
    }
  };

  toggleModal = () => {
    this.setState({
      isOpen: false
    });
  };

  toggleModalOptions = () => {
    this.setState({
      modalOptionsStatus: !this.state.modalOptionsStatus,
      modalSendInvoiceStatus: false
    });
  };

  toggleModalSendInvoice = () => {
    this.setState({
      modalSendInvoiceStatus: !this.state.modalSendInvoiceStatus
    });
  };

  toggleModalPreviewInvoice = () => {
    this.setState({
      modalPreviewInvoiceStatus: !this.state.modalPreviewInvoiceStatus
    });
  };

  closeModal = () => {
    this.setState({
      modalSendInvoiceStatus: false,
      modalOptionsStatus: false,
      modalPreviewInvoiceStatus: false
    });
  };

  handleChange = event => {
    this.setState(
      {
        ...this.state,
        [event.target.name]: event.target.value
      },
      () => {
        this.validate(event.target.type, event.target.value);
      }
    );
  };

  validateForm() {
    this.setState({ formValid: this.state.emailValid });
  }

  validate(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    const validate = validateField(fieldName, value);
    switch (fieldName) {
      case "email":
        emailValid = validate.filedValid;
        fieldValidationErrors.email = validate.fieldValidationErrors;
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid
      },
      this.validateForm
    );
  }

  sendInvoice = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";
    const state = { ...this.state };
    if (this.state.email === "") {
      state.formErrors.email = "Email is required.";
    }
    this.setState(state);
    if (!this.state.formValid) {
      return;
    }
    this.props.sendInvoiceAction("DungHoang", this.state.email, "Invoice #", this.state.message);
  };

  saveCroppedImage = () => {
    const file = this.myCropper.getCroppedCanvas().toDataURL("image/jpeg");
    this.setState(
      {
        isOpen: false,
        avt_image: file
      },
      async () => { }
    );
  };

  handleSelectChange = async value => {
    if (value.length !== 0) {
      await this.setState({ ...this.state, isSaveClient: false });
      this.getClientInfo(value[0]);
    }
  };
  handleCheckChange = target => {
    if (target.id === "check-mail") {
      this.setState(state => ({ checkOption: { ...state.checkOption, email: !state.checkOption.email } }));
    } else if (target.id === "check-phone") {
      this.setState(state => ({ checkOption: { ...state.checkOption, phone: !state.checkOption.phone } }));
    }
  };

  checkFormatDetailInvoice = target => {
    if (target.name === "invoice") {
      if (target.value.length <= 11) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  handleDetailInvoiceChange = target => {
    if (this.checkFormatDetailInvoice(target)) {
      this.setState(state => ({ detailInvoice: { ...state.detailInvoice, [target.name]: target.value } }));
    }
  };
  hideModal = () => {
    this.setState({ isEditUser: false });
  };

  public render() {
    const { userDetail, clients, bankAndWalletAccounts } = this.props;
    const { currentClient, isCheckedImage, isEditUser, modalOptionsStatus, isOpen } = this.state;
    const currentTime = moment(new Date()).format("YYYY-MM-DD");
    const SendInvoiceModal = modalOptionsStatus ? (
      <SendInvoice
        data={this.state}
        toggleModalOptions={this.toggleModalOptions}
        toggleModalSendInvoice={this.toggleModalSendInvoice}
        toggleModalPreviewInvoice={this.toggleModalPreviewInvoice}
        closeModal={this.closeModal}
        dataChange={this.handleChange}
        sendInvoice={this.sendInvoice}
      />
    ) : null;

    const UploadLogoModal = isOpen ? (
      <UploadLogo
        data={this.state}
        cropper={input => (this.myCropper = input)}
        toggleModal={this.toggleModal}
        saveCroppedImage={this.saveCroppedImage}
      />
    ) : null;

    const mainStyle = {
      margin: "0 10%",
      paddingTop: "5.5rem"
    };
    const isCompleteProfile =
      userDetail &&
      userDetail.street_address !== "0" &&
      userDetail.city !== "0" &&
      userDetail.country !== "0" &&
      userDetail.user_state !== "0" &&
      userDetail.zip !== "0";
    const isBankDetail = bankAndWalletAccounts.length !== 0 && clients.length !== 0;
    const editClientModal = isEditUser ? (
      <EditUserComponent show={isEditUser} userData={currentClient} isEmployer={false} modalClosed={this.hideModal} />
    ) : null;
    return (
      <ContainerComponent>
        {SendInvoiceModal}
        {UploadLogoModal}
        <MDBToastContainer className="toast-content" hideProgressBar={true} newestOnTop={true} autoClose={3000} />
        {editClientModal}
        <main style={mainStyle} className="create-invoice">
          <MDBCard>
            <MDBCardBody>
              <div className="invoice-detail">
                <MDBAlert color="danger">
                  Complete Verification if you wish to create an invoice for more than $1,000.
                </MDBAlert>
                <MDBAlert color="success">Your account has been successfully verified.</MDBAlert>
                <br />
                <MDBRow>
                  <MDBCol size="7">
                    <MDBRow>
                      <MDBCol size="7">
                        <h4 className="h4-responsive">Invoice #124190</h4>
                      </MDBCol>
                      <MDBCol size="4">
                        <MDBInput
                          label="Invoice"
                          value={this.state.detailInvoice.invoice}
                          name="invoice"
                          onChange={(e: any) => this.handleDetailInvoiceChange(e.target)}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-4">
                      <MDBCol size="7">
                        <h5 className="h5-responsive">Invoice date (mm/dd/yyyy):</h5>
                      </MDBCol>
                      <MDBCol size="4">
                        <Cleave
                          className="date-type valid-until invoice-date"
                          placeholder="MM/DD/YYYY"
                          options={{
                            dateMax: currentTime,
                            date: true,
                            datePattern: ["m", "d", "Y"]
                          }}
                          value={this.state.detailInvoice.invoiceDate}
                          onChange={(e: any) => this.handleDetailInvoiceChange(e.target)}
                          name="invoiceDate"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-4">
                      <MDBCol size="7">
                        <h5 className="h5-responsive">Payment due date (mm/dd/yyyy):</h5>
                      </MDBCol>
                      <MDBCol size="4">
                        <Cleave
                          className="date-type valid-until invoice-date"
                          placeholder="MM/DD/YYYY"
                          options={{
                            dateMin: currentTime,
                            date: true,
                            datePattern: ["m", "d", "Y"]
                          }}
                          value={this.state.detailInvoice.invoiceDueDate}
                          onChange={(e: any) => this.handleDetailInvoiceChange(e.target)}
                          name="invoiceDueDate"
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol size="5" className="logo-invoice">
                    <MDBCard testimonial>
                      <MDBAvatar className="mx-auto white">
                        <img
                          src={
                            this.state.avt_image
                              ? this.state.avt_image
                              : "https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg"
                          }
                          alt=""
                        />
                      </MDBAvatar>
                      <MDBCardBody>
                        <MDBFileInput
                          className="upload-logo"
                          btnTitle="upload your logo"
                          getValue={this._uploadPhoto}
                        />
                        {isCheckedImage === false ? (
                          <MDBAlert color="danger" className="text-center w-100 mt-20">
                            The uploaded file must be image
                          </MDBAlert>
                        ) : null}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
                <br />
                <MDBRow>
                  <MDBCol size="5">
                    <MDBRow className="mb-20">
                      <MDBCol size="5">
                        <strong>Invoice From:</strong>
                      </MDBCol>
                    </MDBRow>
                    {!isCompleteProfile ? (
                      <div className="is-greyed-out">
                        <p className="note note-secondary" onClick={this.openUserProfile}>
                          <strong>Complete your Profile</strong>, please complete you profile before create invoice!
                        </p>
                        <br />
                        <MDBInput
                          label="Include my email"
                          filled
                          type="checkbox"
                          id="checkbox1"
                          containerClass="mr-5"
                        />
                        <MDBInput
                          label="Include my phone number"
                          filled
                          type="checkbox"
                          id="checkbox2"
                          containerClass="mr-5"
                        />
                      </div>
                    ) : (
                        <div>
                          <p>
                            {userDetail.first_name}, {userDetail.last_name}{" "}
                          </p>
                          <p>{userDetail.street_address}</p>
                          <p>
                            {userDetail.zip}, {userDetail.city}
                          </p>
                          <p>
                            {userDetail.user_state}, {userDetail.country}
                          </p>
                          {this.state.checkOption.email ? <p>{userDetail.email}</p> : null}
                          {this.state.checkOption.phone ? <p>+ {userDetail.phone_number}</p> : null}
                          <br />
                          <MDBInput
                            label="Include my email"
                            filled
                            type="checkbox"
                            id="check-mail"
                            containerClass="mr-5"
                            checked={this.state.checkOption.email}
                            onChange={e => this.handleCheckChange(e.target)}
                          />
                          <MDBInput
                            label="Include my phone number"
                            filled
                            type="checkbox"
                            id="check-phone"
                            containerClass="mr-5"
                            checked={this.state.checkOption.phone}
                            onChange={e => this.handleCheckChange(e.target)}
                          />
                        </div>
                      )}
                  </MDBCol>
                  <MDBCol size="2" />
                  <MDBCol size="5">
                    <MDBRow className="mb-20">
                      <MDBCol size="3">
                        <strong>Invoice To:</strong>{" "}
                      </MDBCol>
                      <MDBCol size="9">
                        <MDBSelect
                          className="select-client-invoice"
                          options={this.state.clientOptions}
                          selected="Select Client"
                          color="primary"
                          label="Select Client"
                          getValue={event => this.handleSelectChange(event)}
                          hidden={clients.length <= 1}
                        />
                      </MDBCol>
                    </MDBRow>
                    {clients.length === 0 ? (
                      <div className="is-greyed-out">
                        <p className="note note-secondary" onClick={this.openClientInfo}>
                          <strong>Add a Client</strong>, please add a Client before create invoice!
                        </p>
                      </div>
                    ) : (
                        <>
                          <div hidden={!currentClient.client_id || this.state.isLoading}>
                            <p>{currentClient.name}</p>
                            <p>{currentClient.street}</p>
                            <p>
                              {currentClient.zip}, {currentClient.city}
                            </p>
                            <p>
                              {currentClient.state}, {currentClient.country}
                            </p>
                          </div>
                          <div hidden={!this.state.isLoading}>
                            <Skeleton height={25} count={4} />
                          </div>
                        </>
                      )}
                  </MDBCol>
                </MDBRow>
                <br />
                <hr />
                <br />
                <MDBRow>
                  <MDBCol size="12">
                    <InvoiceDescription checkValidForm={value => console.log(value)} currentClient={currentClient} />
                  </MDBCol>
                </MDBRow>
                <br />
                <MDBRow>
                  <MDBCol size="6">
                    <p className="mb-20">
                      <strong>Bank Details:</strong>
                    </p>
                    {isBankDetail && isCompleteProfile ? (
                      <div>
                        <p>{currentClient.name}</p>
                        <p>{currentClient.street}</p>
                        <p>
                          {currentClient.zip}, {currentClient.city}
                        </p>
                        <p>
                          {currentClient.state}, {currentClient.country}
                        </p>
                      </div>
                    ) : (
                        <div className="is-greyed-out">
                          <div className="note note-secondary">
                            Unique Bitwage bank account will be generated once you add at least ONE ALLOCATION and
                            CLIENT.!
                          <br />
                            {bankAndWalletAccounts.length === 0 && <p>Add Bank Account</p>}
                            {clients.length === 0 && <p>Add Client</p>}
                            {!isCompleteProfile && <p>Complete your Profile</p>}
                          </div>
                        </div>
                      )}
                  </MDBCol>
                </MDBRow>
                <br/>  
                <MDBCol size="12" className="btn-create-invoice">
                  <MDBBtn col="12" color="primary" onClick={this.toggleModalOptions}>
                    Preview Invoice
                  </MDBBtn>
                  <MDBBtn col="12" color="primary" onClick={this.toggleModalOptions}>
                    Send Invoice
                  </MDBBtn>
                </MDBCol>
              </div>
            </MDBCardBody>
          </MDBCard>
        </main>
      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.common.errorMessShow,
    errorMess: state.common.errMess,
    isLoading: state.common.isLoading,
    userInfo: state.user.userInfo,
    userDetail: state.user.userDetail,
    isSuccess: state.common.isSuccess,
    employers: state.screen.individualUser.listBpiContracts.employers,
    clients: state.screen.individualUser.listBpiContracts.clients,
    currentUser: state.screen.individualUser.currentUser,
    bankAndWalletAccounts: state.screen.bankAndWalletAccounts.listBankAndWalletAccounts
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ individualSetCurrentClientAction, sendInvoiceAction }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreateInvoiceComponent);
