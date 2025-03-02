
const express = require('express');

const app = express();

const fs = require("fs");
const path = require("path");

let counters = {
    main: 0,
    about: 0
};

app.get('/', (req, res) => {
    counters.main ++;
    fs.writeFile('counters.json', JSON.stringify(counters, null, 2), (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Счетчик main сохранен');
        }
    });
    res.send(`<h1>Главная страница</h1>
            <a href="/about">Обо мне</a>
            <p>Колличество просмотров: ${counters.main}</p>`);

});

app.get('/about', (req, res) => {
    counters.about ++;
    fs.writeFile('counters.json', JSON.stringify(counters, null, 2), (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Счетчик about сохранен');
        }
    });
    res.send(`<h1>Обо мне</h1>
            <a href="/">Главная</a>
            <p>Колличество просмотров: ${counters.about}</p>`);
 
});

// Загрузка значений счетчиков из файла при старте сервера



fs.readFile('counters.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        counters = JSON.parse(data);
        console.log('Загружены значения счетчиков из файла');
    }
});

// Запуск сервера
   
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})