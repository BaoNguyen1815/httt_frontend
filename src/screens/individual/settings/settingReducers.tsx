import { combineReducers } from "redux";
import settingReduce from "./ducks/reducers";
import verifyReduce from "./verification-setting/ducks/reducers";
export default combineReducers({
  userSetting: settingReduce,
  userVerify: verifyReduce
});
