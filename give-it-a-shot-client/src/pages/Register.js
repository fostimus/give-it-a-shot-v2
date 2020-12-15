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

    if (password !== confirmPassword) {
      setModalToggled(true);
      setModalTitle("Password does not match");
      setModalBody("Password and Confirm Password must match");
    } else {
      const response = await UserApi.create({
        firstName,
        lastName,
        email,
        password
      });
      const data = await response.json();
      console.log(response);

      if (response.status === 400) {
        setModalToggled(true);
        setModalBody(data.message ? data.message : "");

        if (data.field === "email" && data.validation === "alreadyExists") {
          setModalTitle("Already Exists");
        }
        if (data.field === "email" && data.validation === "isEmail") {
          setModalTitle("Invalid Email");
        }
        if (data.field === "password" && data.validation === "len") {
          setModalTitle("Password is too short");
        }
      } else {
        setModalToggled(true);
        setModalTitle("Thanks for registering");
        setModalBody(
          "Once you log in, you will be taken to our expert crafted drink quiz. This will finish setting up your account for you, customizing your account so that you can get the most out of Give It A Shot!"
        );
        // props.history.push("/login");
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
      <Modal
        show={modalToggled}
        setModalToggled={setModalToggled}
        title={modalTitle}
        body={modalBody}
      />
    </>
  );
};

export default Register;
