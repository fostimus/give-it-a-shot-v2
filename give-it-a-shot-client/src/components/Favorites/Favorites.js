import React, { useState, useEffect } from "react";
import UserApi from "../../backend/user";
import { Option } from "../Option";
import styles from "./assets/Favorites.module.scss";
import shaker from "./assets/cocktailshaker.png";
import martini from "./assets/martini.png";
import mimosa from "./assets/mimosa.png";
import pineapple from "./assets/pineapple.png";

export function Favorites(props) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    UserApi.favorites(props.currentUser).then(data => {
      setFavorites(data);
    });
  }, [props.currentUser]);

  return (
    <div>
      <h2>Your Faves</h2>
      {favorites.length === 0 ? (
        <>
          <h4>Take the Drink Quiz to find a favorite</h4>
          <div className={styles.grid}>
            <img src={shaker} alt="" />
            <img src={mimosa} alt="" />
            <img src={pineapple} alt="" />
            <img src={martini} alt="" />
          </div>
        </>
      ) : (
        <>
          {favorites.map(favorite => (
            <div key={favorite.id} className={styles.fave}>
              <Option
                key={favorite.id}
                name={favorite.name}
                idDrink={favorite.id}
                image={favorite.imageUrl}
                action={"/drink/" + favorite.cocktailDbId}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
