import db from '../db';
import { ObjectID } from 'mongodb';

exports.all = callback =>
  db.get().collection('users').find().toArray((err, docs) => callback(err, docs));

exports.findById = (id, callback) => {
  db.get().collection('users').findOne({ _id: ObjectID(id) }, (err, doc) => {
    callback(err, doc);
  });
};

exports.create = (user, callback) => {
  db.get().collection('users').insert(user, (err, result) => {
    callback(err, result);
  });
};

exports.update = (id, newData, callback) => {
  db.get().collection('users').updateOne({ _id: ObjectID(id) }, newData, (err, result) => {
    callback(err, result);
  });
};

exports.delete = (id, callback) => {
  db.get().collection('users').deleteOne({ _id: ObjectID(id) }, (err, result) => {
    callback(err, result);
  });
};
