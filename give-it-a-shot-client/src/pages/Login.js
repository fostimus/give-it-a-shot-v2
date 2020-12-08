import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form } from "../components/Form";
import UserApi from "../backend/user";

const Login = props => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let handleEmail = e => {
    setEmail(e.target.value);
  };

  let handlePassword = e => {
    setPassword(e.target.value);
  };

  let handleSubmit = event => {
    event.preventDefault();

    const loginObj = {
      email,
      password
    };

    UserApi.login(loginObj)
      .then(data => {
        if (!data.user) {
          console.log("Login Unsuccessful");
          return false;
        }
        // storeUser is defined in the app component and passed to Login
        props.storeUser(data.user);
      })
      .catch(err => console.log("Login Error for: ", loginObj, err));
  };

  // if user is logged in, redirect
  if (props.currentUser) return <Redirect to="/" />;

  const fields = [
    { name: "Email", value: email, type: "email", onChange: handleEmail },
    {
      name: "Password",
      value: password,
      type: "password",
      onChange: handlePassword
    }
  ];

  return (
    <Form
      title="Login"
      submitText="Login"
      onSubmit={handleSubmit}
      fields={fields}
    />
  );
};

export default Login;
