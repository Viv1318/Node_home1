const express = require('express');

const joi = require('joi');

const app = express();

const userSchema = joi.object({
    firstName: joi.string().min(3).max(50).required(),
    secondName: joi.string().min(3).max(50).required(),
    age: joi.number().min(1).max(99).required(),
    city: joi.string().min(3).max(50).required()
});

let uniqueId = 0;

const users = [];

app.use(express.json());

app.get('/users', (req, res) => {
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