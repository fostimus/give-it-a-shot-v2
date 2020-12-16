import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

export function Button(props) {
  return (
    <button
      disabled={props.disabled}
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
  const content = <Link to={props.path}>{props.text}</Link>;
  return (
    <Button
      large={props.large}
      small={props.small}
      className={props.className}
      content={content}
    />
  );
}
