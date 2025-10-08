const http = require('http');
const fs = require('fs');
const url = require('url');
const mime = require('mime-types');
const port = 8080;

var fileName;

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
    const pathname = myUrl.pathname;
    switch(pathname) {
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
            fileName = `./params_${data}.json`;

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
            var mime_type = mime.lookup(pathname);
            fileName = './assets' + pathname;
            fs.readFile(fileName, (err, data) => {
                if (err){
                    res.writeHead(404, {"content-type": "application/json"});
                    res.end(JSON.stringify({'Not found': pathname}, null, 2));
                }else{
                    res.writeHead(200, {'content-type': mime_type});
                    res.end(data);
                }
            })
            break;
    }
});

server.listen(port, 'localhost', () => {
    console.log('Listening on port ' + port);
});