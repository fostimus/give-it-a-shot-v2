import React, { useState, useEffect } from "react";
import styles from "./Form.module.scss";
import { Button } from "../Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DrinksApi from "../../backend/drinks";

export function Form(props) {
  const [dropVal, setDropVal] = useState("None Selected");
  const [liquorTypes, setLiquorTypes] = useState([]);

  useEffect(() => {
    DrinksApi.getLiquorTypes().then(data => {
      setLiquorTypes(data);
    });
  });

  const dropItemClick = value => {
    setDropVal(value);
  };

  return (
    <div className={props.className}>
      <h2>{props.title}</h2>
      <form onSubmit={props.onSubmit} className={styles["form-flex"]}>
        {props.fields.map(field => {
          return (
            <div key={field.name} className={styles["form-group"]}>
              <div className={styles["centered"]}>
                <label htmlFor={field.name}>{field.name}</label>
              </div>
              {field.type === "dropdown" ? (
                <>
                  <input type="hidden" name="liquor" value={dropVal} />
                  <DropdownButton id="dropdown-basic-button" title={dropVal}>
                    {liquorTypes.map(liquor => (
                      <Dropdown.Item
                        onClick={() => {
                          dropItemClick("Action");
                        }}
                        href="#/action-1"
                      >
                        {liquor}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </>
              ) : (
                <input
                  onChange={field.onChange}
                  value={field.value}
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required
                />
              )}
            </div>
          );
        })}

        <Button
          small={props.smallButton}
          type="submit"
          content={props.submitText}
        />
      </form>
    </div>
  );
}
