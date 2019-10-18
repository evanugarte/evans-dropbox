import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomeView from "./HomeView";
import UploadView from "./UploadView";
import NotFound from "./NotFound";
import Login from "./Login";
import SignUp from "./SignUp";
import { PrivateRoute } from "./PrivateRoute";
import { isAdmin } from "../backend/AuthFunctions";

function Routing({ appProps }) {
  const [adminStatus, setAdminStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const signedOutRoutes = [
    { path: "/login", C: Login },
    { path: "/signup", C: SignUp }
  ];

  useEffect(() => {
    getAdminStatus();
    // eslint-disable-next-line
  }, []);

  async function getAdminStatus() {
    setLoading(true);
    if (appProps.authenticated) {
      setAdminStatus(await isAdmin());
    }
    setLoading(false);
  }

  return (
    !loading &&
    <div>
      <Switch>
        <PrivateRoute exact path="/"
          appProps={{ allowed: appProps.authenticated, ...appProps }}
          component={HomeView} />
        <PrivateRoute path="/upload"
          appProps={{
            allowed: appProps.authenticated && !adminStatus,
            redirect: "/",
            ...appProps
          }} component={UploadView} />
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
