import Yggtorrent from 'yggtorrent-api';

const ygg = new Yggtorrent({
    host: 'https://yggtorrent.qa',
    searchhost: 'https://www2.yggtorrent.si',
});


ygg.search('chernobyl s01', (err, data) => {
    if (err) return console.log('error', err);

    console.log(data)
})