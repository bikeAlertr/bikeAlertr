import React from 'react'
import { Router, Route, Switch } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <Link to="/dashboard">Login</Link>
      {/* <Route path="/dashboard" component={Dashboard} /> */}
    </div>
  )
}

export default Login