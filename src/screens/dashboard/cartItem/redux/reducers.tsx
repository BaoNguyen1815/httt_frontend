import { handleActions } from "redux-actions";
import { setListItemsAction } from "./actions";
import IActionState from "./state";

export default handleActions<IActionState, any>(
  {
    [setListItemsAction.toString()]: (state, action) => ({
      ...state,
      data: action.payload.data
    })
  },
  {
    data: []
  }
);
