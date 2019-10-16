import React from "react";
import ReactDOM from "react-dom";
import Routing from "./components/Routing";
import Amplify, { Auth } from "aws-amplify";
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

class App extends React.Component {

  state = {
    authenticated: false,
    isAuthenticating: false
  }

  async componentDidMount() {
    console.log("doodoo haha");
    
    this.setState({
      isAuthenticating: true
    });
    try {
      await Auth.currentSession();
      this.setState({
        authenticated: true
      });
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    this.setState({
      isAuthenticating: false
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;


ReactDOM.render(<App />, document.getElementById("root"));
