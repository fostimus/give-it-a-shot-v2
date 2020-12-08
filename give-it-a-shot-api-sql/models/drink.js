"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class drink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.drink.belongsToMany(models.user, {
        through: "favorites"
      });
      models.drink.belongsToMany(models.ingredient, {
        through: "drinkIngredients"
      });
    }
  }
  drink.init(
    {
      name: DataTypes.STRING,
      liquor: DataTypes.STRING,
      category: DataTypes.STRING,
      cocktailDbId: DataTypes.STRING,
      imageUrl: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "drink"
    }
  );
  return drink;
};
