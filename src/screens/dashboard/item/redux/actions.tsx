import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_ITEMS_ACTION: () => ({}),
  SET_LIST_ITEMS_ACTION: data => ({ data }),
  ADD_NEW_ITEM_ACTION: (sale, sellingPrice, productId) => ({
    sale,
    sellingPrice,
    productId
  }),
  EDIT_ITEM_ACTION: (id, sale, sellingPrice, productId) => ({
    id,
    sale,
    sellingPrice,
    productId
  }),
  DELETE_ITEM_ACTION: id => ({ id })
});

export const { getAllItemsAction, setListItemsAction, addNewItemAction, editItemAction, deleteItemAction } = actions;
