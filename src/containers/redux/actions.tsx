import { createActions } from "redux-actions";

const actions = createActions({
  ON_LOADING_ACTION: null,
  OFF_LOADING_ACTION: null,
  SUCCESS_ACTION: null,
  ERROR_ACTION: null
});

export const { onLoadingAction, offLoadingAction, successAction, errorAction } = actions;
