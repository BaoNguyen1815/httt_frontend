import { createActions } from "redux-actions";

const actions = createActions({
  LOG_IN_ACTION: (username, password) => ({ username, password }),
  SET_ACCOUNT_INFO_ACTION: data => ({ data })
});

export const { logInAction, setAccountInfoAction } = actions;
