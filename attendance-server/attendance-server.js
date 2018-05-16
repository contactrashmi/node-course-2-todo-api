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

//Fetching data from Event Table
  socket.on('loadEventTable',(callback) => {
    console.log('Fetching data from Event Table');
    Event.find().then((events) => {
      callback(events)
    })
   }, (err) => {
    callback({
      status: 400,
      errorMessage: err
    })
  })

  socket.on('addEvent', (createEvent, callback) => {
    console.log('Event added by client:', createEvent);

  var localEvetID

  Event.count(function (err, count) {
      if (!err && count !== 0) {
        Event.find().sort({eventID:-1}).limit(1).then((events) => {

          localEvetID = events[0].eventID + 1

          addEventInDB(createEvent, localEvetID, (message) => {
            callback(message)
          })

        },  (err) => {
          //console.log(err)
          localEvetID = 1
        })
      } else {

        addEventInDB(createEvent, 1, (message) => (
          callback(message)
        ))
      }
  });



  /*

  */
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

var addEventInDB = ((createEvent, localEvetID, callback) => {
  var event = new Event({
      eventID: localEvetID,
      eventName: createEvent.eventName,
      eventLocation: createEvent.eventLocation,
      eventVenue: createEvent.eventVenue,
      eventScheduleStart: createEvent.eventScheduleStart,
      eventScheduleEnd: createEvent.eventScheduleEnd,

    })

     event.save().then((doc) => {
       console.log(doc);

       callback({
         status: 200,
         message: "Data Added"
       })
   }, (err) => {

     var errorString;

    //  if (err.name == 'ValidationError') {
    //     for (field in err.errors) {
    //         console.log(err.errors[field].message);
    //     }
    // }
     if(err.name === 'ValidationError') {
       errorString = "Please enter mandatory field(s)"
     } else {
       errorString = "Error adding data"
     }
       callback({
         status: 400,
         message: errorString
       })
   })
})

server.listen(port, () => {
 console.log(`Server is up and running ${port}`);
})
