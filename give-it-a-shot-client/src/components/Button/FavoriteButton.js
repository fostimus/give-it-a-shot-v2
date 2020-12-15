import React, { useState, useContext } from "react";
import { AppContext } from "../../App";
import { Button } from "./Button";
import UsersApi from "../../backend/user";
import Modal from "react-bootstrap/Modal";
import "./assets/FavoriteButton.scss";

export function FavoriteButton(props) {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

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
            toggleShow();
          });
        }}
        content="Add to Favorites"
      />
      <Modal show={show} onHide={toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Drink has been added to your favorites!</Modal.Body>
      </Modal>
    </>
  );
}
