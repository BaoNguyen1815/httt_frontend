// import { IUserModel } from "models";
import { createActions } from "redux-actions";

const actions = createActions({
  SUBMIT_DETAIL_ACTION: userDetail => ({ userDetail })
});

export const { submitDetailAction } = actions;
