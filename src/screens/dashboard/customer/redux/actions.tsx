import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_CUSTOMERS_ACTION: () => ({}),
  SET_LIST_CUSTOMERS_ACTION: data => ({ data }),
  ADD_NEW_CUSTOMER_ACTION: (name, phone, age, sex, username, password) => ({
    name,
    phone,
    age,
    sex,
    username,
    password
  }),
  EDIT_CUSTOMER_ACTION: (id, name, phone, age, sex, username, password) => ({
    id,
    name,
    phone,
    age,
    sex,
    username,
    password
  }),
  DELETE_CUSTOMER_ACTION: id => ({ id })
});

export const {
  getAllCustomersAction,
  setListCustomersAction,
  addNewCustomerAction,
  editCustomerAction,
  deleteCustomerAction
} = actions;
