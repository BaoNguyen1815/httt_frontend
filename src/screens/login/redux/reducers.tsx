import { handleActions } from "redux-actions";
import { setAccountInfoAction } from "./actions";
import IActionState from "./state";

export default handleActions<IActionState, any>(
  {
    [setAccountInfoAction.toString()]: (state, action) => ({
      ...state,
      accountInfo: action.payload.data
    })
  },
  {
    accountInfo: null
  }
);
