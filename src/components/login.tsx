import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/loginStyles.scss";

const Login = () => {
  const [login, setLogin] = useState({});
  // const { user, setUser } = useContext(AuthContext)

  const formSubmit = (e: any) => {
    e.preventDefault();

    // signin();

    console.log("this is login state", login);
    // console.log('this is email', e.target[0].value)
    // console.log('this is password', e.target[1].value)
    // console.log('clicked submit')
  };

  const signin = () => {
    fetch(`/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    }).then((response) => response.json());
    // .then(data => {
    //   console.log("signin: ", user);
    //   setUser(...user, data);
    // })
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
