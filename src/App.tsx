import React from "react";
import { Router, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Alerts from "./components/alertColumn";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Signup from "./components/signup";

let routes = (
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
            <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
          <Alerts />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);

const App = () => {
  return <div>{routes}</div>;
};

export default App;
