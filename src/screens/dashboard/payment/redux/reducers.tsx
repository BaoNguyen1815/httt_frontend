import { handleActions } from "redux-actions";
import { setListPaymentsAction } from "./actions";
import IActionState from "./state";

export default handleActions<IActionState, any>(
  {
    [setListPaymentsAction.toString()]: (state, action) => ({
      ...state,
      data: action.payload.data
    })
  },
  {
    data: []
  }
);
