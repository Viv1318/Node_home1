/*В обработчиках получения данных по пользователю нужно читать файл
В обработчиках создания, обновления и удаления нужно файл читать, чтобы убедиться, что пользователь существует, а затем сохранить в файл, когда внесены изменения*/

const express = require('express');

const joi = require('joi');

const app = express();
const fs = require("fs");
const path = require("path");
const { stringify } = require('querystring');

const userSchema = joi.object({
    firstName: joi.string().min(3).max(50).required(),
    secondName: joi.string().min(3).max(50).required(),
    age: joi.number().min(1).max(99).required(),
    city: joi.string().min(3).max(50).required()
});

let uniqueId = 0;

let users = [];

app.use(express.json());

app.get('/users', (req, res) => {

    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, body)  => {
        if (err) {
            console.error(err);
        } else {
            
            users = JSON.parse(body);
            console.log('Загружены значения счетчиков из файла');
        }
    });
      
        
    res.send({users});
});


app.get('/users/:id', (req, res) => {
    const userId = +req.params.id;
    const user = users.find(user => user.id === userId);
    if (user) {
  
        res.send({user});
        
    }else {
        return res.status(404).send({message: 'User not found'});
    }
    
});

app.post('/users', (req, res) => {
    uniqueId += 1;

    const result = userSchema.validate(req.body);

    
    if (result.error) {
        return res.status(400).send({ message: result.error.details[0].message });
    }

            
    users.push({
        id: uniqueId,
        ...req.body
    });
    
    fs.writeFile(path.join(__dirname, "users.json"), JSON.stringify(users, null, 2), (err, body) => {
        if (err) {
            console.error(err);
        } else {
            console.log('файл  сохранен');
        }
    });

    
    res.send({id: uniqueId});
});

app.put('/users/:id', (req, res) => {

    const result = userSchema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ message: result.error.details[0].message });
    }
   
    const userId = +req.params.id;
    const user = users.find(user => user.id === userId);
    if (user) {
        const { firstName, secondName, age, city } = req.body;
        user.firstName = firstName || user.firstName;
        user.secondName = secondName || user.secondName;
        user.age = age || user.age;
        user.city = city || user.city;
        res.send({user});
        
    }else {
        return res.status(404).send({message: 'User not found'});
    }
});

app.delete('/users/:id', (req, res) => {
    const userId = +req.params.id;
    const user = users.find(user => user.id === userId);
    if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        res.send({user});
        
    }else {
        return res.status(404).send({message: 'User not found'});
    }
});


app.listen('3000', (req, res) => {
    console.log('Server is running on port 3000');
});