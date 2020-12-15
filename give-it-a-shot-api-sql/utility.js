const sequelize = require("sequelize");

const sequelizeErrors = (res, error) => {
  if (error.errors && error.errors.length > 0) {
    const err = error.errors[0];
    const returnError = {
      field: err.path,
      validation: err.validatorKey,
      message: err.message
    };

    res.status(400).json(returnError);
  }
};

module.exports = {
  sequelizeErrors
};
