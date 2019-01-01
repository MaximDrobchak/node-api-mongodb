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
app.get('/users', (req, res) => {
  db.get().collection('users').find().toArray((err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
});

//выбрать юзера по ид
app.get('/users/:id', (req, res) => {
  db.get().collection('users').findOne({ _id: ObjectID(req.params.id) }, (err, doc) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  });
});

// добавить юзера
app.post('/users', (req, res) => {
  const user = {
    name: req.body.name,
  };
  db.get().collection('users').insert(user, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(user);
  });
});

// Изменить имя
app.put('/users/:id', (req, res) => {
  db
    .get()
    .collection('users')
    .updateOne({ _id: ObjectID(req.params.id) }, { name: req.body.name }, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    });
});

// Удалить юзера
app.delete('/users/:id', (req, res) => {
  db.get().collection('users').deleteOne({ _id: ObjectID(req.params.id) }, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

db.connect('mongodb://localhost:27017/myapi', err => {
  if (err) {
    return console.log(err);
    // res.sendStatus(500);
  }

  app.listen(3000, () => console.log('SERVER STARTING PORT 3000'));
});
