import React, { useState, useEffect } from "react";
import { default as BSDropdown } from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import styles from "./Dropdown.module.scss";
import "./dropdown.css";

export function Dropdown(props) {
  const [selected, setSelected] = useState("");

  const dropItemClick = value => {
    setSelected(value);
  };

  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  return (
    <>
      <input type="hidden" name="liquor" value={selected} />
      <DropdownButton
        className={styles.dropdown}
        id="dropdown-basic-button"
        title={selected}
      >
        {props.options.map(option => (
          <BSDropdown.Item
            key={option}
            onClick={() => {
              dropItemClick(option);
              props.onChange(option);
            }}
            href="#/action-1"
          >
            {option}
          </BSDropdown.Item>
        ))}
      </DropdownButton>
    </>
  );
}
