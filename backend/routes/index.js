const express = require("express");
const registerRoute = require('./register');
const loginRoute = require('./login');
const logoutRoute = require('./logout');
const refreshRoute = require('./refresh');
const orderRoutes = require('./orders');
const mealRoutes = require('./meals');

const router = express.Router();

router.use('/register', registerRoute);
router.use('/login', loginRoute);
router.use('/logout', logoutRoute);
router.use('/refresh', refreshRoute);
router.use('/orders', orderRoutes);
router.use('/meals', mealRoutes);

module.exports = router;
