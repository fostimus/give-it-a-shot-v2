import React, { useContext } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
import UsersApi from "../../backend/user";
import styles from "./Button.module.scss";

export function Button(props) {
  return (
    <button
      className={`${styles.button} ${props.className ? props.className : ""} ${
        props.small ? styles.small : ""
      } ${props.large ? styles.large : ""}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.content}
    </button>
  );
}

/**
 * props:
 * - text: text display w/in button link
 * - large: display larger button
 * - small: display smaller button
 * - className: classes to use
 */
export function ButtonLink(props) {
  const content = (
    <Link className={styles.link} to={props.path}>
      {props.text}
    </Link>
  );
  return (
    <Button
      large={props.large}
      small={props.small}
      className={props.className}
      content={content}
    />
  );
}

export function FavoriteButton(props) {
  const user = useContext(AppContext);
  return (
    <Button
      small={true}
      onClick={() => {
        const favorite = {
          drinkName: props.drinkName,
          cocktailDbId: props.cdbId,
          imageUrl: props.imageUrl
        };

        UsersApi.favorite(user, favorite).then(
          data => console.log(data)

          //TODO: add modal here to say the favorite was added, so the user knows
        );
      }}
      content="Add to Favorites"
    />
  );
}
