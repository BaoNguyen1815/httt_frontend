import { RootState } from "boot/rootState";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";

export default function DataLoadingComponent() {
  const { dataLoading } = useSelector(
    (state: RootState) => ({
      dataLoading: state.common.dataLoading
    }),
    shallowEqual
  );
  return dataLoading ? (
    <>
      <div className="spinner-border text-primary data-loading" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </>
  ) : null;
}
