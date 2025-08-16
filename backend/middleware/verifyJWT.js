const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1]
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid token" });
      req.user = decoded.UserInfo.username; // attach username to request object for downstream use
      next()
    }
  )
}

module.exports = verifyJWT