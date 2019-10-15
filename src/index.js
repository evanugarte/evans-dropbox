import React from "react";
import ReactDOM from "react-dom";
import Routing from "./components/Routing";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


class App extends React.Component {

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
