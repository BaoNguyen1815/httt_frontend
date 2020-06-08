import { handleActions } from "redux-actions";
import { setListCustomersAction } from "./actions";
import IActionState from "./state";

export default handleActions<IActionState, any>(
  {
    [setListCustomersAction.toString()]: (state, action) => ({
      ...state,
      data: action.payload.data
    })
  },
  {
    data: []
  }
);
