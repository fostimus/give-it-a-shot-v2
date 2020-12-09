import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import UserApi from "../../backend/user";
import { Form } from "../../components/Form";
import { Button } from "../../components/Button";
import styles from "./UserProfile.module.scss";
import { vw, mobileBreakpoint, getViewport } from "../../utility";

export const UserProfile = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [smallButton, setSmallButton] = useState(
    vw > mobileBreakpoint ? false : true
  );

  const fetchUser = () => {
    UserApi.show(props.currentUser).then(data => {
      setFirstName(data.user.firstName);
      setLastName(data.user.lastName);
      setEmail(data.user.email);
    });
  };

  const changeSmallButton = () => {
    const [vw, vh] = getViewport();

    setSmallButton(vw > mobileBreakpoint ? false : true);
  };

  window.addEventListener("resize", changeSmallButton);

  useEffect(fetchUser, [props.currentUser]);

  const handleFirstName = e => {
    setFirstName(e.target.value);
    console.log("inside handelfirstname: " + e);
  };

  const handleLastName = e => {
    setLastName(e.target.value);
  };

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handleUpdate = e => {
    e.preventDefault();
    UserApi.update({
      firstName: firstName,
      lastName: lastName,
      email: email,
      id: props.currentUser
    }).then(data => {
      console.log("Successful update:", data);
      //redirect to home page
      props.history.push("/");
    });
  };

  const handleDelete = e => {
    e.preventDefault();
    UserApi.destroy({
      firstName: firstName,
      lastName: lastName,
      email: email,
      id: props.currentUser
    }).then(deletedUser => {
      console.log(`${firstName} was deleted `);
      console.log(props.currentUser);
      if (!props.currentUser) return <Redirect to="/register" />;
    });
  };

  const logout = () => {
    localStorage.removeItem("id");
    UserApi.logout().then(res => {
      // setUser(null);
    });
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
    { name: "Email", value: email, type: "email", onChange: handleEmail }
  ];

  return (
    <div className={styles.layout}>
      <div>
        <Form
          smallButton={smallButton}
          className={styles.margins}
          title="Account Details"
          submitText="Update Profile"
          onSubmit={handleUpdate}
          fields={fields}
        />
        <Button
          type="submit"
          small={smallButton}
          onClick={(handleDelete, logout)}
          content="Delete Account"
        />
      </div>
    </div>
  );
};
