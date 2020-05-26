import { handleActions } from "redux-actions";
import { setListCategoryAction } from "./actions";
import IActionState from "./state";

export default handleActions<IActionState, any>(
  {
    [setListCategoryAction.toString()]: (state, action) => ({
      ...state,
      data: action.payload.data
    })
  },
  {
    data: []
  }
);
