import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_USERS_ACTION: () => ({}),
  SET_LIST_USERS_ACTION: data => ({ data })
});

export const { getAllUsersAction, setListUsersAction } = actions;
