import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import { ConnectedRouter } from "connected-react-router";
import Page404Component from "containers/components/404";
import "mdbreact/dist/css/mdb.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import CategoryScreenComponent from "screens/dashboard/category/component";
import DashBoardComponent from "screens/dashboard/component";
import CustomerScreenComponent from "screens/dashboard/customer/component";
import ItemScreenComponent from "screens/dashboard/item/component";
import OrderScreenComponent from "screens/dashboard/order/component";
import ProductScreenComponent from "screens/dashboard/product/component";
import UserScreenComponent from "screens/dashboard/user/component";
import HomeComponent from "screens/home";
import LoginComponent from "screens/login";
import StatsComponent from "screens/stats/component";
import "./assets/scss/main.scss";
import configureStore from "./boot/configureStore";

const store = configureStore.setup();

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const token = localStorage.getItem("token");
  // hard code for now
  const token = "test";
  const auth = props => (!token ? <Redirect to="/login" /> : <Component {...props} />);
  return <Route {...rest} render={auth} />;
};

ReactDOM.render(
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <ConnectedRouter history={configureStore.history}>
        <Switch>
          <Redirect from="/" exact to="/home" />
          <Route path="/home">
            <Route exact path="/home" component={HomeComponent} />
          </Route>
          <Route path="/login">
            <Route exact path="/login" component={LoginComponent} />
          </Route>
          <PrivateRoute path="/dashboard" component={DashBoardComponent}>
            <PrivateRoute exact path="/dashboard" component={DashBoardComponent} />
            <PrivateRoute exact path="/dashboard/user" component={UserScreenComponent} />
            <PrivateRoute exact path="/dashboard/product" component={ProductScreenComponent} />
            <PrivateRoute exact path="/dashboard/category" component={CategoryScreenComponent} />
            <PrivateRoute exact path="/dashboard/item" component={ItemScreenComponent} />
            <PrivateRoute exact path="/dashboard/order" component={OrderScreenComponent} />
            <PrivateRoute exact path="/dashboard/customer" component={CustomerScreenComponent} />
          </PrivateRoute>
          <Route path="/stats">
            <Route exact path="/stats" component={StatsComponent} />
          </Route>
          <Route path="/settings-page"></Route>
          <Route component={Page404Component} />
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("bitwage-root")
);
