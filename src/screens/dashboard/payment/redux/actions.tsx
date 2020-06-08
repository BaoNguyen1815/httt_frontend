import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_PAYMENTS_ACTION: () => ({}),
  SET_LIST_PAYMENTS_ACTION: data => ({ data }),
  ADD_NEW_PAYMENT_ACTION: (method, ownerName, ownerCardNumber) => ({
    method,
    ownerName,
    ownerCardNumber
  }),
  EDIT_PAYMENT_ACTION: (id, method, ownerName, ownerCardNumber) => ({
    id,
    method,
    ownerName,
    ownerCardNumber
  }),
  DELETE_PAYMENT_ACTION: id => ({ id })
});

export const {
  setListPaymentsAction,
  addNewPaymentAction,
  deletePaymentAction,
  editPaymentAction,
  getAllPaymentsAction
} = actions;
