const Meal = require("../model/Meal.js");

const getAllMeals = async (req, res) => {
  const meals = await Meal.find().exec();
  if (!meals) return res.status(404).json({ message: "No meals found." });
  res.json(meals);
};

module.exports = { getAllMeals };
