const http = require('http');
const fs = require('fs');
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
    switch(req.url){
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
        default:
            res.writeHead(404);
            res.end('Not Found!');
            break;
    }
});

server.listen(port, 'localhost', () => {
    console.log('Listening on port ' + port);
});