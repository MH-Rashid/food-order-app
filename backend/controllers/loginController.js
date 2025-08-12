const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); // Unauthorised

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Add refresh token to found user in DB
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });
    res.json({
      accessToken,
      user: {
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
        username: foundUser.username,
      },
    });

    // Also save accessToken on client side, e.g. in localStorage or sessionStorage.
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
