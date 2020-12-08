import React, { useState } from "react";
import UserApi from "../backend/user";
import { Form } from "../components/Form";

const Register = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFirstName = e => {
    setFirstName(e.target.value);
  };
  const handleLastName = e => {
    setLastName(e.target.value);
  };
  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (password === confirmPassword) {
      UserApi.create({ firstName, lastName, email, password }).then(data => {
        console.log("Successful register", data);
        // redirect to /login
        props.history.push("/login");
      });
    }
  };

  const fields = [
    {
      name: "First Name",
      value: firstName,
      type: "text",
      onChange: handleFirstName
    },
    {
      name: "Last Name",
      value: lastName,
      type: "text",
      onChange: handleLastName
    },
    { name: "Email", value: email, type: "email", onChange: handleEmail },
    {
      name: "Password",
      value: password,
      type: "password",
      onChange: handlePassword
    },
    {
      name: "Confirm Password",
      value: confirmPassword,
      type: "password",
      onChange: handleConfirmPassword
    }
  ];

  return (
    <Form
      title="Register"
      submitText="Register"
      onSubmit={handleSubmit}
      fields={fields}
    />
  );
};

export default Register;
