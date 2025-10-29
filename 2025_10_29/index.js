const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'static/strona_glowna.html'));
});

app.get('/o-nas', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'static/o-nas.html'));
});

app.get('/oferta', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'static/oferta.html'));
});

app.get('/kontakt', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'static/kontakt.html'));
});

app.post('/kontakt', (req, res) => {
    res.status(200);
    const data = [];
    for (let key in req.body) {
        data.push({key: key, value: req.body[key]});
        console.log(key + ': ' + req.body[key]);
    }
    res.status(302).setHeader('location', '/');
})

app.listen(PORT, () => {
    console.log(`runnig at port: ${PORT}`);
});