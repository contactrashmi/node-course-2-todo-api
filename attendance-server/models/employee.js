var mongoose = require('mongoose')

var Employee = mongoose.model('Employee', {
  eventID: {
    type: Number,
    required: true
  },
  employeeID: {
    type: String,
    trim: true, //remove any leading or trailing spaces
    required: true,
    minlength: 1
  },
  isPresent: {
    type: Boolean,
    default: true
  }
})

module.exports = {Employee}
