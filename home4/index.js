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

    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, body) => {
        if (err) {
            return res.status(500).send({ message: 'Error reading file' });
         } const users = JSON.parse(body);
            res.send({users});       
    });
});


app.get('/users/:id', (req, res) => {

    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, body) => {
        if (err) {
            return res.status(500).send({ message: 'Error reading file' });
        } const users = JSON.parse(body);
        const userId = +req.params.id;
        const user = users.find(user => user.id === userId);
            if (user) {
        
                res.send({user});
                
            }else {
                return res.status(404).send({message: 'User not found'});
            }
    });
    
});

app.post('/users', (req, res) => {
    uniqueId += 1;

    const result = userSchema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ message: result.error.details[0].message });
    }

    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, body) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: 'Error reading file' });
        } const users = JSON.parse(body);
        if (users.some(user => user.id === uniqueId)) {
            return res.status(409).send({ message: `User with this ID ${uniqueId} already exists` });
        }else{

            users.push({
                id: uniqueId,
                ...req.body
            });
            res.send({id: uniqueId});
            fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send({ message: 'Error writing to file' });
                } 
                
            });
        }
    });
});

app.put('/users/:id', (req, res) => {

    const result = userSchema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ message: result.error.details[0].message });
    }

    fs.readFile(path.join(__dirname,  'users.json'), 'utf8', (err, body) => {
        if (err) {
            return res.status(500).send({ message: 'Error reading file' });
        } const users = JSON.parse(body);
            const userId = +req.params.id;
            const user = users.find(user => user.id === userId);
            if (user) {
                const { firstName, secondName, age, city } = req.body;
                user.firstName = firstName || user.firstName;
                user.secondName = secondName || user.secondName;
                user.age = age || user.age;
                user.city = city || user.city;
                res.send({user});
                fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2) ), (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send({ message: 'Error writing to file' });
                    }
                }
                
            }else {
                return res.status(404).send({message: 'User not found'});
            }
    });
});

app.delete('/users/:id', (req, res) => {
    
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, body) => {
        if (err) {
            return res.status(500).send({ message: 'Error reading file' });
        } const users = JSON.parse(body);

        const userId = +req.params.id;
        const user = users.find(user => user.id === userId);

            if (user) {
                const userIndex = users.indexOf(user);
                users.splice(userIndex, 1);
                res.send({user});
                
                fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2) ), (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send({ message: 'Error writing to file' });
                    }
                    
                };
            }else {
                return res.status(404).send({message: 'User not found'});
            }
          
    });
});


app.listen('3000', (req, res) => {
    console.log('Server is running on port 3000');
});