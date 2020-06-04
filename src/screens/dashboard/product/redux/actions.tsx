import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_PRODUCTS_ACTION: () => ({}),
  SET_LIST_PRODUCTS_ACTION: data => ({ data }),
  ADD_NEW_PRODUCT_ACTION: (name, code, description, quantity, price, author, publisher, categoryId) => ({
    name,
    code,
    description,
    quantity,
    price,
    author,
    publisher,
    categoryId
  }),
  EDIT_PRODUCT_ACTION: (id, name, code, description, quantity, price, author, publisher, categoryId) => ({
    id,
    name,
    code,
    description,
    quantity,
    price,
    author,
    publisher,
    categoryId
  }),
  DELETE_PRODUCT_ACTION: id => ({ id })
});

export const {
  getAllProductsAction,
  setListProductsAction,
  addNewProductAction,
  editProductAction,
  deleteProductAction
} = actions;
