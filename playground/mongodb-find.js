//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

  if(err) {
    return console.log('Unable to connect to MongoDb Server');
  }
  console.log('Connected to mongodb server');
  const db = client.db('TodoApp')

  // db.collection('Todos').find({
  //   _id: new ObjectID('5ae07ca030794e031143a576')
  // }).toArray().then((docs) => {
  //   console.log('Todods');
  //   console.log(JSON.stringify(docs, undefined, 2));
  //
  // } , (err) => {
  //
  // })

  db.collection('User').find({
    name: 'Sam'
  }).toArray().then((docs) => {
    console.log('Todods');
    console.log(JSON.stringify(docs, undefined, 2));

  } , (err) => {

  })



  //client.close()
})
