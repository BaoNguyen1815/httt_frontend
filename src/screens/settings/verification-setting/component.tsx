import ContainerComponent from "containers/components/layout/container";
import { MDBContainer } from "mdbreact";
import React, { Component } from 'react';
import NavLink from '../navlink';
class VerificationSettingControls extends Component {
  render() {
    return (
      <ContainerComponent>
        <MDBContainer>
          <div className="classic-tabs">
            <NavLink data='..' />
            <div>
              <p>verificationSettingControls Setting</p>
            </div>
          </div>
        </MDBContainer>
      </ContainerComponent>
    )
  }
}
export default VerificationSettingControls;