var socket = io()

socket.on('connect', function () {

  console.log('Connected to server');

  socket.emit('loadEventTable', function(eventData) {



    eventData.forEach((event) => {

       var template = jQuery('#table-template').html();

       var html = Mustache.render(template, {
         eventID:event.eventID,
         eventName:event.eventName,
         eventLocation:event.eventLocation,
         eventVenue:event.eventVenue,
         eventScheduleStart: (new Date(event.eventScheduleStart)).toLocaleString('en-US', {year: '2-digit', month:'2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit', hour12: true }),
         eventScheduleEnd:(new Date(event.eventScheduleEnd)).toLocaleString('en-US', {year: '2-digit', month:'2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit', hour12: true })
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

    if(message.status === 400) {
      alert(message.message)
    } else {
      alert("Event Added!!")
      location.reload();
    }
  })
})


jQuery('#editEvent-form').on('click', function(e) {
   console.log('click event capturted');
})

$('.navigateTest').click(function () {
    //alert("test called");
    var serviceID = $(this).attr('id');
    alert("serviceID :: " + serviceID);
})
