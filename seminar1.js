const http = require('http');

let count = 0;
let countAbout = 0;
let count404 = 0;

const server = http.createServer((req, res) => {
    console.log('Запрос отправден');


    if (req.url === '/') {
        res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
        res.end('<a href="/about">Обо мне!</a>'
            + '<p>Количество запросов: '+ ++count + '</p>');
        
        
    } else if (req.url === '/about') {
        res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
        res.end('<a href="/">Главная</a>' + '<p>Количество запросов: '+ ++countAbout + '</p>');
        
        
    } else {
        res.writeHead(404, {'content-type': 'text/plain; charset=utf-8'})
        res.end('404 - Страница не найдена' + ' Колличество запросов: '+ ++count404);
    }
    

});

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порте ${port}`);
});