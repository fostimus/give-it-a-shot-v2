import React, { useState, useEffect } from "react";
import styles from "./Results.module.scss";
import { Option } from "../../components/Option";
import { Button, ButtonLink, FavoriteButton } from "../../components/Button";
import DrinksApi from "../../backend/drinks";
import { vw, mobileBreakpoint, getViewport } from "../../utility";
import { Modal } from "../../components/Modal";

export function Results(props) {
  const [drinks, setDrinks] = useState([]);
  const [shownIndex, setShownIndex] = useState(0);
  const [shownDrinks, setShownDrinks] = useState([]);
  const [smallButton, setsSmallButton] = useState(
    vw > mobileBreakpoint ? false : true
  );

  // results modal state
  const [modalToggled, setModalToggled] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const changeButtonSize = () => {
    const vw = getViewport()[0];

    if (vw > mobileBreakpoint) {
      setsSmallButton(false);
    } else if (vw <= mobileBreakpoint) {
      setsSmallButton(true);
    }
  };

  window.addEventListener("resize", changeButtonSize);

  const getResults = () => {
    DrinksApi.getResults(props.location.state.results).then(data => {
      console.log(data);
      if (data.length > 0) {
        const shownDrinksTemp = [];
        for (let i = 0; i < 2; i++) {
          if (data[i]) {
            shownDrinksTemp.push(data[i]);
          }
        }

        setDrinks(data);
        setShownIndex(shownDrinksTemp.length);
        setShownDrinks(shownDrinksTemp);
      } else {
        setModalToggled(true);
        setModalTitle("No Drinks Found");
        setModalBody(
          "We could not find any drinks to match your preferences. If you know of one you'd like to add, please email derekfoster94@gmail.com"
        );
        setDrinks([]);
        setShownIndex(0);
        setShownDrinks([]);
      }
    });
  };

  useEffect(getResults, [props.location.state.results]);

  const getMoreDrinks = () => {
    for (let i = shownIndex; i < 2 + shownIndex; i++) {
      if (i >= drinks.length) {
        break;
      }
      shownDrinks.push(drinks[i]);
    }

    if (shownDrinks.length >= drinks.length) {
      setModalToggled(true);
      setModalTitle("No More Drinks");
      setModalBody(
        "We've run out of recommendations for you. If you know of one you'd like to add, please email derekfoster94@gmail.com"
      );
    } else {
      setShownIndex(shownDrinks.length);
      setShownDrinks(shownDrinks);
    }
  };

  console.log(shownDrinks);

  return (
    <>
      <h2>Your Recommendations</h2>
      <div className={`${styles.options} ${styles.container}`}>
        {/* (...) is an implicit return; no need to use return keyword */}
        {shownDrinks.map(drink => (
          <div key={drink.strDrink} className={styles.option}>
            <Option
              name={drink.strDrink}
              idDrink={drink.idDrink}
              image={drink.strDrinkThumb}
            />
            <div className={styles.actions}>
              <FavoriteButton
                small={smallButton}
                drinkName={drink.strDrink}
                cdbId={drink.idDrink}
                imageUrl={drink.strDrinkThumb}
              />
              <ButtonLink
                small={smallButton}
                text="Details"
                path={"/drink/" + drink.idDrink}
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        large
        disabled={drinks.length <= 0}
        className={styles["submitButton"]}
        onClick={getMoreDrinks}
        content="Load More Drinks"
      />
      <Modal
        show={modalToggled}
        setModalToggled={setModalToggled}
        title={modalTitle}
        body={modalBody}
      />
    </>
  );
}
