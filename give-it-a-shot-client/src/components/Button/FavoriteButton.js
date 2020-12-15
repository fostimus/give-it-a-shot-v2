import React, { useState, useContext } from "react";
import { AppContext } from "../../App";
import { Button } from "./Button";
import UsersApi from "../../backend/user";
import { Modal } from "../Modal";
import "./assets/FavoriteButton.scss";

export function FavoriteButton(props) {
  const [addedFavorite, setAddedFavorite] = useState(false);

  const user = useContext(AppContext);

  return (
    <>
      <Button
        small={props.small}
        large={props.large}
        className={props.className}
        onClick={() => {
          const favorite = {
            drinkName: props.drinkName,
            cocktailDbId: props.cdbId,
            imageUrl: props.imageUrl
          };

          UsersApi.favorite(user, favorite).then(data => {
            console.log(data);
            setAddedFavorite(true);
          });
        }}
        content="Add to Favorites"
      />
      <Modal
        show={addedFavorite}
        setModalToggled={setAddedFavorite}
        title="Success"
        body="Drink has been added to your favorites!"
      />
    </>
  );
}
