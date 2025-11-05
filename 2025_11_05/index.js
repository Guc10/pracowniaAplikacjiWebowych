const express = require('express');
const mysql = require('mysql2')
const path = require('path');

const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'admin',
});

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));

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
    const data = (req.body);
    connection.execute(
        'INSERT INTO `messages` (imie, nazwisko, email, wiadomosc) VALUES (?,?,?,?)',
        [data.imie, data.nazwisko, data.email, data.wiadomosc],
        function (err, result) {
            if (err) {
                console.log(err);
            }else{
                console.log(result);
                console.log(data);
            }
        }
    );

    res.status(302).redirect('/');
})

app.get('/api/contact-messages', (req, res) => {
    connection.execute(
        'SELECT * FROM `messages`',
        function (err, result) {
            if (err) {
                console.log(err);
            }
            res.status(200).json(result);
        }
    )
})

app.get('/api/contact-messages/:id', (req, res) => {
    connection.execute(
        'SELECT * FROM `messages` WHERE `id` = ?',
        [req.params.id],
        function (err, result) {
            if (err) {
                console.log(err);
            }
            if (result.length == 0) {
                res.status(404).send('Not Found');
            }else{
                res.status(200).json(result);
            }
        }
    )
})

app.listen(PORT, () => {
    console.log(`runnig at port: ${PORT}`);
});