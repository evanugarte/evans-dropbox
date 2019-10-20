import React from "react";
import Filelist from "./Filelist";

function HomeView(appProps) {
  return (
    appProps.authenticated &&
    <div>
      <p>
        through the years, and shed so many tears
      </p>
      <Filelist {...appProps} />
    </div>
  );
}

export default HomeView;
