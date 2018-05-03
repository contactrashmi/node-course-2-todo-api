var express = require('express')
var bodyParser = require('body-parser')

var{mongoose} = require('./db/mongoose')
var{Event} = require('./models/events')
var{Employee} = require('./models/employee')

var app = express()
var port = process.env.PORT || 3000

app.use(bodyParser.json())

//to create new todos
app.post('/postEvent', (req, res) => {
 console.log(req.body);
 var event = new Event({
   eventID: req.body.eventID,
   eventName: req.body.eventName,
   eventLocation: req.body.eventLocation,
 })

 event.save().then((doc) => {
   res.send(doc)
 }, (err) => {
   res.status(400).send(err)
 })
})

app.get('/getEvents', (req, res) => {
  Event.find().then((events) => {
    res.send({events})
  },  (err) => {
    res.status(400).send(err)
  })
})


//to create new todos
app.post('/markAttendance', (req, res) => {
 console.log(req.body);
 var employee = new Employee({
   eventID: req.body.eventID,
   employeeID: req.body.employeeID,
   employeeName: req.body.employeeName
 })

 employee.save().then((doc) => {
   res.send(doc)
 }, (err) => {
   res.status(400).send(err)
 })
})

app.listen(port, () => {
 console.log(`Server is up and running ${port}`);
})
