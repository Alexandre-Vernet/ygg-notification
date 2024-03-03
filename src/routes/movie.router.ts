import express from "express";
import { Movie } from "../interfaces/Movie";
import { addMovie, getMovies } from "../services/MovieService";
const movie = express.Router();


movie.get("/", async (req, res) => {
    getMovies()
        .then(movies => {
            res.send(movies);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

movie.post("/", async (req, res) => {
    const movie: Movie = req.body;

    addMovie(movie)
        .then(() => {
            res.send(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
});

export default movie;