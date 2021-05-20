import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/Auth.context";
import "../styles/loginStyles.scss";

const Login = (props) => {
  const [login, setLogin] = useState({});
  const { user, setUser } = useContext(AuthContext);

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
      // Update isLogged state to authorize access to /dashboard
      props.setLoggedIn(data.isLoggedIn);
    });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form id="loginForm" onSubmit={formSubmit}>
        <input
          id="email"
          type="text"
          placeholder="Email"
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />
        <input
          id="password"
          type="text"
          placeholder="Password"
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
        <input form="loginForm" type="submit" value="Submit"></input>
      </form>
      <Link to="/signup">Create Account</Link>
    </div>
  );
};

export default Login;
