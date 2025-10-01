const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 8080;

let html = '<!DOCTYPE html>\n' +
    '<html>\n' +
    '<head>\n' +
    '    <meta charset="utf-8">\n' +
    '</head>\n' +
    '<body>\n' +
    '<p>Hello, html!</p>\n' +
    '</body>\n' +
    '</html>';

let object = {
    number: 67,
    name: 'Dave'
}

const server = http.createServer((req, res) => {
    const myUrl = url.parse(req.url, true);
    switch(myUrl.pathname) {
        case '/':
            res.writeHead(200, {'content-type': 'text-plain'});
            res.end('Strona glowna');
            break;
        case '/json':
            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify(object, null, 2));
            break;
        case '/html':
            res.writeHead(200, {'content-type': 'text/html'});
            res.end(html.toString());
            break;
        case '/file':
            fs.readFile('./page.html', (err, data) => {
                if (err){
                    res.writeHead(404);
                    res.end('Not Found!');
                }else{
                    res.writeHead(200, {'content-type': 'text/html'});
                    res.end(data.toString());
                }
            })
            break;
        case '/get_params':
            res.writeHead(200, {'content-type': 'application/json'});

            const query = JSON.stringify(myUrl.query, null, 2);
            var data = Date.now();
            let fileName = `./params_${data}.json`;

            fs.writeFile(fileName, query, 'utf8', (err, data) => {
                if (err){
                    res.writeHead(404);
                }else{
                    console.log(query);
                }
            });

            res.end(JSON.stringify({ok: 'ok'}, null, 2));
            break;
        default:
            res.writeHead(404);
            res.end('Not Found!');
            break;
    }
});

server.listen(port, 'localhost', () => {
    console.log('Listening on port ' + port);
});