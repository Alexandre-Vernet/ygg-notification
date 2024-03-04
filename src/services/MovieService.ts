import { Movie } from "../interfaces/Movie";
import { collection, deleteField, doc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import db from "../conf/firebase";

const q = query(collection(db, "movies"));

const getMovies = async () => {
    const movies: Movie[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        Object.entries(doc.data()).forEach(([key, movie]) => {
            movies.push({
                id: key,
                ...movie
            });
        });

    });

    return movies.sort((a, b) => a.name.localeCompare(b.name));
};


const addMovie = async (movie: Movie) => {
    // Generate a random id
    const id = Math.random().toString(36).substring(7);

    await setDoc(doc(db, "movies", "oM9AihvsiOLx3Or3gnzk"), {
        [id]: movie
    }, { merge: true });

    return movie;
}

const deleteMovie = async (movieId: string) => {
    const movieRef = doc(db, 'movies', 'oM9AihvsiOLx3Or3gnzk');

    await updateDoc(movieRef, {
        [movieId]: deleteField()
    });
}

export { getMovies, addMovie, deleteMovie };