const express = require('express');
const fs = require('fs');
const url = require("url");
const mime = require('mime-types');
const path = require("node:path");

const app = express();
const port = 8080;

var fileName;

var html = '<!DOCTYPE html>\n' +
    '<html>\n' +
    '<head>\n' +
    '    <meta charset="utf-8">\n' +
    '</head>\n' +
    '<body>\n' +
    '<p>Hello, html!</p>\n' +
    '</body>\n' +
    '</html>';

var object = {
    number: 67,
    name: 'Dave'
}

app.get('/', (req, res) => {
    res.status(200).send('Strona glowna');
});

app.get('/json', (req, res) => {
    res.status(200).json(object);
});

app.get('/html', (req, res) => {
    res.status(200).send(html);
});

app.get('/file', (req, res) => {
    res.sendFile(__dirname + '/page.html');
});

app.get('/get_params', (req, res) => {
    const data = req.query;
    const date = Date.now();
    fileName = `./assets/params_${date}.json`;

    fs.writeFile(fileName, JSON.stringify(data), 'utf8', (err) => {
        if (err){
            res.status(404).send(err);
        }else{
            console.log(data);
        }
    });

    res.status(200).json({
        ok: "ok"
    });
})

app.use(express.static(path.join(__dirname, '/assets')), (req, res) => {
    res.status(404).json({'Not found': req.url});
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});