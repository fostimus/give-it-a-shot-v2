import React, { useState, useEffect } from "react";
import { QuizForm } from "../../components/QuizForm";
import { Results } from "../../components/Results";
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

  // results state
  /**
   * look into changing to results page like this:
   * props.history.push({
  pathname: '/somePlace',
  state: data_you_need_to_pass
});
   */
  const [drinks, setDrinks] = useState([]);
  const [shownIndex, setShownIndex] = useState(0);
  const [shownDrinks, setShownDrinks] = useState([]);

  const getResults = () => {
    DrinksApi.getResults(results).then(data => {
      if (data.length > 0) {
        const shownDrinks = [];
        for (let i = 0; i < 2; i++) {
          shownDrinks.push(data[i]);
        }

        setDrinks(data);
        setShownIndex(shownDrinks.length);
        setShownDrinks(shownDrinks);
      }
    });
  };

  const getMoreDrinks = () => {
    for (let i = shownIndex; i < 2 + shownIndex; i++) {
      if (i >= drinks.length) {
        break;
      }
      shownDrinks.push(drinks[i]);
    }

    if (shownDrinks.length >= drinks.length) {
      console.log(
        "Need to add pop up here to alert user no more drinks available"
      );
      // TODO: add modal here to pop up and say no more drinks available
    } else {
      setShownIndex(shownDrinks.length);
      setShownDrinks(shownDrinks);
    }
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
        results: results,
        drinks: drinks,
        shownIndex: shownIndex,
        shownDrinks: shownDrinks
      }
    });

    // exit condition, if we reach the end of the questions, go to next page
    if (currentPage + 1 >= question.numPages) {
      getResults();
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
      {drinks.length !== 0 ? (
        <Results
          drinks={shownDrinks}
          getMoreDrinks={getMoreDrinks}
          currentUser={props.currentUser}
        />
      ) : (
        <QuizForm
          question={question}
          selected={selected}
          setSelected={setSelected}
          addToResults={addToResults}
        />
      )}
    </>
  );
}
