import { handleActions } from "redux-actions";
import { setListUsersAction } from "./actions";
import IActionState from "./state";

export default handleActions<IActionState, any>(
  {
    [setListUsersAction.toString()]: (state, action) => ({
      ...state,
      data: action.payload.data
    })
  },
  {
    data: []
  }
);
