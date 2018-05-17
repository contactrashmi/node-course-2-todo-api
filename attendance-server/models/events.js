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
    trim: true, //remove any leading or trailing spaces
    required: true,
  },
  eventLocation: {
    type: String,
    trim: true, //remove any leading or trailing spaces
    default: 'Chandigarh',
    required: true,
  },
  eventVenue: {
    type: String,
    trim: true, //remove any leading or trailing spaces
    default: 'Chandigarh',
    required: true,
  },
  eventScheduleStart: {
    type: Date,
    required: true,
  },
  eventScheduleEnd: {
    type: Date,
    required: true,
  },
  empID: {
    type: String,
    trim: true, //remove any leading or trailing spaces
    default: '120381',
    required: true,
  },
  primaryScanMethod: {
    type: String,
    trim: true, //remove any leading or trailing spaces
    //default: 'QR',
    default: 'OCR',
    required: true,
  },
  secondaryScanMethod: {
    type: String,
    default: ' ',
    //default: 'OCR, TEXT',
    required: true,
  }

})

module.exports = {Event}
