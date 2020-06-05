import { createActions } from "redux-actions";

const actions = createActions({
  LOG_IN_ACTION: (username, password) => ({ username, password })
});

export const { logInAction, signUpAction } = actions;
