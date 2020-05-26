import { MDBTimeline, MDBTimelineStep } from "mdbreact";
import React from "react";

const TimeLineVerification = () => {
  return (
    <div className="time-line-verify">
      <MDBTimeline vertical={false}>
        <MDBTimelineStep inverted icon="id-card">
          <h5 className="font-weight-bold">Gov ID: Front</h5>
        </MDBTimelineStep>
        <MDBTimelineStep inverted color="warning-color" icon="credit-card">
          <h5 className="font-weight-bold">Gov ID: Back</h5>
        </MDBTimelineStep>
        <MDBTimelineStep inverted icon="portrait" color="danger-color">
          <h5 className="font-weight-bold">Selfie w/ Gov ID</h5>
        </MDBTimelineStep>
        <MDBTimelineStep inverted icon="home" color="info-color">
          <h5 className="font-weight-bold">Proof of Residency</h5>
        </MDBTimelineStep>
      </MDBTimeline>
    </div>
  );
};

export default TimeLineVerification;
