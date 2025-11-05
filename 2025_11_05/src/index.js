import express from 'express';
import mysql from 'mysql2/promise';
import {join} from "node:path";

const app = express();
const PORT = 3000;
const dir = process.cwd();

const pool = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'messenger',
})

async function query(sql, params){
    try{
        const [rows] = await pool.query(sql, params);
        return rows;
    }catch(err){
        console.log(err);
    }
}

app.use(express.static(join(dir, 'public/static')));
app.use(express.static(join(dir, 'public/images')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).sendFile(join(dir, 'public/static/strona_glowna.html'));
});

app.get('/o-nas', (req, res) => {
    res.status(200).sendFile(join(dir, 'public/static/o-nas.html'));
});

app.get('/oferta', (req, res) => {
    res.status(200).sendFile(join(dir, 'public/static/oferta.html'));
});

app.get('/kontakt', (req, res) => {
    res.status(200).sendFile(join(dir, 'public/static/kontakt.html'));
});

app.post('/kontakt', async (req, res) => {
    const data = (req.body);

    await query('INSERT INTO `messages` (imie, nazwisko, email, wiadomosc) VALUES (?,?,?,?)', [data.imie, data.nazwisko, data.email, data.wiadomosc])
        .catch(err => console.log(err));
    console.log(data);

    res.status(302).redirect('/');
})

app.get('/api/contact-messages', async (req, res) => {
    const rows = await query('SELECT * FROM `messages`')
        .catch(err => res.status(500).end(err));
    res.status(200).json(rows);
})

app.get('/api/contact-messages/:id', async (req, res) => {
    const rows = await query('SELECT * FROM `messages` WHERE `id` = ?', [req.params.id])
        .catch(err => res.status(500).end(err));

    if(rows.length === 0) res.status(404).end("Not Found");
    else res.status(200).json(rows);
})

app.listen(PORT, () => {
    console.log(`runnig at port: ${PORT}`);
});