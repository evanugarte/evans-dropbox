import React from "react";
import { Route, Redirect } from "react-router-dom";

export function PrivateRoute({ component: Component, appProps, ...params }) {
  console.log("hello authenitcated ", appProps.authenticated);

  return (
    <Route
      {...params}
      render={(props) => <Component
        {...appProps} {...props} />}
    />
  );
}


