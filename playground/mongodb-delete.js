//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

  if(err) {
    return console.log('Unable to connect to MongoDb Server');
  }
  console.log('Connected to mongodb server');
  const db = client.db('TodoApp')

  //delete insertOne

  //delete many
  db.collection('Todos').

  //find one and delete

  client.close()
})
