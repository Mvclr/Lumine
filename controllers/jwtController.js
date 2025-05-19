const JWTAuth = require("../classes/jwtAuth.js");
require("dotenv").config();
const secretKey = process.env.SECRET || "MySecret";
const jwtAuth = new JWTAuth(secretKey);

function verifyJWT(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }

  try {
    req.user = jwtAuth.verifyToken(token);
    next();
  } catch (err) {
    return res.redirect("/login");
  }
}

module.exports = { verifyJWT, jwtAuth };
