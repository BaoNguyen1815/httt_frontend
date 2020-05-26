import { MDBBadge, MDBIcon, MDBTable, MDBTableBody, MDBTableHead, MDBSpinner, MDBLightbox } from "mdbreact";
import React, { Component } from "react";
import { getLinkImage } from "screens/individual/settings/services";
// import { DATA_TABLE } from 'containers/contants/data';

// const dataTable = DATA_TABLE;
class MyDocumentVerify extends Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      images: [
      ]
    };
  }

  handleClick = async (event) => {
    event.preventDefault()
    const imageId = event.currentTarget.dataset.id;
    const results = await getLinkImage(imageId, this.props.userId);
    var newTab = window.open();
    newTab.document.body.innerHTML = `<img src="${results.content}">`;
  }

  formatDocType = (category) => {
    let categoryName = "";
    switch (category) {
      case "idfront":
        categoryName = "Id Front";
        break;
      case "idback":
        categoryName = "Id Back";
        break;
      case "selfiewithid":
        categoryName = "Selfie With Id";
        break;
      default:
        break;
    }
    return categoryName;
  }

  render() {
    let myDocuments = <tr><td colSpan={3} className="text-center"><MDBSpinner small /></td></tr>;
    let lightboxImage = <MDBLightbox md='4' images={this.state.images} />
    if (this.props.kyc) {
      myDocuments = this.props.kyc.map(doc => (
        <tr key={doc.image_id}>
          <td>
            <MDBIcon className="mr-2" icon="id-card" />
            Government ID: {this.formatDocType(doc.category)}
          </td>
          <td className="text-center">
            <MDBBadge color={doc.image_status === "approval_pending" ? "warning" : "success"}>Pending Review</MDBBadge>
          </td>
          <td className="text-center text-bold">
            <a onClick={e => this.handleClick(e)} data-id={doc.image_id}>
              View
            </a>
            {lightboxImage}
            {/* <Link className="text-primary" to="">
              View
          </Link> */}
          </td>
        </tr>
      ))
    }
    return (
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Documents Type</th>
            <th className="text-center">Status</th>
            <th className="text-center">View</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {myDocuments}
        </MDBTableBody>
      </MDBTable>
    );
  }
};

export default MyDocumentVerify;
