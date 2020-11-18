/* eslint-disable prefer-destructuring */
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }
          console.log('Connected succesfully to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }

    return MongoLib.connection;
  }

  delete(collection) {
    return this.connect()
      .then(db => {
        return db.collection(collection).deleteMany();
      })
      .then(() => {
        console.log(`WARNING: Records deleted from DATABASE ${DB_NAME} and ${collection} COLLECTION`)
      });
  }
}

const MongoConnection = new MongoLib();

async function deleteRecords() {
  await MongoConnection.delete('users');
  await MongoConnection.delete('user-movies');
  process.exit();
}
deleteRecords();
