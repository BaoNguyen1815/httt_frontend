import { RootState } from "boot/rootState";
import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { MDBToastContainer, MDBToast, MDBIcon } from "mdbreact";

export default function SuccessComponent() {
  const { isSuccess, successMessage } = useSelector(
    (state: RootState) => ({
      isSuccess: state.common.isSuccess,
      successMessage: state.common.successMessage
    }),
    shallowEqual
  );

  const Msg = () => (
    < >
      <MDBIcon icon="check" size="1x" />
      {successMessage == null ? "Success fully" : successMessage}
    </>
  );

  useEffect(() => {
    if (isSuccess === true) {
      MDBToast["success"](Msg, {
        closeButton: false
      });
    }
    if (isSuccess === false) {
      MDBToast["error"](Msg, {
        closeButton: false
      });
    }
  }, [isSuccess]);

  return isSuccess !== null ? (
    <MDBToastContainer className="toast-content" hideProgressBar={true} newestOnTop={true} autoClose={3000} />
  ) : null;
}
