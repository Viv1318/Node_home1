const http = require('http');


const server = http.createServer((req, res) => {
    console.log('Запрос отправден');

    if (req.url === '/') {
        res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
        res.end('<a href="/about">Обо мне!</a>');
        
    } else if (req.url === '/about') {
        res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
        res.end('<a href="/">Главная');
        
    } else {
        res.writeHead(404, {'content-type': 'text/plain; charset=utf-8'})
        res.end('404 - Страница не найдена');
    }
    

});

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порте ${port}`);
});