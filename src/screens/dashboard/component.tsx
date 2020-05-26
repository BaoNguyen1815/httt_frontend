import ContainerComponent from "containers/components/layout/container";
import { MDBContainer } from "mdbreact";
import React from "react";

class DashBoardComponent extends React.Component {
  render() {
    return (
      <ContainerComponent>
        <MDBContainer></MDBContainer>
      </ContainerComponent>
    );
  }
}
export default DashBoardComponent;
