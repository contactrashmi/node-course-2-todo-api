const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

var bodyParser = require('body-parser')

var{mongoose} = require('./db/mongoose')
var{Event} = require('./models/events')
var{Employee} = require('./models/employee')

const publicPath = path.join(__dirname, '/public')

var port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIO(server)


app.use(express.static(publicPath))
app.use(bodyParser.json())


io.on('connection', (socket) => {
  console.log('Connected to client');

  socket.on('addEvent', (createEvent, callback) => {
    console.log('Event added by client:', createEvent);

    var event = new Event({
        eventID: 10,
        eventName: createEvent.eventName,
        eventLocation: createEvent.eventLocation,
        eventSchedule: createEvent.eventSchedule
      })

       console.log(event);

       event.save().then((doc) => {
         console.log(doc);
       callback(doc)
     }, (err) => {
       callback({
         status: 400,
         errorMessage: err
       })
     })

  })

  socket.on('disconnect', () => {
    console.log('Disconneted from client');
  })
})
//to create new todos
app.post('/postEvent', (req, res) => {
 console.log(req.body);
 var event = new Event({
   eventID: req.body.eventID,
   eventName: req.body.eventName,
   eventLocation: req.body.eventLocation,
   eventSchedule: req.body.eventSchedule
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
   employeeID: req.body.employeeID
 })

 employee.save().then((doc) => {
   res.send({statusCode: 200, message: 'Attendance Marked', employeeID: req.body.employeeID})
 }, (err) => {
   res.status(400).send(err)
 })
})

// app.get('/about', (req, res) => {
//   res.render('about.hbs')
// })

server.listen(port, () => {
 console.log(`Server is up and running ${port}`);
})
