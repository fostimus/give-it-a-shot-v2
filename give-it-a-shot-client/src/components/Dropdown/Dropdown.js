import React, { useState } from "react";
import { default as BSDropdown } from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export function Dropdown(props) {
  const [selected, setSelected] = useState("None Selected");

  const dropItemClick = value => {
    setSelected(value);
  };

  return (
    <>
      <input type="hidden" name="liquor" value={selected} />
      <DropdownButton id="dropdown-basic-button" title={selected}>
        {props.options.map(option => (
          <BSDropdown.Item
            onClick={() => {
              dropItemClick(option);
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
