var socket = io()

socket.on('connect', function () {

  console.log('Connected to server');
})

socket.on('disconnect', function() {
  console.log('Disconnected from server');
})

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault()

  socket.emit('addEvent', {
    eventName: jQuery('[name=eventName]').val(),
    eventLocation:jQuery('[name=eventLocation]').val(),
    eventSchedule: new Date()
  }, function(message) {
    console.log('Event Added');
    alert("Event Added!!")
  })
})
