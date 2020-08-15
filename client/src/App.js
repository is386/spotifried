import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Create from "./Create";
import Login from "./Login";
import Top10 from "./Top10";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  // Add your routes here. Be sure to add them to ./components/Nav as well.
  // Right now, the login page is the home page.
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/create" component={Create} />
            <Route path="/top10" component={Top10} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
