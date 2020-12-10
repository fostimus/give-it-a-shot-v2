import React, { useState, useEffect } from "react";
import styles from "./Results.module.scss";
import { Option } from "../../components/Option";
import { Button, ButtonLink } from "../../components/Button";
import UsersApi from "../../backend/user";
import DrinksApi from "../../backend/drinks";
import { FavModal } from "../../components/Modal/FavModal";

export function Results(props) {
  const [results, setResults] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [shownIndex, setShownIndex] = useState(0);
  const [shownDrinks, setShownDrinks] = useState([]);

  const getResults = () => {
    DrinksApi.getResults(results).then(data => {
      if (data.length > 0) {
        const shownDrinks = [];
        for (let i = 0; i < 2; i++) {
          shownDrinks.push(data[i]);
        }

        setDrinks(data);
        setShownIndex(shownDrinks.length);
        setShownDrinks(shownDrinks);
      }
    });
  };

  useEffect(getResults, []);

  const getMoreDrinks = () => {
    for (let i = shownIndex; i < 2 + shownIndex; i++) {
      if (i >= drinks.length) {
        break;
      }
      shownDrinks.push(drinks[i]);
    }

    if (shownDrinks.length >= drinks.length) {
      console.log(
        "Need to add pop up here to alert user no more drinks available"
      );
      // TODO: add modal here to pop up and say no more drinks available
    } else {
      setShownIndex(shownDrinks.length);
      setShownDrinks(shownDrinks);
    }
  };

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
            <div>
              <Button
                small={true}
                className={styles.favoriteButton}
                onClick={() => {
                  const favorite = {
                    drinkName: drink.strDrink,
                    liquor: "test",
                    cocktailDbId: drink.idDrink,
                    imageUrl: drink.strDrinkThumb
                  };

                  UsersApi.favorite(props.currentUser, favorite).then(
                    data => console.log(data)

                    //TODO: add modal here to say the favorite was added, so the user knows
                  );
                }}
                content="Add to Favorites"
              />
              <ButtonLink
                small={true}
                text="Details"
                path={"/drink/" + drink.idDrink}
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        className={styles["submitButton"]}
        onClick={getMoreDrinks}
        content="Load More Drinks"
      />
    </>
  );
}
