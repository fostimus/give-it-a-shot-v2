const sequelize = require("sequelize");
const db = require("../models");
const utility = require("../utility");

const login = (req, res) => {
  res.json({ user: req.user.id });
};

const register = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // validate the POSTed data - making sure we have a name, an email, a pw
  if (!firstName || !lastName || !email || !password) {
    return res.json({
      message:
        "Please enter a first name, a last name, an email, and a password"
    });
  }

  // make sure the user doesn't already exist
  db.user
    .findOne({ where: { email } })
    .then(foundUser => {
      if (foundUser) {
        return res.json({ message: "A user with that email already exists" });
      }

      // if the user doesnt exist, create and save a user to the DB
      db.user
        .create({
          firstName,
          lastName,
          email,
          password
        })
        .then(newUser => {
          console.log("New user created!");
          res.json(newUser);
        })
        .catch(error => {
          if (error instanceof sequelize.ValidationError) {
            utility.sequelizeErrors(res, error);
          } else {
            res
              .status(500)
              .json({ message: "Unknown Server Error: contact admin" });
          }
        });
    })
    .catch(error => {
      console.error(error.toString());
    });
};

const logout = (req, res) => {
  if (!req.user) {
    return res.json({ message: "No User to log out" });
  }
  req.logout();
  res.json({ message: "User logged out" });
};

module.exports = {
  login,
  register,
  logout
};
