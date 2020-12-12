import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
import icon from "../../assets/alcohol_icon.png";
import styles from "./Header.module.scss";
import { vw, mobileBreakpoint, getViewport } from "../../utility";

export const Header = props => {
  const [toggleDisplay, setToggleDisplay] = useState(true);
  const [headerDisabled, setHeaderDisabled] = useState(
    vw > mobileBreakpoint ? true : false
  );
  const user = useContext(AppContext);

  const toggleMenu = () => {
    setToggleDisplay(!toggleDisplay);
  };

  const responsiveChange = () => {
    const [vw, vh] = getViewport();

    if (vw > mobileBreakpoint) {
      setToggleDisplay(true);
      setHeaderDisabled(true);
    } else if (vw <= mobileBreakpoint) {
      setToggleDisplay(false);
      setHeaderDisabled(false);
    }
  };

  window.addEventListener("resize", responsiveChange);

  const loggedIn = (
    <div className={`${toggleDisplay ? null : styles.block} ${styles.header}`}>
      <div className={`${toggleDisplay ? null : styles.hidden} ${styles.logo}`}>
        <Link to={"/"}>Home</Link>
        <Link to={"/account"}>Account</Link>
      </div>
      <button
        className={styles["header-button"]}
        disabled={headerDisabled}
        onClick={toggleMenu}
      >
        <h1>Give It A Shot</h1>
        <img className={styles.icon} src={icon} alt="" />
      </button>
      <div
        className={`${toggleDisplay ? null : styles.hidden} ${styles.links}`}
      >
        <a href="/logout" onClick={props.logout}>
          Log Out
        </a>
      </div>
    </div>
  );

  const loggedOut = (
    <>
      <h1 className={styles.loggedOut}>Give It A Shot</h1>
    </>
  );
  return <header>{user ? loggedIn : loggedOut}</header>;
};
