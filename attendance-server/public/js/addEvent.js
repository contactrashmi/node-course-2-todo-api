var socket = io()

socket.on('connect', function () {

  console.log('Connected to server');

  socket.emit('loadEventTable', function(eventData) {

    eventData.forEach((event) => {
       var template = jQuery('#table-template').html();
       var html = Mustache.render(template, {
         eventID:event.eventID,
         eventName:event.eventName,
         eventLocation: event.eventLocation,
         eventSchedule:  event.eventSchedule
       });

       jQuery('#eventTable').append(html);

    })
  })
})

socket.on('disconnect', function() {
  console.log('Disconnected from server');
})

/*jQuery('#message-form').on('submit', function(e) {
  e.preventDefault()

  socket.emit('addEvent', {
    eventName: jQuery('[name=eventName]').val(),
    eventLocation:jQuery('[name=eventLocation]').val(),
    eventSchedule: new Date()
  }, function(message) {
    console.log('Event Added');
    alert("Event Added!!")
  })
})*/

jQuery('#addEvent-form').on('submit', function(e) {
  e.preventDefault()
  socket.emit('addEvent', {
    eventName: jQuery('[name=eventName]').val(),
    eventLocation:jQuery('[name=eventLocation]').val(),
    eventSchedule: jQuery('[name=eventSchedule]').val(),
  }, function(message) {
    console.log('Event Added');
    alert("Event Added!!")
    location.reload();
  })
})
