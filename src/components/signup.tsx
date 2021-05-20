import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../server/controllers/userController";
import { signupForm } from "../types/signUpTypes"
import { AuthContext } from "./context/Auth.context";


const Signup = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const [signUpState, setSignUpState] = useState<signupForm>({
    firstname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address1: "",
    address2: "",
    city: "",
    zip_code: "",
    phone: "",
  });

  const signUpSubmit = (e: any) => {
    e.preventDefault();
    if (validatePassword()) createUser();
    else alert("Invalid Inputs!");
    console.log('this is signupstate', signUpState);
    console.log('this is target value', e.target.value);
  };

  const createUser = () => {
    fetch(`/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        'firstname': signUpState.firstname,
        'email': signUpState.email,
        'password': signUpState.password,
        'address1': signUpState.address1,
        'address2': signUpState.address2,
        'city': signUpState.city,
        'zip_code': signUpState.zip_code,
        'phone': signUpState.phone
      }),
    }).then((response) => response.json())
    .then(data => {
      props.setSignedUp(true);
    })
  };

  const validatePassword = () => {
    return signUpState.password === signUpState.confirmPassword;
  };

  return (
    <div>
      <h1>Signup page</h1>
      <form id="SignUpForm" onSubmit={signUpSubmit}>
      <input
          id="name"
          type="text"
          placeholder="First Name"
          onChange={(e) =>
            setSignUpState({ ...signUpState, firstname: e.target.value })
          }
        />
        <br />
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
            setSignUpState({ ...signUpState, zip_code: e.target.value })
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
        <input form="SignUpForm" type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default Signup;
