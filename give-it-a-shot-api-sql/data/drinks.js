const db = require("../models");
const images = require("./images");

let quizPages = [];

const populateImages = async quizPage => {
  for (const option of quizPage.options) {
    const returnedImage = await db.image.findOne({
      where: {
        name: option.name
      }
    });
    option.image = Buffer.from(returnedImage.image).toString("base64");
    // encoding to base64 removes special characters, so we need to add them back in
    option.image = "data:image/jpeg;base64," + option.image;
  }
};

const getQuizQuestions = async () => {
  // if quizPages is empty, load and populate them from fs & db
  if (quizPages.length === 0) {
    quizPages = await images.load();

    // populate images from database
    for (quizPage of quizPages) {
      await populateImages(quizPage);

      quizPage.numPages = quizPages.length;
    }
  }

  return quizPages;
};

// note to self: this is ES5 syntax. differs from export const.. and export default const.. in that it exports to top level module's exports, and the other two ARE ES6! ES6 ones are used in modern ES6 import { } from "" syntax, while ES5 is for const moduleName = require("")
module.exports = { getQuizQuestions };
