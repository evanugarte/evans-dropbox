import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import HomeView from "./HomeView";
import UploadView from "./UploadView";

class MainLayout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomeView} />
          <Route path="/upload" component={UploadView} />
        </Switch>
      </div>
    );
  }
}

export default MainLayout;
