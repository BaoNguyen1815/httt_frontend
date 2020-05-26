import ContainerComponent from "containers/components/layout/container";
import { MDBContainer } from "mdbreact";
import React from 'react';
import NavLink from '../navlink';
class ApiControls extends React.Component {
  render() {
    return (
      <ContainerComponent>
        <MDBContainer>
          <div className="classic-tabs">
            <NavLink data='..' />
            <div>
              <p>ApiControls Setting</p>
            </div>
          </div>
        </MDBContainer>
      </ContainerComponent>
    )
  }
}
export default ApiControls;