const express = require('express');

const app = express();

let count = 0;
let countAbout = 0;

app.get('/', (req, res) => {
    res.send(`
    <h1>Главная страница</h1>
    <a href="/about">Обо мне</a>
    <p>Колличество запросов: ${++count}</p>
    `);
});

app.get('/about', (req, res) => {
    res.send(`
    <h1>Обо мне</h1>
    <a href="/">Главная страница</a>
    <p>Колличество запросов: ${++countAbout}</p>
    `);
});

const port = 3001;

app.listen(port, () => {
    console.log(`Сервер запущен на порте ${port}`);
});