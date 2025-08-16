const User = require("../model/User");

const handleLogout = async (req, res) => {
  // Also delete the accessToken on client side by setting it to an empty string or removing it from localStorage or cookies.

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(200).json({ ok: true }); // No content

  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // clear refreshToken cookie on client since it doesn't exist in db
    return res.status(200).json({ ok: true });
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  // Remove refreshToken cookie
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.status(200).json({ ok: true });
};

module.exports = { handleLogout };
