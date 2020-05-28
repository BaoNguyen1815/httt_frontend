import LoadingComponent from "containers/components/loading";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import React, { Fragment, useEffect, useState } from "react";
import SideNavComponent from "../side-nav";
import TopNavComponent from "../top-nav";
import { IProps } from "./propState";

export default function ContainerComponent(props: IProps) {
  const [isDisconnected, setIsDisconnected] = useState(false);

  useEffect(() => {
    handleConnectionChange();
    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);
    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, []);

  /** check internet connection */
  const handleConnectionChange = () => {
    const condition = navigator.onLine ? "online" : "offline";
    if (condition === "online") {
      const webPing = setInterval(() => {
        fetch("//google.com", { mode: "no-cors" })
          .then(() => {
            setIsDisconnected(false);
            return clearInterval(webPing);
          })
          .catch(() => this.setState({ isDisconnected: true }));
      }, 2000);
      return;
    }
    setIsDisconnected(true);
  };

  return (
    <Fragment>
      {isDisconnected && <p>Internet connection lost</p>}
      <LoadingComponent />
      <MDBRow>
        <MDBCol sm="2" md="2" lg="2" xl="2">
          <SideNavComponent />
        </MDBCol>
        <MDBCol sm="9" md="9" lg="9" xl="9">
          <TopNavComponent />
          <MDBContainer>{props.children}</MDBContainer>
          {/* <FooterComponent /> */}
        </MDBCol>
      </MDBRow>
    </Fragment>
  );
}
