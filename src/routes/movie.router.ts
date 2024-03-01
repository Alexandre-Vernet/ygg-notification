import express from "express";
import { collection, getDocs, query } from "firebase/firestore";
import db from "../conf/firebase";
import { Movie } from "../interfaces/Movie";

const movie = express.Router();

movie.get("/", async (req, res) => {
    const q = query(collection(db, "movies"));

    const movies: Movie[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        movies.push(...Object.values(doc.data()));
    });
    res.send(movies);
});

export default movie;