import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn
} from "mdbreact";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";

const uploadLogoControl = props => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol sm="12" md="10" lg="6" className="mx-auto my-auto">
          <MDBModal isOpen={props.data.isOpen} toggle={props.toggleModal} position="center">
            <MDBModalHeader toggle={props.toggleModal}>Cropper</MDBModalHeader>
            <MDBModalBody>
              <Cropper
                ref={props.cropper}
                src={props.data.base64_image}
                style={{ height: 400, width: "100%" }}
                aspectRatio={16 / 16}
                guides={false}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={props.toggleModal}>
                Close
              </MDBBtn>
              <MDBBtn color="primary" onClick={props.saveCroppedImage}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default uploadLogoControl;
