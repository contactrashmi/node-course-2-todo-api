var mongoose = require('mongoose')

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true, //text value is must
    minlength: 1, // fail when text is empty
    trim: true //remove any leading or trailing spaces
  }
})

module.exports = {User}
