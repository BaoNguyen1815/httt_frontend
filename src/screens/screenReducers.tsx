import { combineReducers } from "redux";
import categoryReducer from "screens/dashboard/category/redux/reducers";
import customersReducer from "screens/dashboard/customer/redux/reducers";
import itemReducer from "screens/dashboard/item/redux/reducers";
import orderReducer from "screens/dashboard/order/redux/reducers";
import productReducer from "screens/dashboard/product/redux/reducers";
import usersReducer from "screens/dashboard/user/redux/reducers";

export default combineReducers({
  user: usersReducer,
  product: productReducer,
  category: categoryReducer,
  item: itemReducer,
  order: orderReducer,
  customer: customersReducer
});
