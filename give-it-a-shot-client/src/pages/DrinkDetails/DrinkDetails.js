import React, { useState, useEffect } from "react";
import DrinksApi from "../../backend/drinks";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import styles from "./Details.module.scss";
import { Button } from "../../components/Button";

export const DrinkDetails = props => {
  const [drink, setDrinkDetails] = useState({});

  const getDrinks = () => {
    console.log(props.history);
    if (props.random) {
      DrinksApi.getRandomDrink().then(data => {
        setDrinkDetails(data);
      });
    } else {
      let location = props.history.location;
      let drinkId = location.pathname.slice(7);

      DrinksApi.getDrinkDetails(drinkId).then(data => {
        setDrinkDetails(data);
      });
    }
  };

  useEffect(() => {
    getDrinks();
  }, []);

  return (
    <div className={`${styles.container} ${styles.options}`}>
      <Card className={`${styles.card}`}>
        <Card.Img
          className={`${styles.cardImg}`}
          variant="top"
          src={drink.strDrinkThumb}
        />
        <Card.Body className={`${styles.cardBody}`}>
          <h1 className={`${styles.drinkName}`}> {drink.strDrink} </h1>
          <Card.Text className={`${styles.category}`}>
            {drink.strCategory}
          </Card.Text>
        </Card.Body>
        <ListGroup className={`${styles.ingredients}`}>
          <h3>Ingredients:</h3>
          <ListGroupItem>{drink.strIngredient1}</ListGroupItem>
          <ListGroupItem>{drink.strIngredient2}</ListGroupItem>
          <ListGroupItem>{drink.strIngredient3}</ListGroupItem>
          <ListGroupItem>{drink.strIngredient4}</ListGroupItem>
        </ListGroup>
        <Card.Footer className={styles.footer}>
          <Button
            className={`${styles.detailButton}`}
            small={true}
            type="submit"
            onClick={() => props.history.goBack()}
            content="Back"
          />
          <Button
            className={`${styles.detailButton}`}
            small={true}
            type="submit"
            content="More Drinks Like This"
          />
        </Card.Footer>
      </Card>
    </div>
  );
};
