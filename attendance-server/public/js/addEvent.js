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

jQuery('#editEvent-form').on('submit', function(e) {
  e.preventDefault()
  console.log('editEvent-form');
  console.log(jQuery('[name=eventID]').val());
  console.log(jQuery('[name=eventNameData]').val());
  socket.emit('updateEvent', {
    eventID: jQuery('[name=eventID]').val(),
    eventName: jQuery('[name=eventNameData]').val(),
    eventLocation:jQuery('[name=eventLocationData]').val(),
    eventVenue: jQuery('[name=eventVenueData]').val(),
    eventScheduleStart: jQuery('[name=eventScheduleStartData]').val(),
    eventScheduleEnd: jQuery('[name=eventScheduleEndData]').val()
  }, function(message) {

    if(message.status === 400) {
      alert(message.message)
    } else {
      alert("Event Added!!")
      location.reload();
    }
  })
})

function getJS(e) {

  socket.emit('updateEditForm', {eventID: e}, function(event) {
   //console.log(event);
    var template = jQuery('#EditForm-template').html();

     console.log(event[0].eventID);

    var html = Mustache.render(template, {
      eventID:event[0].eventID,
      eventName:event[0].eventName,
      eventLocation:event[0].eventLocation,
      eventVenue:event[0].eventVenue,
      eventScheduleStart: event[0].eventScheduleStart,
      eventScheduleEnd: event[0].eventScheduleEnd
      //(new Date(event[0].eventScheduleStart)).toLocaleString('en-US', {year: '2-digit', month:'2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit', hour12: true }),
      //eventScheduleEnd:(new Date(event[0].eventScheduleEnd)).toLocaleString('en-US', {year: '2-digit', month:'2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit', hour12: true })
    });

   var rowCount = $('#updateTable tr').length;
   if(rowCount > 1) {
     $('#updateTable tr:last').remove();
   }
    jQuery('#updateTable').append(html);
  })

}
