import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";
import { Redirect } from "react-router-dom";
import UserApi from "../../backend/user";
import DrinksApi from "../../backend/drinks";
import { Form } from "../../components/Form";
import { Button } from "../../components/Button";
import styles from "./assets/Account.module.scss";
import "./assets/styles.scss";
import { vw, mobileBreakpoint, getViewport } from "../../utility";

export const Account = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [liquor, setLiquor] = useState("");
  const [liquorTypes, setLiquorTypes] = useState([]);
  const [smallButton, setSmallButton] = useState(
    vw > mobileBreakpoint ? false : true
  );

  const user = useContext(AppContext);

  const fetchUser = userId => {
    UserApi.show(userId).then(data => {
      setFirstName(data.user.firstName);
      setLastName(data.user.lastName);
      setEmail(data.user.email);
      setLiquor(data.user.liquor ? data.user.liquor : "None");
    });
  };

  const fetchLiquorTypes = () => {
    DrinksApi.getLiquorTypes().then(data => {
      if (!data.error) {
        setLiquorTypes(data.concat("None"));
      }
    });
  };

  const changeSmallButton = () => {
    const vw = getViewport()[0];

    setSmallButton(vw > mobileBreakpoint ? false : true);
  };

  window.addEventListener("resize", changeSmallButton);

  useEffect(() => {
    fetchUser(user);
    fetchLiquorTypes();
  }, [user]);

  const handleFirstName = e => {
    setFirstName(e.target.value);
  };

  const handleLastName = e => {
    setLastName(e.target.value);
  };

  const handleLiquor = value => {
    setLiquor(value);
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
      liquor: liquor,
      id: user
    }).then(data => {
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
      id: user
    }).then(deletedUser => {
      if (!user) return <Redirect to="/register" />;
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
    { name: "Email", value: email, type: "email", onChange: handleEmail },
    {
      name: "Liquor",
      value: liquor,
      type: "dropdown",
      onChange: handleLiquor,
      options: liquorTypes
    }
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
