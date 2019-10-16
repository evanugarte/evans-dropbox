import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomeView from "./HomeView";
import UploadView from "./UploadView";
import NotFound from "./NotFound";
import Login from "./Login";
import SignUp from "./SignUp";
import { PrivateRoute } from "./PrivateRoute";

function Routing({ appProps }) {
  const signedOutRoutes = [
    { path: "/login", C: Login },
    { path: "/signup", C: SignUp }
  ];

  return (
    <div>
      <Switch>
        <PrivateRoute allowed={appProps.authenticated} exact path="/"
          appProps={appProps} component={HomeView} />
        <PrivateRoute allowed={appProps.authenticated} path="/upload"
          appProps={appProps} component={UploadView} />
          {signedOutRoutes.map((x, index) => {
            return (
              <Route key={index} exact path={x.path}
                render={(props) => !appProps.authenticated ? <x.C
                  {...appProps} {...props} /> : <Redirect
                    to={{
                      pathname: '/',
                      state: { from: props.location }
                    }}
                  />}
              />
            );
          })}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Routing;
