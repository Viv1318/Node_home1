const express = require('express');

const app = express();

let count = 0;
let countAbout= 0;

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

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})