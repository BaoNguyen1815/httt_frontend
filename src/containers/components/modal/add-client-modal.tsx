import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBRow,
  MDBCol,
  MDBStepper,
  MDBStep,
  MDBInput,
  MDBSelect,
} from "mdbreact";

const ModalConfirm = props => {
  const { show, modalClosed } = props;
  return (
    <MDBContainer>
      <MDBModal className="modal-1000 stepper" size="lg" isOpen={show} toggle={modalClosed}>
        <MDBModalHeader titleClass="w-100" tag="h5">
          Add new Employer / Client
        </MDBModalHeader>
        <MDBModalBody className="text-center">
          <MDBStepper vertical>
            <MDBStep className="completed">
              <a href="#formstep1" onClick={props.swapFormActive(1)(1)}>
                <span className="circle">1</span>
                <span className="label">Step 1</span>
              </a>
              {props.formActivePanel1 === 1 && (
                <div className="step-content">
                  <MDBCol md="8">
                    <MDBSelect
                      search
                      className="text-left mt-0"
                      options={props.options}
                      selected="Select Employer or Client"
                      label="Do you want add an Employer or a Client?"
                      getValue={props.handleSelectChange}
                      value={props.employeeRole}
                    />
                  </MDBCol>
                </div>
              )}

            </MDBStep>
            <MDBStep className="active">
              <a href="#formstep2" onClick={props.swapFormActive(1)(2)}>
                <span className="circle">2</span>
                <span className="label">Step 2</span>
              </a>
              {props.formActivePanel1 === 2 && (
                <div className="step-content">
                  <MDBRow md="12">
                    <MDBCol md="6">
                      <MDBInput label="Company Name" className="mt-4" autoFocus={props.calculateAutofocus(1)} />
                      <MDBInput label="Company Address" className="mt-4" />
                      <MDBInput label="Company Address" className="mt-4" />
                      <MDBInput label="Company Address" className="mt-4" />
                      <MDBInput label="Company Address" className="mt-4" />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput label="Company Name" className="mt-4" autoFocus={props.calculateAutofocus(1)} />
                      <MDBInput label="Company Address" className="mt-4" />
                      <MDBInput label="Company Address" className="mt-4" />
                      <MDBInput label="Company Address" className="mt-4" />
                      <MDBInput label="Company Address" className="mt-4" />
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
            </MDBStep>
            <MDBRow className="mt-1">
              <MDBCol md="12" className="text-right">
                <MDBBtn color="primary"
                  outline>Cancel</MDBBtn>
                <MDBBtn hidden={props.formActivePanel1 === 2} onClick={props.swapFormActive(1)(2)} color="primary">Next </MDBBtn>
                <MDBBtn hidden={props.formActivePanel1 === 1} onClick={props.handleSubmission} color="primary">Submit </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBStepper>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};
export default ModalConfirm;
