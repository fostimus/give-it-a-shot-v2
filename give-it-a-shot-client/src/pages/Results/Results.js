import React, { useState, useEffect } from "react";
import styles from "./Results.module.scss";
import { Option } from "../../components/Option";
import { Button, ButtonLink, FavoriteButton } from "../../components/Button";
import DrinksApi from "../../backend/drinks";
import { vw, mobileBreakpoint, getViewport } from "../../utility";

export function Results(props) {
  const [drinks, setDrinks] = useState([]);
  const [shownIndex, setShownIndex] = useState(0);
  const [shownDrinks, setShownDrinks] = useState(["Yes"]);
  const [smallButton, setsSmallButton] = useState(
    vw > mobileBreakpoint ? false : true
  );

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
        setDrinks([]);
        setShownIndex(0);
        setShownDrinks([]);
      }
    });
  };

  useEffect(getResults, [props.location.state.results]);

  const getMoreDrinks = () => {
    const shownDrinksTemp = [];
    for (let i = shownIndex; i < 2 + shownIndex; i++) {
      if (i >= drinks.length) {
        break;
      }
      shownDrinksTemp.push(drinks[i]);
    }

    if (shownDrinksTemp.length >= drinks.length) {
      console.log(
        "Need to add pop up here to alert user no more drinks available"
      );
      // TODO: add modal here to pop up and say no more drinks available
    } else {
      setShownIndex(shownDrinksTemp.length);
      setShownDrinks(shownDrinksTemp);
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
        disabled
        className={styles["submitButton"]}
        onClick={getMoreDrinks}
        content="Load More Drinks"
      />
    </>
  );
}
