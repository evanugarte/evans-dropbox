import React, { useState } from "react";
import ReactDOM from "react-dom";
import Routing from "./components/Routing";
import Amplify from "aws-amplify";
import config from "./backend/config";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  }
});

function App() {

  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routing appProps={{ authenticated, setAuthenticated }} />
      </BrowserRouter>
    </div>
  );
}

export default App;


ReactDOM.render(<App />, document.getElementById("root"));
