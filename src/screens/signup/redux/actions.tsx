import { createActions } from "redux-actions";

const actions = createActions({
  SIGN_UP_ACTION: (username, password, fullName, role) => ({ username, password, fullName, role })
});

export const { signUpAction } = actions;
