import express from "express";
import path from "path";
import { verifyJWTMiddleware } from "../controllers/jwtController.js";
import connection from "../db/db_server.js";
import isLoggedIn from "../controllers/IsLoggedIn.js";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use(express.static(path.join(path.dirname(''), "../public")));

router.get("/", verifyJWTMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});

router.get("/principal", verifyJWTMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "principal.html"));
});

router.get("/api/IsLoggedIn", isLoggedIn, (req, res) => {
  const username = req.cookies.username;
  connection.query(
    "SELECT username from users where username = ?" , [username],
    (error, results) => {
      if (error) {
        console.error("Erro buscando nome usuário:", error);
        return res.status(500).json({ message: "Erro ao verificar usuário" });
      } else{
        return res.status(200).json({ loggedIn: true, user: results[0] });
      }
    }
  );
});

export default router;