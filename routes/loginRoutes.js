import express from "express";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtAuth } from "../controllers/jwtController.js";
import connection from "../db/db_server.js";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use(express.static(path.join(__dirname, "../public")));

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../docs", "login.html"));
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
          return reject(res.status(500).json({ message: "Erro ao verificar usuário" }));
        } else {
          resolve(results[0]);
        }
      }
    );
  });
  
  if (!foundUser) {
    console.log("Senha ou usuário incorreto");
    return res.status(401).json({ message: "Usuário ou senha incorretos" });
  } else {
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      console.log("Senha ou usuário incorreto");
      return res.status(401).json({ message: "Usuário ou senha incorretos" });
    } else {
      const token = jwt.sign({ user: foundUser.username }, jwtAuth.getSecretKey(), {
        expiresIn: 30000,
      });
      res.cookie("token", token, { httpOnly: true });
      res.cookie("username", foundUser.username, { httpOnly: true });
      return res.sendFile(path.join(__dirname, "../views", "index.html"));
    }
  }
});

export default router;