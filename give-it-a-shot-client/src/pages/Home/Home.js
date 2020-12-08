import React, { useState } from "react";
import loggedOutIcon from "./assets/alcohol_icon.png";
import shaker from "./assets/cocktailshaker.png";
import martini from "./assets/martini.png";
import mimosa from "./assets/mimosa.png";
import pineapple from "./assets/pineapple.png";
import { ButtonLink } from "../../components/Button";
import styles from "./assets/Home.module.scss";
import { vw, mobileBreakpoint, getViewport } from "../../utility";

export const Home = props => {
  const [desktop, setDesktop] = useState(vw > mobileBreakpoint ? true : false);

  const checkViewport = () => {
    const [vw, vh] = getViewport();

    if (vw > mobileBreakpoint) {
      setDesktop(true);
    } else if (vw <= mobileBreakpoint) {
      setDesktop(false);
    }
  };

  window.addEventListener("resize", checkViewport);

  return (
    <>
      {props.currentUser ? (
        <div className={styles.loggedIn}>
          <h2>Welcome Home.. Grab a Drink 🍸</h2>
          <div className={styles.grid}>
            <img src={shaker} alt="" />
            <img src={mimosa} alt="" />
            <img src={pineapple} alt="" />
            <img src={martini} alt="" />
          </div>

          <ButtonLink
            large={desktop}
            className={styles.button}
            path="/quiz"
            text="Take the drink quiz"
          />
        </div>
      ) : (
        <div className={styles.home}>
          <img
            className={`${styles.mainIcon} ${styles.centered}`}
            src={loggedOutIcon}
            alt=""
          />
          <ButtonLink
            className={`${styles.home2} ${styles.centered}`}
            path="/login"
            text="Login"
          />
          <ButtonLink
            className={`${styles.home3} ${styles.centered}`}
            path="/register"
            text="Register"
          />
        </div>
      )}
    </>
  );
};
