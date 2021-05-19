import React, { useState, useMemo } from "react";
import { Router, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Alerts from "./components/alertColumn";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Signup from "./components/signup";
import { AuthContext } from "./components/context/Auth.context"



const App = () => {
 const [user, setUser] = useState({});
 const providerUser = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <div>
    <AuthContext.Provider value={providerUser}>
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
    </AuthContext.Provider>
  </div>
  )
};

export default App;
