import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_ORDER_ACTION: () => ({}),
  SET_LIST_ORDER_ACTION: data => ({ data })
});

export const { getAllOrderAction, setListOrderAction } = actions;
