//https://www.youtube.com/watch?v=fHoKs66Z2qQ&list=PLY4rE9dstrJzrDaSPKOrhNgQ19GhVl19u&index=1

import express from 'express';
import bodyParser from 'body-parser';
import { ObjectID } from 'mongodb';
import db from './db';
import usersController from './controller/users';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello API');
});

//вывести всех пользователей
app.get('/users', usersController.all);

//выбрать юзера по id
app.get('/users/:id', usersController.findById);

// добавить юзера
app.post('/users', usersController.create);

// Изменить имя
app.put('/users/:id', usersController.update);

// Удалить юзера
app.delete('/users/:id', usersController.delete);

db.connect('mongodb://localhost:27017/myapi', err => {
  if (err) {
    return console.log(err);
    // res.sendStatus(500);
  }

  app.listen(3000, () => console.log('SERVER STARTING PORT 3000'));
});
