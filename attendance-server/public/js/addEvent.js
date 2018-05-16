var socket = io()

socket.on('connect', function () {

  console.log('Connected to server');

  socket.emit('loadEventTable', function(eventData) {



    eventData.forEach((event) => {

      console.log(event);
       var template = jQuery('#table-template').html();

       //var dateStart = event.eventScheduleStart.toString("hh:mm tt")
       //console.log(dateStart);

       var html = Mustache.render(template, {
         eventID:event.eventID,
         eventName:event.eventName,
         eventLocation:event.eventLocation,
         eventVenue:event.eventVenue,
         eventScheduleStart: event.eventScheduleStart,
         eventScheduleEnd:event.eventScheduleEnd
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
    eventVenue: jQuery('[name=eventVenue]').val(),
    eventScheduleStart: jQuery('[name=eventScheduleStart]').val(),
    eventScheduleEnd: jQuery('[name=eventScheduleEnd]').val()
  }, function(message) {
    console.log('Event Added');
    alert("Event Added!!")
    location.reload();
  })
})

jQuery('table-template').on('click', function(e) {
   console.log('click event capturted');
})

jQuery('editEvent-form').on('click', function(e) {
   console.log('click event capturted');
})
