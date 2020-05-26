import { handleActions } from "redux-actions";
import { setListOrderAction } from "./actions";
import IActionState from "./state";

export default handleActions<IActionState, any>(
  {
    [setListOrderAction.toString()]: (state, action) => ({
      ...state,
      data: action.payload.data
    })
  },
  {
    data: []
  }
);
