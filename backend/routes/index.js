const express = require("express");
const orderRoutes = require('./orders');
const mealRoutes = require('./meals.js');

const router = express.Router();

router.use('/orders', orderRoutes);
router.use('/meals', mealRoutes);

module.exports = router;
