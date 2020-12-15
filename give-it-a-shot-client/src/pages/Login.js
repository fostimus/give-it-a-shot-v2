import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { Redirect } from "react-router-dom";
import { Form } from "../components/Form";
import UserApi from "../backend/user";
import { Modal } from "../components/Modal";

const Login = props => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const [modalToggled, setModalToggled] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const user = useContext(AppContext);

  let handleEmail = e => {
    setEmail(e.target.value);
  };

  let handlePassword = e => {
    setPassword(e.target.value);
  };

  let handleSubmit = async event => {
    event.preventDefault();

    const loginObj = {
      email,
      password
    };

    const response = await UserApi.login(loginObj);

    if (response.status === 401) {
      setModalToggled(true);
      setModalTitle("Unauthorized");
      setModalBody("We don't recognize that username and password.");
    } else {
      const data = await response.json();

      if (!data.user) {
        console.log("Login Unsuccessful");
        return false;
      }
      // storeUser is defined in the app component and passed to Login
      props.storeUser(data.user);
    }
  };

  // if user is logged in, redirect
  if (user) return <Redirect to="/" />;

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
    <>
      <Form
        title="Login"
        submitText="Login"
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

export default Login;
