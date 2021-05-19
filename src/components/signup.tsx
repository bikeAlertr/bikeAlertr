import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [signUpState, setSignUpState] = useState({
    password: null,
    confirmPassword: null
  });

  const signUpSubmit = (e: any) => {
    e.preventDefault();
    if (validatePassword()) createUser();
    else alert('Invalid Inputs!');
    console.log(signUpState);
  };

  const createUser = () => {
    fetch(`/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpState),
    }).then((response) => response.json());
    // .then(data => {
    //   console.log("signin: ", user);
    //   setUser(...user, data);
    // })
  };

  const validatePassword = () => {
    return signUpState.password === signUpState.confirmPassword;
  };

  return (
    <div>
      <h1>Signup page</h1>
      <form id="SignUpForm" onSubmit={signUpSubmit}>
        <input
          id="email"
          type="text"
          placeholder="Email"
          onChange={(e) =>
            setSignUpState({ ...signUpState, email: e.target.value })
          }
        />
        <br />
        <input
          id="password"
          type="text"
          placeholder="Password"
          onChange={(e) =>
            setSignUpState({ ...signUpState, password: e.target.value })
          }
        />
        <br />
        <input
          id="confirmPassword"
          type="text"
          placeholder="Password Again"
          onChange={(e) =>
            setSignUpState({ ...signUpState, confirmPassword: e.target.value })
          }
        />
        <br />
        <input
          id="address1"
          type="text"
          placeholder="Street Name"
          onChange={(e) =>
            setSignUpState({ ...signUpState, address1: e.target.value })
          }
        />
        <br />
        <input
          id="address2"
          type="text"
          placeholder="Apartment #"
          onChange={(e) =>
            setSignUpState({ ...signUpState, address2: e.target.value })
          }
        />
        <br />
        <input
          id="city"
          type="text"
          placeholder="City"
          onChange={(e) =>
            setSignUpState({ ...signUpState, city: e.target.value })
          }
        />
        <br />
        <input
          id="zipCode"
          type="text"
          placeholder="Zip Code"
          onChange={(e) =>
            setSignUpState({ ...signUpState, Zip_Code: e.target.value })
          }
        />
        <br />
        <input
          id="phone"
          type="text"
          placeholder="Phone"
          onChange={(e) =>
            setSignUpState({ ...signUpState, phone: e.target.value })
          }
        />
        <br />
        <input form="loginForm" type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default Signup;
