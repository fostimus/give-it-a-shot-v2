import React, { useState, useEffect } from "react";
import { QuizForm } from "../../components/QuizForm";
import DrinksApi from "../../backend/drinks";

export function Quiz(props) {
  //TODO: implement going back

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

  // results state
  /**
   * look into changing to results page like this:
   * props.history.push({
  pathname: '/somePlace',
  state: data_you_need_to_pass
});
   */

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

  //TODO: use react contexts to pass down current user
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
