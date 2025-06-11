import express from "express";
import path from "path";
import { verifyJWTMiddleware } from "../controllers/jwtController.js";
import connection from "../db/db_server.js";
import isLoggedIn from "../controllers/IsLoggedIn.js";
import { fileURLToPath } from "url";
import fetch from 'node-fetch'

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use(express.static(path.join(path.dirname(''), "../public")));

router.get('/saves', (req,res) => {
    res.sendFile(path.join(__dirname, '../views', 'saves.html'))
});



router.post('/save/:id', async (req, res) => {
  try {
    const imdbId = req.params.id;
    const username = req.cookies?.username;
    if (!username) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    // Buscar o id do usuário pelo username
    connection.query(
      "SELECT id FROM users WHERE username = ?",
      [username],
      (err, userRows) => {
        if (err) {
          return res.status(500).json({ error: "Erro ao buscar usuário." });
        }
        if (userRows.length === 0) {
          return res.status(404).json({ error: "Usuário não encontrado." });
        }
        const userId = userRows[0].id;

        // Inserir na tabela favorites
        connection.query(
          "INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)",
          [userId, imdbId],
          (err2) => {
            if (err2) {
              return res.status(500).json({ error: "Erro ao adicionar aos favoritos." });
            }
            res.status(201).json({ message: "Filme adicionado aos favoritos com sucesso." });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar aos favoritos." });
  }
});





export default router;

// IMPORTANTE
    /*
    A rota recebe um ID do frontend ao clicar no botão de favoritar e então coloca joga esse ID para um array(banco de dados) que vai possuir o ID do filme e o ID do usuario que o favoritou.
    Relação n para n. --> Um usuário pode favoritar vários filmes, e um filme pode ser favoritado por vários usuários.
    Deve se possuir também uma rota para Unsave dos filmes, a rota assim como a outra receberá o ID do filme atráves do frontend, e então excluirá do array(banco de dados). A página de saves carregará os filmes lá colocados atráves de um fetch para o banco.
    
    Rota para adicionar aos favoritos --> /save/:id
    Rota para retirar dos favoritos --> /unsave/:id
    Rota para gerar os filmes na página de saves --> /api/saves
    Rota para dar redirect à página de saves --> /saves
*/

