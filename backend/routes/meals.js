const express = require("express");
const router = express.Router();
const mealsController = require("../controllers/mealsController");

router.route("/").get(mealsController.getAllMeals);

module.exports = router;
