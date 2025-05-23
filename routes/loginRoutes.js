const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtAuth } = require("../controllers/jwtController.js");
const connection = require("../db/db_server.js");

const router = express.Router();

router.use(express.static(path.join(__dirname, "../public")));

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "login.html"));
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (error, results) => {
        if (error) {
          console.error("Error checking user:", error);
          reject(res.status(500).json({ message: "Erro ao verificar usuário" }));
        } else {
          resolve(results[0]); 
        }
      }
    );
  });

  if (!foundUser) {
    return message = "Usuário ou senha incorretos";
    console.log("Senha ou usuário incorreto");
  }

  const passwordMatch = await bcrypt.compare(password, foundUser.password);
  if (!passwordMatch) {
    console.log("Senha ou usuário incorreto");
  }

  const token = jwt.sign({ user: foundUser.username }, jwtAuth.getSecretKey(), {
    expiresIn: 30000,
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 30000000 });
  return res.sendFile(path.join(__dirname, "../views", "index.html"));
});



module.exports = router;