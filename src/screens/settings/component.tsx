import ContainerComponent from "containers/components/layout/container";
import { MDBContainer } from "mdbreact";
import { default as React } from "react";
import NavLink from './navlink';
import { IProps } from "./propState";
import './settings.css';
class SettingsComponent extends React.Component<IProps> {
  state = {
    activeItemClassicTabs3: "1",
    data: 'passdata'
  }

  toggleClassicTabs3 = tab => () => {
    if (this.state.activeItemClassicTabs3 !== tab) {
      this.setState({
        activeItemClassicTabs3: tab
      });
    }
  }
  render() {
    return (
      <ContainerComponent>
        <MDBContainer>
          <div className="classic-tabs">
            <NavLink data='..' />
            {/* <MDBTabContent className="card mb-5" activeItem={this.state.activeItemClassicTabs3}>
              <MDBTabPane tabId="1">
                <DetailSettingControls data={this.state.data} />
              </MDBTabPane>
              <MDBTabPane tabId="2">
                <VerificationSettingControls />
              </MDBTabPane>
              <MDBTabPane tabId="3">
                <SecurityControls />
              </MDBTabPane>
              <MDBTabPane tabId="4">
                <AlertControls />
              </MDBTabPane>
              <MDBTabPane tabId="5">
                <ApiSettingControls />
              </MDBTabPane>
            </MDBTabContent> */}
          </div>
        </MDBContainer>
      </ContainerComponent>
    );
  }
}
export default SettingsComponent;
