import ContainerComponent from "containers/components/layout/container";
import { MDBContainer } from "mdbreact";
import React from 'react';
import NavLink from '../navlink';
import { IProps } from '../propState';
class DetailSettingControls extends React.Component<IProps> {
  render() {
    return (
      <ContainerComponent>
        <MDBContainer>
          <div className="classic-tabs">
            <NavLink data='..' />
            <div>
              <p>Detail Setting -- {this.props.data}</p>
            </div>
          </div>
        </MDBContainer>
      </ContainerComponent>
    )
  }
}

export default DetailSettingControls