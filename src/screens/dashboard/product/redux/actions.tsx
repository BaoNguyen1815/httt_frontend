import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_PRODUCTS_ACTION: () => ({}),
  SET_LIST_PRODUCTS_ACTION: data => ({ data })
});

export const { getAllProductsAction, setListProductsAction } = actions;
