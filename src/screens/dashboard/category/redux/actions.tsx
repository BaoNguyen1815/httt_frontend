import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_CATEGORY_ACTION: () => ({}),
  SET_LIST_CATEGORY_ACTION: data => ({ data })
});

export const { getAllCategoryAction, setListCategoryAction } = actions;
