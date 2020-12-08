import React from "react";
import Option from "./Option";
import { Button } from "../Button";

//figure out how best to use this
export function OptionSection(props) {
  return (
    <div className={props.className}>
      {/* (...) is an implicit return; no need to use return keyword */}
      {props.options.map(option => (
        <Option
          key={option.name}
          className={option.className}
          name={option.name}
          image={option.image}
          action={option.action}
        />
      ))}
      <button onClick={options.button.onClick}>{options.button.text}</button>
    </div>
  );
}
