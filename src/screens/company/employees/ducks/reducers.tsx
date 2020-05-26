import { handleActions } from "redux-actions";
import {
  setDataEmployeeAction
} from "./actions";

export default handleActions<any>(
  {
    [setDataEmployeeAction.toString()]: (state, { payload }) => ({
      ...state,
      listEmployeeNotRegistered: payload.not_registered,
      listDataWithDist: payload.registered_with_distrubition,
      listDataWithOutDist: payload.registered_without_distrubition
    })
  },
  {
    listEmployeeNotRegistered: [],
    listDataWithDist: [],
    listDataWithOutDist: []
  }
);
