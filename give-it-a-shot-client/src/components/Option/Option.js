import React from "react";
import styles from "./Option.module.scss";

export function Option(props) {
  return typeof props.action === "string" ? (
    <OptionLink
      className={`${props.className ? props.className : ""} ${styles.option}`}
      name={props.name}
      image={props.image}
      link={props.action}
    />
  ) : (
    <OptionButton
      className={`${props.className ? props.className : ""} ${styles.option}`}
      name={props.name}
      image={props.image}
      onClick={props.action}
    />
  );
}

function OptionLink(props) {
  return (
    <a href={props.link} className={styles.link}>
      <OptionContent
        className={props.className}
        name={props.name}
        image={props.image}
      />
    </a>
  );
}

function OptionButton(props) {
  return (
    <button onClick={props.onClick} className={styles.button}>
      <OptionContent
        className={props.className}
        name={props.name}
        image={props.image}
      />
    </button>
  );
}

function OptionContent(props) {
  return (
    <div className={props.className}>
      <img src={props.image} alt="" />
      <div>{props.name}</div>
    </div>
  );
}
