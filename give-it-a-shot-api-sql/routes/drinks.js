const router = require("express").Router();
const ctrl = require("../controllers");

router.get("/question/:id", ctrl.drinks.nextQuestion);
router.post("/results", ctrl.drinks.getRecommendations);
router.get("/random", ctrl.drinks.randomDrink);
router.get("/:drinkId", ctrl.drinks.getDrinkDetails);

module.exports = router;
