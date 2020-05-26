import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBSpinner,
  MDBAlert
} from "mdbreact";

const ModalConfirm = props => {
  const { show, modalClosed, modalContent, isSuccess, modalSubmit, disabled, content1, content2 } = props;
  return (
    <MDBContainer>
      <MDBModal
        modalStyle="danger"
        centered
        className="text-white modal-confirm"
        size="sm"
        isOpen={show}
        toggle={modalClosed}
      >
        <MDBModalHeader className="text-center" titleClass="w-100" tag="p">
          Confirmation 
        </MDBModalHeader>
        <MDBModalBody>
          <h5 className="work-break">{modalContent}</h5>
          {content1 ? <h5 className="work-break">{content1}</h5> : null}
          {content2 ? <h5 className="work-break">{content2}</h5> : null}
          {isSuccess ? <MDBAlert color="success">Update successfully!</MDBAlert> : null}
        </MDBModalBody>
        <MDBModalFooter className="justify-content-center">
          <MDBBtn color="danger" onClick={modalSubmit} disabled={disabled || isSuccess}>
            Yes {disabled ? <MDBSpinner small /> : null}
          </MDBBtn>
          <MDBBtn color="danger" outline onClick={modalClosed}>
            No
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};
export default ModalConfirm;
