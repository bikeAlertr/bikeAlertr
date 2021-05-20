import React, { useState, useMemo, useEffect, useContext } from "react";
import { Router, Route, Switch } from "react-router";
import { BrowserRouter, Redirect } from "react-router-dom";
import Alerts from "./components/alertColumn";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Signup from "./components/signup";
import { AuthContext } from "./components/context/Auth.context"


import CssBaseline from '@material-ui/core/CssBaseline';



const App = () => {
  const [user, setUser]  = useState({});
  // const { user, setUser } = useContext(AuthContext);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser])

  const [loggedIn, setLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  return (
    <div>
      <AuthContext.Provider value={providerUser}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/dashboard" /> : <Login setLoggedIn={setLoggedIn}/>}
            </Route>
            <Route path="/signup">
              {signedUp ? <Redirect to="/" /> : <Signup setSignedUp={setSignedUp}/>}
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </BrowserRouter>      
      </AuthContext.Provider>
    </div>
  )
};

export default App;
