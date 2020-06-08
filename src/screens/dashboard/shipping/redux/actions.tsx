import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_SHIPPINGS_ACTION: () => ({}),
  SET_LIST_SHIPPINGS_ACTION: data => ({ data }),
  ADD_NEW_SHIPPING_ACTION: (type, cost) => ({
    type,
    cost
  }),
  EDIT_SHIPPING_ACTION: (id, type, cost) => ({
    id,
    type,
    cost
  }),
  DELETE_SHIPPING_ACTION: id => ({ id })
});

export const {
  getAllShippingsAction,
  addNewShippingAction,
  editShippingAction,
  deleteShippingAction,
  setListShippingsAction
} = actions;
