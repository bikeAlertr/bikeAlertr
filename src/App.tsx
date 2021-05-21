import React, { useState, useMemo, useEffect, useContext } from "react";
import { Router, Route, Switch } from "react-router";
import { BrowserRouter, Redirect } from "react-router-dom";
import Alerts from "./components/alertColumn";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Signup from "./components/signup";
import { AuthContext } from "./components/context/Auth.context"

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';



const App = () => {
  const [user, setUser]  = useState({});
  // const { user, setUser } = useContext(AuthContext);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser])

  const [loggedIn, setLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";

  const theme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#fb8c00',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#0066ff',
        main: '#8d6e63',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    }
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <div>
      <AuthContext.Provider value={providerUser}>
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </AuthContext.Provider>
    </div>
  )
};

export default App;
