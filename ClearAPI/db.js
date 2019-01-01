import { MongoClient } from 'mongodb'; //, ObjectID

const state = {
  db: null,
};

exports.connect = (url, callback) => {
  if (state.db) {
    return callback();
  }
  MongoClient.connect(url, (err, db) => {
    if (err) {
      callback(err);
    }
    state.db = db;
    callback();
  });
};

exports.get = () => state.db;
