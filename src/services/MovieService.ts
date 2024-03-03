import { Movie } from "../interfaces/Movie";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import db from "../conf/firebase";

const q = query(collection(db, "movies"));

const getMovies = async () => {
    const movies: Movie[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        movies.push(...Object.values(doc.data()));
    });

    return movies;
};


const addMovie = async (movie: Movie) => {
    // Generate a random id
    const id = Math.random().toString(36).substring(7);

    await setDoc(doc(db, "movies", "oM9AihvsiOLx3Or3gnzk"), {
        [id]: movie
    }, { merge: true });
}

export { getMovies, addMovie };