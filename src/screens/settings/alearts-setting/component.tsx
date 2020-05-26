import ContainerComponent from "containers/components/layout/container";
import { MDBContainer } from "mdbreact";
import React from 'react';
import NavLink from '../navlink';
class AlertsSettingControl extends React.Component {
  componentDidMount() {
    console.log('render apiSettingControls - Component')
  }
  render() {
    return (
      <ContainerComponent>
        <MDBContainer>
          <div className="classic-tabs">
            <NavLink data='..' />
            <div>
              <p>AlertsSettingControl Setting</p>
            </div>
          </div>
        </MDBContainer>
      </ContainerComponent>
    )
  }
}
export default AlertsSettingControl;
