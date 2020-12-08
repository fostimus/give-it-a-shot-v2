import React from "react";
import styles from "./Form.module.scss";
import { Button } from "../Button";

export function Form(props) {
  return (
    <div className={props.className}>
      <h2>{props.title}</h2>
      <form onSubmit={props.onSubmit} className={styles["form-flex"]}>
        {props.fields.map(field => (
          <div key={field.name} className={styles["form-group"]}>
            <div className={styles["centered"]}>
              <label htmlFor={field.name}>{field.name}</label>
            </div>
            <input
              onChange={field.onChange}
              value={field.value}
              type={field.type}
              id={field.name}
              name={field.name}
              required
            />
          </div>
        ))}

        <Button
          small={props.smallButton}
          type="submit"
          content={props.submitText}
        />
      </form>
    </div>
  );
}
