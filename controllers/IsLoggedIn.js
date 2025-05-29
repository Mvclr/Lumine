import { verifyJWT } from "./jwtController.js";
function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ loggedIn: false, message: "No token provided" });
  }
  verifyJWT(token, (err, decoded) => {
    if (err) {
      return res.status(401).json({ loggedIn: false, message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

export default isLoggedIn;