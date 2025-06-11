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

const movieTitles = [
  "The Shawshank Redemption", "The Godfather", "The Godfather: Part II", "Goodfellas", "Pulp Fiction",
  "Forrest Gump", "Fight Club", "Se7en", "The Silence of the Lambs", "Saving Private Ryan",
  "Inception", "The Matrix", "Interstellar", "The Lord of the Rings: The Return of the King",
  "The Lord of the Rings: The Fellowship of the Ring", "The Lord of the Rings: The Two Towers",
  "Star Wars: A New Hope", "The Empire Strikes Back", "Rogue One: A Star Wars Story", "Blade Runner 2049",
  "Spirited Away", "Pan's Labyrinth", "The Dark Knight", "The Dark Knight Rises", "The Avengers",
  "Iron Man", "Black Panther", "Avengers: Endgame", "Guardians of the Galaxy", "Thor: Ragnarok",
  "Captain America: The Winter Soldier", "Doctor Strange", "Logan", "Deadpool", "The Batman",
  "The Lion King", "Coco", "Up", "Toy Story", "Inside Out", "Finding Nemo", "Monsters, Inc.",
  "Ratatouille", "Soul", "WALL·E", "The Green Mile", "Gladiator", "Titanic", "The Prestige",
  "The Departed", "Joker", "The Pianist", "A Beautiful Mind", "The Social Network", "Shutter Island",
  "The Wolf of Wall Street", "La La Land", "The Intouchables", "The Truman Show", "The Perks of Being a Wallflower",
  "The Pursuit of Happyness", "The Notebook", "Silver Linings Playbook", "La Vita è Bella",
  "Life of Pi", "The Curious Case of Benjamin Button", "Catch Me If You Can", "The Terminal",
  "Bridge of Spies", "Memento", "Her", "Ex Machina", "The Big Short", "Knives Out", "Arrival",
  "Prisoners", "Nightcrawler", "Requiem for a Dream", "Trainspotting", "American History X",
  "Donnie Darko", "Amélie", "The Sixth Sense", "Cast Away", "Slumdog Millionaire",
  "Back to the Future", "The Grand Budapest Hotel", "Braveheart", "The Revenant", "Inglourious Basterds",
  "Casino Royale", "Skyfall", "No Country for Old Men", "There Will Be Blood", "Mad Max: Fury Road",
  "The Hateful Eight", "Once Upon a Time in Hollywood", "Everything Everywhere All at Once", "The Whale",
  "Léon: The Professional"
];


router.get("/category", verifyJWTMiddleware, (req, res) => {
     res.sendFile(path.join(__dirname, "../docs/category.html"));

})
router.get("/api/filtra/:genre", verifyJWTMiddleware, async (req, res) => {
  const { genre } = req.params;
  try {
    connection.query(
      "SELECT movie_id AS imdbID, title, year, poster_url FROM movies WHERE genres LIKE ?",
      [`%${genre}%`],
      (err, results) => {
        if (err) {
          console.error("Erro ao buscar filmes por categoria:", err);
          return res.status(500).json({ error: "Erro ao buscar filmes por categoria." });
        }
        res.json(results);
      }
    );
  } catch (error) {
    console.error("Erro ao buscar filmes por categoria:", error);
    res.status(500).json({ error: "Erro ao buscar filmes por categoria." });
  }
});

export default router;