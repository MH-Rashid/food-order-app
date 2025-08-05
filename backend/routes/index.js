const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");
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

router.use('/orders', verifyJWT, orderRoutes);
router.use('/meals', verifyJWT, mealRoutes);

module.exports = router;
