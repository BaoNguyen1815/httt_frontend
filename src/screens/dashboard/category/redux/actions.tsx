import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_CATEGORY_ACTION: () => ({}),
  SET_LIST_CATEGORY_ACTION: data => ({ data }),
  ADD_NEW_CATEGORY_ACTION: (name, description) => ({ name, description }),
  EDIT_CATEGORY_ACTION: (id, name, description) => ({ id, name, description }),
  DELETE_CATEGORY_ACTION: id => ({ id })
});

export const {
  getAllCategoryAction,
  setListCategoryAction,
  addNewCategoryAction,
  editCategoryAction,
  deleteCategoryAction
} = actions;
