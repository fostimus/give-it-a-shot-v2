import React from "react";
import { Option } from "../Option";
import { Button } from "../Button";
import styles from "./QuizForm.module.scss";

export function QuizForm(props) {
  const handleSubmit = e => {
    e.preventDefault();

    props.addToResults();
  };

  return (
    <>
      <h2>{props.question.title}</h2>
      <div className={`${styles.options} ${styles.container}`}>
        {/* (...) is an implicit return; no need to use return keyword */}
        {props.question.options.map(option => (
          <Option
            key={option.name}
            className={styles.option}
            name={option.name}
            image={option.image}
            action={() => props.setSelected(option.name)}
          />
        ))}
      </div>
      <Button
        large
        className={styles.submitButton}
        type="submit"
        onClick={handleSubmit}
        content={props.question.submitText}
      />
    </>
  );
}
