import { combineReducers } from "redux";
import settingReduce from "./ducks/reducers";
export default combineReducers({
  userSetting: settingReduce,
});
