import React, { useState } from "react";
import UserApi from "../backend/user";
import { Form } from "../components/Form";
import { Modal } from "../components/Modal";

const Register = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [modalToggled, setModalToggled] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

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

  const handleSubmit = async e => {
    e.preventDefault();

    if (password === confirmPassword) {
      const response = await UserApi.create({
        firstName,
        lastName,
        email,
        password
      });
      const data = await response.json();

      if (response.status === 400) {
        console.log("Unsuccessful register", response);
        setModalToggled(true);
        setModalTitle("Validation Error");
        setModalBody(data.message ? data.message : "");
      } else {
        console.log("Successful register", response);
        // redirect to /login
        props.history.push("/login");
      }
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
    <>
      <Form
        title="Register"
        submitText="Register"
        onSubmit={handleSubmit}
        fields={fields}
      />
      <Modal show={modalToggled} title={modalTitle} body={modalBody} />
    </>
  );
};

export default Register;
