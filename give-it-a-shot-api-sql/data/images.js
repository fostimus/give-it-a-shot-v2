const fs = require("fs");

const currentDirectory = "images";
const imageDirectory = __dirname + "/" + currentDirectory;

async function loadImages(directoryPath) {
  const dirEntries = await fs.promises.readdir(directoryPath, {
    withFileTypes: true
  });

  const options = [];
  const thisDir = directoryPath.replace(/^.*[\\\/]/, "");
  const quizPage = {
    field: thisDir,
    options: []
  };
  for (const entry of dirEntries) {
    if (entry.isFile() && entry.name !== ".DS_Store") {
      // if config file, add config data to quizPage
      if (entry.name.includes("config.json")) {
        const configData = require(directoryPath + "/config.json");
        quizPage.position = configData.position;
        quizPage.title = configData.title;
        quizPage.submitText = configData.submitText;
        quizPage.ingredient = configData.ingredient;
      }
      // else, add image name to options array
      else {
        const nameOfFile = replaceFilename(entry.name);
        quizPage.options.push({ name: nameOfFile });
      }
    }
    if (entry.isDirectory() && entry.name !== ".DS_Store") {
      const returned = await loadImages(imageDirectory + "/" + entry.name);

      quizPage.options = quizPage.options.concat(returned);
    }
  }

  // if we are in top level recursion, don't return images field
  if (quizPage.field === currentDirectory) {
    return quizPage.options;
  }

  return [quizPage];
}

async function getAllFiles(directoryPath) {
  const dirEntries = await fs.promises.readdir(directoryPath, {
    withFileTypes: true
  });

  let files = [];

  for (const entry of dirEntries) {
    // if the entry is a file and is a png, save it to database
    if (entry.isFile() && isFile(entry.name) && entry.name !== ".DS_Store") {
      /** create image to be save to DB, using:
       * 1) name of file w/o extenstion
       * 2) binary image data
       */
      const nameOfFile = replaceFilename(entry.name);
      const image = {
        name: nameOfFile,
        image: fs.readFileSync(directoryPath + "/" + entry.name),
        fileExt: entry.name.slice(entry.name.length - 3)
      };

      files.push(image);
    }
    // if directory, recurse
    if (entry.isDirectory() && entry.name !== ".DS_Store") {
      files = files.concat(await getAllFiles(directoryPath + "/" + entry.name));
    }
  }
  return files;
}

async function load() {
  const pageData = await loadImages(imageDirectory);
  // sort page data by position
  pageData.sort((p1, p2) => {
    return p1.position < p2.position ? -1 : 1;
  });
  return pageData;
}

async function databaseLoad() {
  return await getAllFiles(imageDirectory);
}

/**
 * helpers
 */

function replaceFilename(filename) {
  return filename.replace(/.png|.svg/, "");
}

function isFile(file) {
  return file.includes(".png") || file.includes(".svg");
}

module.exports = {
  load,
  databaseLoad
};
