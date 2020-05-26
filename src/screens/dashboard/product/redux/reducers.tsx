import { handleActions } from "redux-actions";
import { setListProductsAction } from "./actions";
import IActionState from "./state";

export default handleActions<IActionState, any>(
  {
    [setListProductsAction.toString()]: (state, action) => ({
      ...state,
      data: action.payload.data
    })
  },
  {
    data: []
  }
);
