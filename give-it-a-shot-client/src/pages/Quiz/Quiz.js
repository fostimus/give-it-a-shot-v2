import React, { useState, useEffect } from "react";
import { QuizForm } from "../../components/QuizForm";
import DrinksApi from "../../backend/drinks";

export function Quiz(props) {
  const [question, setQuestion] = useState({
    id: 1,
    title: "",
    field: "",
    options: [],
    submitText: "",
    numPages: 0
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState({});

  const clearState = () => {
    setQuestion({
      id: 1,
      title: "",
      field: "",
      options: [],
      submitText: "",
      numPages: 0
    });
    setCurrentPage(0);
  };

  const addToResults = () => {
    results[question.field] = selected;
    setResults(results);

    props.history.push({
      pathname: "/quiz",
      state: {
        question: question,
        currentPage: currentPage,
        selected: selected,
        results: results
      }
    });

    // exit condition, if we reach the end of the questions, go to next page
    if (currentPage + 1 >= question.numPages) {
      clearState();
      props.history.push({
        pathname: "/results",
        state: {
          results: results
        }
      });
    } else {
      setCurrentPage(currentPage + 1);
      getNextQuestion();
    }
  };

  useEffect(getNextQuestion, [currentPage]);

  function getNextQuestion() {
    DrinksApi.nextQuestion(currentPage).then(data => {
      setQuestion(data);
    });
  }

  return (
    <>
      <QuizForm
        question={question}
        selected={selected}
        setSelected={setSelected}
        addToResults={addToResults}
      />
    </>
  );
}
