import { handleActions } from "redux-actions";
import { setListItemsCartAction, setListOrderAction } from "./actions";
import IActionState from "./state";

export default handleActions<IActionState, any>(
  {
    [setListOrderAction.toString()]: (state, action) => ({
      ...state,
      data: action.payload.data
    }),
    [setListItemsCartAction.toString()]: (state, action) => ({
      ...state,
      dataCart: action.payload.data
    })
  },
  {
    data: [],
    dataCart: []
  }
);
