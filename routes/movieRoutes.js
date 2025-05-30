import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import Movie from '../classes/movie.js';
dotenv.config();

const FANART_API_KEY = process.env.FANART_API_KEY;
const OMDB_API_KEY = process.env.OMDB_API_KEY;
const router = express.Router();

router.use(express.static('public'));

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

router.get('/movie/:id', async (req, res) => {
  const { id } = req.params;

  try {
    
    const omdbResponse = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`);
    const data = await omdbResponse.json();

    if (data.Response === "True") {
      let posterUrl = '';
      
      try {
        const fanartResponse = await fetch(`https://webservice.fanart.tv/v3/movies/${id}?api_key=${FANART_API_KEY}`);
        const fanartData = await fanartResponse.json();
        if (fanartData.movieposter && fanartData.movieposter.length > 0) {
          posterUrl = fanartData.movieposter[0].url;
        }
      } catch (err) {
        console.warn(`Poster não encontrado no Fanart.tv para ${id}`);
      }

      
      res.json({
        synopsis: data.Plot,
        name: data.Title,
        year: data.Year,
        imdbRating: data.imdbRating,
        runtime: data.Runtime,
        posterUrl: posterUrl 
      });
    } else {
      res.status(404).json({ error: 'Filme não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar sinopse:', error);
    res.status(500).json({ error: 'Erro ao buscar sinopse.' });
  }
});

router.get('/api/mainMovies', async (req, res) => {
  try {
    const movieData = await Promise.all(
      movieTitles.map(async (titulo) => {
        // Dados básicos do filme por OMDB API
        const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(titulo)}`);
        const data = await response.json();

        if (data.Response === "True" && data.imdbID) {
          const imdbID = data.imdbID;
          // Busca do POSTER unicamente pelo Fanart API, usando o id do IMDB
          let posterUrl = '';
          try {
            const fanartResponse = await fetch(`https://webservice.fanart.tv/v3/movies/${imdbID}?api_key=${FANART_API_KEY}`);
            const fanartData = await fanartResponse.json();
            if (fanartData.movieposter && fanartData.movieposter.length > 0) {
              posterUrl = fanartData.movieposter[0].url;
              console.log(`Poster encontrado: ${posterUrl}`);
            } else {
              return null
            }
          } catch (err) {
            console.warn(`Poster não encontrado no Fanart.tv para ${titulo}`);
            return null;
          }

          // Passando pra classe antes de retornar todas as infos
          const movie = new Movie(
            data.Title,
            data.Actors,
            data.Director,
            data.Year,
            data.imdbRating,
            data.Runtime
            
          );
          movie.posterUrl = posterUrl;
          movie.imdbID = imdbID;
          return movie;
        } else {
          console.error(`Filme não encontrado: ${titulo}`);
          return null;
        }
      })
    );

    const validMovies = movieData.filter(movie => movie !== null);
    res.json(validMovies);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).json({ error: 'Erro ao buscar filmes.' });
  }
});

export default router;
