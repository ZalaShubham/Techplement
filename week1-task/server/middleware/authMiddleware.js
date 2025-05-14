const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticatedUser(req, res, next) {
  const token = req.cookies?.token || req.header.authorization?.split(" ")[1];

  if (!token) {
    return res.redirect("/sign-in");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token verification failed:", error);
    return res.redirect("/sign-in");
  }
}

module.exports = authenticatedUser;
