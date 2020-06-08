import { handleActions } from "redux-actions";
import { setListShippingsAction } from "./actions";
import IActionState from "./state";

export default handleActions<IActionState, any>(
  {
    [setListShippingsAction.toString()]: (state, action) => ({
      ...state,
      data: action.payload.data
    })
  },
  {
    data: []
  }
);
