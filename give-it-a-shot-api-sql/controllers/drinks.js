require("dotenv").config();
const db = require("../models");
const data = require("../data");
const axios = require("axios");

const cdbUrl =
  "https://www.thecocktaildb.com/api/json/v2/" +
  process.env.API_KEY +
  "/filter.php?i=";

  const cdbDetails =   
  "https://www.thecocktaildb.com/api/json/v2/" +
  process.env.API_KEY +
  "/lookup.php?i=";


const nextQuestion = async (req, res) => {
  const quizQuestions = await data.drinks.getQuizQuestions();
  // get next question, whatever the path param is
  const question = quizQuestions[req.params.id];

  return res.json(question);
};

const getRecommendations = (req, res) => {
  let searchUrl = cdbUrl;
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

// TODO: get drink details function
const getDrinkDetails = (req, res) => {

  // cdbUrl + req.params.idDrink;
  const cdbDetails = 
  "https://www.thecocktaildb.com/api/json/v2/" +
  process.env.API_KEY + 
  "/lookup.php?i=" + req.params.idDrink;

  axios 
    .get(cdbDetails)
    .then(response => res.json(response.data.drinks))
    .catch(error => console.error(error));
};

module.exports = { nextQuestion, getRecommendations, getDrinkDetails };
