import express from "express";
import { Movie } from "./interfaces/Movie";
import { collection, getDocs, query } from "firebase/firestore";
import { Status } from "./interfaces/Status";
import db from "./conf/firebase";
import { Ygg } from "./Ygg";
import router from "./routes/router";


const port = process.env.port || 3000;
const server = express();

server.listen((port), () => {
    console.log(`Server is running on port ${port}`);
});

server.use(express.json());
server.use("/api", router);
server.get("/", (req, res) => {
    res.send("Hello World");
});


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