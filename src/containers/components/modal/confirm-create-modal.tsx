import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner,
  MDBAlert
} from "mdbreact";

const ModalCreateConfirm = props => {
  const { show, modalClosed, isSuccess, modalSubmit, disabled } = props;
  return (
    <MDBContainer>
      <MDBModal
        modalStyle="info"
        centered
        className="text-white modal-confirm"
        size="sm"
        isOpen={show}
        toggle={modalClosed}
      >
        <MDBModalBody>
          <h5 className="work-break text-center">Do you want to change allocation for this account?</h5>
          {isSuccess ? <MDBAlert color="success">Update successfully!</MDBAlert> : null}
        </MDBModalBody>
        <MDBModalFooter className="justify-content-center">
          <MDBBtn color="primary" onClick={modalSubmit} disabled={disabled || isSuccess}>
            Yes {disabled ? <MDBSpinner small /> : null}
          </MDBBtn>
          <MDBBtn color="primary" outline onClick={() => modalClosed(true)}>
            No
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};
export default ModalCreateConfirm;
