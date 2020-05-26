import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_CUSTOMERS_ACTION: () => ({}),
  SET_LIST_CUSTOMERS_ACTION: data => ({ data })
});

export const { getAllCustomersAction, setListCustomersAction } = actions;
