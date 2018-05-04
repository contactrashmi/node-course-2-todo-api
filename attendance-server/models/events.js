var mongoose = require('mongoose')

var Event = mongoose.model('Events', {
  eventID: {
    type: Number,
    required: true,
  },
  eventName: {
    type: String,
    required: true, //text value is must
    minlength: 1, // fail when text is empty
    trim: true //remove any leading or trailing spaces
  },
  eventLocation: {
    type: String,
    trim: true, //remove any leading or trailing spaces
    default: 'Chandigarh'
  },
  eventSchedule: {
    type: Date
  }
})

module.exports = {Event}
