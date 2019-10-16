import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import HomeView from "./HomeView";
import UploadView from "./UploadView";
import NotFound from "./NotFound";
import Login from "./Login";
import { PrivateRoute } from "./PrivateRoute";

function Routing({ appProps }) {
  console.log("APP PROPS:");
  console.log(appProps, appProps.authenticated);

  return (
    <div>
      <Navbar />
      <Switch>
        {/* <Route path="/" exact appProps={appProps} component={HomeView} /> */}
        <PrivateRoute exact path="/"
          appProps={appProps} component={HomeView} />
        <PrivateRoute path="/upload"
          appProps={appProps} component={UploadView} />
        <Route exact path="/login"
          render={(props) => <Login {...appProps} {...props} />} />
        {/* <Route path="/upload" component={UploadView} /> */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Routing;
