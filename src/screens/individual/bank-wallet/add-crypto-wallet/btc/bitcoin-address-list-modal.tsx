import React from "react";
import { MDBBtn, MDBCol, MDBRow, MDBContainer, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";
import { CSVLink } from "react-csv";
const BTCAddressListModalComponent = props => {
  const { show, modalClosed, addressList } = props;
  console.log(addressList);
  let listAdd = addressList.address_list.map((item, i) => <p key={i} className="text-left">{i}. {item}</p>);
  let dataCSV = [];
  addressList.address_list.forEach(item => {
    let obj = {
      address_list: item
    }
    dataCSV.push(obj);
  });
  return (
    <MDBContainer>
      <MDBModal className="stepper add-bank-modal bit-add-modal" size="lg" isOpen={show} toggle={modalClosed}>
        <MDBModalHeader titleClass="w-100" tag="h5">
          BITCOIN ADDRESS LIST
        </MDBModalHeader>
        <MDBModalBody className="text-center">
          <MDBRow md="12">
            <MDBCol md="1" />
            <MDBCol md="10">
              {/* <CSVDownload data={addressList.address_list} target="_blank" />; */}

              <CSVLink
                data={dataCSV}
                filename={"btc-address-list-file.csv"}
                className="btn btn-primary text-left left csv-download"
                target="_blank"
              >
                Download Full List as CSV
              </CSVLink>;
              <br />
              {listAdd}
            </MDBCol>
            <MDBCol md="1" />
          </MDBRow>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" outline onClick={modalClosed}>
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );

};

export default BTCAddressListModalComponent;
