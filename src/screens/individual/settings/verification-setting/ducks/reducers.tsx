import { handleActions } from "redux-actions";
import { setUserAdvanceAction, onLoadingAction, offLoadingAction } from "./actions";

export default handleActions<any>(
  {
    [setUserAdvanceAction.toString()]: (state, { payload }) => ({ ...state, userAdv: payload }),
    [onLoadingAction.toString()]: state => ({ ...state, isLoading: true }),
    [offLoadingAction.toString()]: state => ({ ...state, isLoading: false }),
  },
  {
    userAdv: null,
    isLoading: false
  }
);
