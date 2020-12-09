import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Home } from "../pages/Home";
import { Quiz } from "../pages/Quiz";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { Account } from "../pages/Account";
import { DrinkDetails } from "../pages/DrinkDetails";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = localStorage.getItem("id");
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

const Routes = props => (
  <Switch>
    <Route
      exact
      path="/"
      render={routeComponentProps => {
        return (
          <Home {...routeComponentProps} currentUser={props.currentUser} />
        );
      }}
    />
    <Route path="/register" component={Register} />
    <Route
      path="/login"
      render={routeComponentProps => {
        return (
          <Login
            {...routeComponentProps}
            // more props to come here
            currentUser={props.currentUser}
            storeUser={props.storeUser}
          />
        );
      }}
    />
    <PrivateRoute
      path="/account"
      component={Account}
      currentUser={props.currentUser}
    />
    <PrivateRoute
      path="/quiz"
      component={Quiz}
      currentUser={props.currentUser}
    />
    <PrivateRoute path="/drink/random" component={DrinkDetails} random={true} />
    <PrivateRoute path="/drink" component={DrinkDetails} />
  </Switch>
);

export default Routes;
