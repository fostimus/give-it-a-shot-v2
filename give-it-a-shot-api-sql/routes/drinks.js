const router = require("express").Router();
const ctrl = require("../controllers");

router.get("/question/:id", ctrl.drinks.nextQuestion);
router.post("/results", ctrl.drinks.getRecommendations);
router.get("/drink/:idDrink", ctrl.drinks.getDrinkDetails);

module.exports = router;
