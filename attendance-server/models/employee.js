var mongoose = require('mongoose')

var Employee = mongoose.model('Employee', {
  eventID: {
    type: Number
  },
  employeeID: {
    type: String,
    trim: true //remove any leading or trailing spaces
  },
  employeeName: {
    type: String,
    trim: true, //remove any leading or trailing spaces
  },
  isPresent: {
    type: Boolean,
    default: true
  }
})

module.exports = {Employee}
