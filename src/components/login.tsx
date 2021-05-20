import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/Auth.context";
import "../styles/loginStyles.scss";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const [login, setLogin] = useState({});
  const { user, setUser } = useContext(AuthContext);
  // const [users, setUsers] 
  const formSubmit = (e: any) => {
    e.preventDefault();

    signin();

    console.log("this is login state", login);
    console.log('this is email', e.target[0].value)
    console.log('this is password', e.target[1].value)
    console.log('clicked submit')
  };

  const signin = () => {
    fetch(`/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update user context with response from server
        setUser(...user, data);
        // let log = user;
        // console.log('this is user from server', log);
        // Update isLogged state to authorize access to /dashboard
        props.setLoggedIn(data.isLoggedIn);
        sessionStorage.setItem('user', JSON.stringify(data));
      })
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h4">bikeAlertr</Typography>
        <form id="loginForm" onSubmit={formSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          {/* <input
            id="email"
            type="text"
            placeholder="Email"
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          /> */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          {/* <input
            id="password"
            type="text"
            placeholder="Password"
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          /> */}
          <Button
            form="loginForm" 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            value="Submit"
          >
            Sign In
          </Button>
          {/* <input form="loginForm" type="submit" value="Submit"></input> */}
        </form>
      </div>
      <Link to="/signup">Create Account</Link>
    </Container>
  );
};

export default Login;
