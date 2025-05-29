import JWTAuth from "../classes/jwtAuth.js";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.SECRET || "MySecret";
const jwtAuth = new JWTAuth(secretKey);

function verifyJWTMiddleware(req, res, next) {
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

function verifyJWT(token, callback){
  try {
    const decoded = jwtAuth.verifyToken(token);
    callback(null, decoded);
  } catch (err) {
    callback(err);
  }
}

export { verifyJWTMiddleware, verifyJWT, jwtAuth };
