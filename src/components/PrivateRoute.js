import React from "react";
import { Route, Redirect } from "react-router-dom";

export function PrivateRoute({ component: Component, appProps, ...params }) {
  return (
    <Route
      {...params}
      render={(props) => appProps.authenticated ? <Component
        {...appProps} {...props} /> : <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />}
    />
  );
}
