import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import HomeView from "./HomeView";
import UploadView from "./UploadView";
import NotFound from "./NotFound";
import Login from "./Login";

class MainLayout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomeView} />
          <Route path="/login" exact component={Login} />
          <Route path="/upload" component={UploadView} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default MainLayout;
