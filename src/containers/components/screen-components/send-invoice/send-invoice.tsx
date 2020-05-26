import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBAvatar,
  MDBModalFooter,
  MDBBox
} from "mdbreact";

// import logo from '../../../../assets/images'; // with import

const sendInvoiceControl = props => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol sm="12" md="10" lg="6" className="mx-auto my-auto">
          <MDBModal size={props.data.modalOptionsStatus && !props.data.modalSendInvoiceStatus ? "md" : "lg" } isOpen={props.data.modalOptionsStatus} toggle={props.closeModal} position="center">
            {props.data.modalOptionsStatus && !props.data.modalSendInvoiceStatus ? (
              <>
                <MDBModalHeader toggle={props.closeModal}>Invoice successfully created</MDBModalHeader>
                <MDBModalBody style={{ textAlign: "center" }}>
                  <MDBRow>
                    <MDBCol size="12">
                      <p>Invoice number #123123213 created you can Download or send E-mail to Client!</p>
                    </MDBCol>
                    <MDBCol col="6">
                      <MDBBtn floating size="lg" gradient="peach">
                        <MDBIcon icon="file-pdf" />
                      </MDBBtn>
                      <p>
                        {" "}
                        <b>Download PDF</b>
                      </p>
                    </MDBCol>
                    <MDBCol col="6" onClick={props.toggleModalSendInvoice}>
                      <MDBBtn floating size="lg" gradient="peach">
                        <MDBIcon icon="envelope-open" />
                      </MDBBtn>
                      <p color="primary-color">
                        {" "}
                        <b>E-Mail to Client</b>
                      </p>
                    </MDBCol>
                  </MDBRow>
                </MDBModalBody>
                <MDBModalFooter className="justify-content-right">
                  <MDBBtn color="primary" outline onClick={() => props.closeModal(true)}>
                    Cancel
                  </MDBBtn>
                </MDBModalFooter>
              </>
            ) : props.data.modalSendInvoiceStatus && !props.data.modalPreviewInvoiceStatus ? (
              <>
                <MDBModalHeader toggle={props.closeModal}>Send Invoice</MDBModalHeader>
                <MDBModalBody className="send-invoice-modal">
                  <MDBCol col="12">
                    <form className="needs-validation" onSubmit={props.sendInvoice} noValidate>
                      <MDBInput label="From:" value="Dung Hoang" required disabled />
                      <MDBInput
                        label="To:"
                        className={props.data.emailValid === false ? "is-invalid" : props.data.emailValid ? "is-valid" : null}
                        value={props.data.email}
                        type="email"
                        name="email"
                        validate
                        error="wrong"
                        success="right"
                        required
                        onChange={() => props.dataChange(event)}
                      >
                        {props.data.emailValid ? null : (
                          <div className="invalid-feedback">{props.data.formErrors.email}</div>
                        )}
                      </MDBInput>
                      <p>
                        <b>Subject:</b> Invoice #123123 from Dung Hoang
                      </p>
                      <br />
                      <p>
                        <b>Message:</b>
                      </p>
                      <MDBInput
                        type="textarea"
                        label="Enter your message(optional)"
                        rows="2"
                        name="message"
                        onChange={() => props.dataChange(event)}
                      />
                      <div style={{ textAlign: "right" }}>
                        <MDBBtn outline color="primary" onClick={props.toggleModalPreviewInvoice}>
                          Preview
                        </MDBBtn>
                        <MDBBtn type="submit" color="primary" disabled={!props.data.emailValid}>
                          Send
                        </MDBBtn>
                      </div>
                    </form>
                  </MDBCol>
                </MDBModalBody>
              </>
            ) : (
                  <>
                    <MDBModalHeader toggle={props.closeModal} />
                    <MDBModalBody className="mt-4" style={{ textAlign: "center" }}>
                      <div style={{ textAlign: "center" }}>
                        <MDBAvatar
                          style={{ width: "30%", height: "30%", textAlign: "center" }}
                          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg"
                          className="rounded-circle mx-auto d-block"
                          alt="Your logo"
                        ></MDBAvatar>
                      </div>
                      <br />
                      <p>Dung Hoang</p>
                      <hr />
                      {props.data.message}
                      <MDBBox tag="p" className="email-invoice-preview">
                        <strong>This line rendered as bold text.</strong> rendered as bold text. <strong>This line rendered as bold text.</strong>
                      </MDBBox>
                      {/* Invoice for <h5> <b>[Currency + Total amount ]</b></h5>  due by <h5><b>[ due date ]</b></h5> */}
                      <br />
                      <div style={{ textAlign: "center" }}>
                        <MDBBtn color="primary">View Invoice</MDBBtn>
                      </div>
                      <br />
                      <div className="bitwage-info text-center">
                        <p>Powered by <img src="/assets/images/bitwage-logo.svg" alt="bitwage-logo"/></p>
                        <p>Leading crossdoarder and cryptocurrency powered payroll and invoicing. </p>
                        <p className="text-muted  my-3">© Bitwage Inc, 2014-2020 <a href="#"> Privacy Policy and Terms of use.  </a></p>
                      </div>
                    </MDBModalBody>
                  </>
                )}
          </MDBModal>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default sendInvoiceControl;
