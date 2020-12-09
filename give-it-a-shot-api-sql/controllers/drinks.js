require("dotenv").config();
const db = require("../models");
const data = require("../data");
const axios = require("axios");

const cdbUrl = "https://www.thecocktaildb.com/api/json/v2/";

const nextQuestion = async (req, res) => {
  const quizQuestions = await data.drinks.getQuizQuestions();
  // get next question, whatever the path param is
  const question = quizQuestions[req.params.id];

  return res.json(question);
};

const getRecommendations = (req, res) => {
  let searchUrl = cdbUrl + process.env.API_KEY + "/filter.php?i=";
  for (const key of Object.keys(req.body)) {
    searchUrl = searchUrl + req.body[key] + ",";
  }

  //remove trailing ','
  searchUrl = searchUrl.substr(0, searchUrl.length - 1);

  axios
    .post(searchUrl)
    .then(response => res.json(response.data.drinks))
    .catch(error => console.error(error));
};

const getDrinkDetails = (req, res) => {
  const cdbDetails =
    cdbUrl + process.env.API_KEY + "/lookup.php?i=" + req.params.drinkId;

  axios
    .get(cdbDetails)
    .then(response => res.json(response.data.drinks[0]))
    .catch(error => console.error(error));
};

const randomDrink = (req, res) => {
  const randomUrl = cdbUrl + "/1/random.php";

  console.log(randomUrl);

  axios
    .get(randomUrl)
    .then(response => res.json(response.data.drinks[0]))
    .catch(error => console.error(error));
};

module.exports = {
  nextQuestion,
  getRecommendations,
  getDrinkDetails,
  randomDrink
};
