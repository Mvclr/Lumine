const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("../classes/User.js");
const connection = require("../db/db_server.js");
const router = express.Router();

router.use(express.static(path.join(__dirname, "../public")));

router.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "registro.html"));
});

router.post("/cadastro", async (req, res) => {
  const { email, username, password } = req.body;
  const userVerify = await new Promise((resolve, reject) => {
    connection.query(
      "SELECT id FROM users WHERE username = ?",
      [username],
      (error, results) => {
        if (error) {
          console.error("Error checking user:", error);
          reject(res.status(500).json({ message: "Erro ao verificar usuário" }));
        } else {
          resolve(results.length > 0);
        }
      }
    );
  });
  if (userVerify) {
    return res
      .status(401)
      .json({ message: "Usuário já cadastrado, tente outro nome de usuário" });
  }

  const newUser = new User(email, username, password);
  await newUser.hashPassword();
  connection.query(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [newUser.email, newUser.username, newUser.password],
    (error, results) => {
      if (error) {
        console.error("Error inserting user:", error);
        return res.status(500).json({ message: "Erro ao cadastrar usuário" });
      }
      console.log("User registered successfully:", results);
      res.sendFile(path.join(__dirname, "../views", "login.html"));
    }
  );
});

module.exports = router;