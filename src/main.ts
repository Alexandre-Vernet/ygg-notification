import Yggtorrent from 'yggtorrent-api';
import schedule from 'node-schedule';
import { Movie } from "./Movie";

const ygg = new Yggtorrent({
    host: 'https://yggtorrent.qa',
    searchhost: 'https://www2.yggtorrent.si',
});


schedule.scheduleJob('0 18 * * *', () => {
    ygg.search('chernobyl s01', (err, movies: Movie[]) => {
        if (err) {
            return console.error('error', err);
        }

        console.log(movies);
    })
});