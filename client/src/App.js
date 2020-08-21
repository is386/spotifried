import React from "react";
import "./App.css";
import Create from "./Create";
import Login from "./Login";
import Top10 from "./Top10";
import Search from "./Search";
import Logout from "./Logout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            <Route path="/create" component={Create} />
            <Route path="/search" component={Search} />
            <Route path="/logout" component={Logout} />
            <Route path="/top10" component={Top10} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
