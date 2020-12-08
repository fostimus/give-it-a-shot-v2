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
    if (entry.isFile()) {
      // if config file, add config data to quizPage
      if (entry.name.includes("config.json")) {
        const configData = require(directoryPath + "/config.json");
        quizPage.position = configData.position;
        quizPage.title = configData.title;
        quizPage.submitText = configData.submitText;
      }
      // else, add image name to options array
      else {
        const nameOfFile = entry.name.replace(".png", "");
        quizPage.options.push({ name: nameOfFile });
      }
    }
    if (entry.isDirectory()) {
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

  // console.log(dirEntries);
  for (const entry of dirEntries) {
    // console.log(entry);
    // if the entry is a file and is a png, save it to database
    if (entry.isFile() && entry.name.includes(".png")) {
      /** create image to be save to DB, using:
       * 1) name of file w/o extenstion
       * 2) binary image data
       */
      const nameOfFile = entry.name.replace(".png", "");
      const image = {
        name: nameOfFile,
        image: fs.readFileSync(directoryPath + "/" + entry.name)
      };

      files.push(image);
    }
    // if directory, recurse
    if (entry.isDirectory()) {
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

module.exports = {
  load,
  databaseLoad
};
