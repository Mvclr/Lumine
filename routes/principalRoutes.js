const express = require("express");
const path = require("path");
const { verifyJWT, verifyJWTMiddleware } = require("../controllers/jwtController.js");
const connection = require("../db/db_server.js");
const isLoggedIn = require("../controllers/IsLoggedIn.js");
const router = express.Router();


router.use(express.static(path.join(__dirname, "../public")));

router.get("/", verifyJWTMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});

router.get("/principal", verifyJWTMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "principal.html"));
});

router.get("/api/IsLoggedIn", isLoggedIn, (req, res) => {
  const token = req.cookies.token;
  const username = req.cookies.username;
  const user = connection.query(
    "SELECT username from users where username = ?" , [username],
    (error, results) => {
      if (error) {
        console.error("Erro buscando nome usuário:", error);
        return res.status(500).json({ message: "Erro ao verificar usuário" });
      } else{
        return res.status(200).json({ loggedIn: true, user: results });
      }
    }

  )
  
  
});

module.exports = router;