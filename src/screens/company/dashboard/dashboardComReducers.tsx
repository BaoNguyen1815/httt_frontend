import { combineReducers } from "redux";
import dashboardReduce from "./ducks/reducers";
export default combineReducers({
  information: dashboardReduce
});
