import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signupForm } from "../types/signUpTypes"


const Signup = () => {
  const [signUpState, setSignUpState] = useState<signupForm>({
    email: "",
    password: "",
    confirmPassword: "",
    address1: "",
    address2: "",
    city: "",
    zip_code: 0,
    phone: 0,
  });

  const signUpSubmit = (e: any) => {
    e.preventDefault();
    if (validatePassword()) createUser();
    else alert("Invalid Inputs!");
    // console.log(signUpState);
    // console.log(e.target.value);
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
          type="number"
          placeholder="Zip Code"
          onChange={(e) =>
            setSignUpState({ ...signUpState, zip_code: +e.target.value })
          }
        />
        <br />
        <input
          id="phone"
          type="number"
          placeholder="Phone"
          onChange={(e) =>
            setSignUpState({ ...signUpState, phone: +e.target.value })
          }
        />
        <br />
        <input form="SignUpForm" type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default Signup;
