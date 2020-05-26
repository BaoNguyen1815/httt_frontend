import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_ITEMS_ACTION: () => ({}),
  SET_LIST_ITEMS_ACTION: data => ({ data })
});

export const { getAllItemsAction, setListItemsAction } = actions;
