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

// to be change resistant, refactor this to finding the "liquor" field
const getLiquorChoices = async (req, res) => {
  const quizQuestions = await data.drinks.getQuizQuestions();

  if (quizQuestions[0].field === "liquor") {
    const question = quizQuestions[0].options.map(option => {
      return option.name;
    });

    return res.json(question);
  } else {
    res.json({ error: "none" });
  }
};

const getRecommendations = (req, res) => {
  console.log(req.body);
  let searchUrl = cdbUrl + process.env.API_KEY + "/filter.php?i=";
  for (const key of Object.keys(req.body)) {
    if (req.body[key].ingredient) {
      searchUrl = searchUrl + req.body[key].value + ",";
    }
  }

  //remove trailing ','
  searchUrl = searchUrl.substr(0, searchUrl.length - 1);

  axios
    .post(searchUrl)
    .then(response => {
      console.log(response.data.drinks);
      if (response.data.drinks && response.data.drinks === "None Found") {
        res.json({ drinks: [] });
      } else {
        res.json(response.data.drinks);
      }
    })
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

const randomLiquor = (req, res) => {
  let randomLiquorUrl =
    cdbUrl + process.env.API_KEY + "/filter.php?i=" + req.params.liquor;

  console.log(randomLiquorUrl);

  axios
    .get(randomLiquorUrl)
    .then(response => {
      const drinks = response.data.drinks;
      console.log(drinks);
      const randIndex = Math.floor(Math.random() * drinks.length);
      res.json(drinks[randIndex]);
    })
    .catch(error => console.error(error));
};

const darks = ["whiskey", "brandy", "rum"];
const lights = ["vodka", "tequila", "gin"];

const randomColor = async (req, res) => {
  let randomLiquorUrl = cdbUrl + process.env.API_KEY + "/filter.php?i=";

  let drinks = [];

  if (req.params.color.toLowerCase() === "dark") {
    for (liquor of darks) {
      const response = await axios.get(randomLiquorUrl + liquor);
      drinks = drinks.concat(response.data.drinks);
    }
  }
  if (req.params.color.toLowerCase() === "light") {
    for (liquor of lights) {
      const response = await axios.get(randomLiquorUrl + liquor);
      drinks = drinks.concat(response.data.drinks);
    }
  }

  const randIndex = Math.floor(Math.random() * drinks.length);
  res.json(drinks[randIndex]);
};

module.exports = {
  nextQuestion,
  getRecommendations,
  getDrinkDetails,
  randomDrink,
  randomLiquor,
  randomColor,
  getLiquorChoices
};
