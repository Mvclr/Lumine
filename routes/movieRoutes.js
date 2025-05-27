const express = require('express');
const path = require('path');
const router = express.Router();
require ('dotenv').config
const API_KEY = process.env.API_KEY
const Movie = require('../classes/movie')
const fetch = require('node-fetch')

router.use(express.static('public'));

const movieTitles = [
  "The Shawshank Redemption",
  "The Godfather",
  "Inception",
  "Pulp Fiction",
  "The Dark Knight",
  "Forrest Gump",
  "Fight Club",
  "Titanic",
  "The Matrix",
  "Interstellar",
  "The Lord of the Rings: The Fellowship of the Ring",
  "Jurassic Park",
  "Gladiator",
  "The Silence of the Lambs",
  "Saving Private Ryan",
  "Braveheart",
  "The Green Mile",
  "The Lion King",
  "Avatar",
  "Back to the Future"
];

router.get('/api/mainMovies/', async (req, res) => {
  try {
    const movieData = await Promise.all(
      movieTitles.map(async (titulo) => {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(titulo)}`);
        const data = await response.json();
        if (data.Response === "True") {
          return new Movie(
            data.Title,
            data.Actors,
            data.Director,
            data.Year,
            data.Poster,
            data.imdbRating,
            data.Runtime
          );
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


module.exports = router
