import React, { useState, useEffect } from "react";
import DrinksApi from "../../backend/drinks";
import { Button, ButtonLink } from "../../components/Button";
import styles from "./Random.module.scss";

export function Random(props) {
  const [liquors, setLiquors] = useState([]);
  const colors = ["Dark", "Light"];
  //TODO: use react context to set liquor, maybe ingredients, throughout app
  useEffect(() => {
    DrinksApi.getLiquorTypes().then(data => {
      setLiquors(data);
    });
  }, []);

  const randomLiquor = value => {
    DrinksApi.getRandomLiquor(value).then(data => {
      props.history.push({
        pathname: `/drink/${data.idDrink}`
      });
    });
  };

  const randomColor = value => {
    DrinksApi.getRandomColor(value).then(data => {
      props.history.push({
        pathname: `/drink/${data.idDrink}`
      });
    });
  };

  return (
    <div>
      <h2>Random Drinks</h2>
      <ButtonLink large path="/random/drink" text="Randomize All" />
      <div className={styles.options}>
        <div className={styles.liquors}>
          {liquors.map(liquor => (
            <Button
              key={liquor}
              onClick={() => {
                randomLiquor(liquor);
              }}
              content={liquor}
            />
          ))}
        </div>
        <div className={styles.colors}>
          {colors.map(color => (
            <Button
              key={color}
              onClick={() => {
                randomColor(color);
              }}
              content={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
