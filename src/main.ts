import { Movie } from "./interfaces/Movie";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { Status } from "./interfaces/Status";
import firebaseConfig from "./conf/firebase";
import { Ygg } from "./Ygg";

const db = getFirestore(initializeApp(firebaseConfig));


// schedule.scheduleJob('0 18 * * *', () => {
//
// });


const app = async () => {
    const q = query(collection(db, "movies"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const userId = doc.id;
        const wantedMovies: Movie[] = Object.values(doc.data());

        wantedMovies
            .filter(movie => movie.status === Status.IN_PROGRESS)
            .forEach(movie => {
                console.log(movie.name)
                Ygg.search(movie.name, async (err, movies: Movie[]) => {
                if (err) {
                    return console.error(new Date(), err);
                }

                if (movies.length > 0) {
                    // Send notification
                    console.log(`Sending notification to ${userId}`);
                }
            });
        });
    });
}

app();