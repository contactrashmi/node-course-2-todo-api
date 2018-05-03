var mongoose = require('mongoose')

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true, //text value is must
    minlength: 1, // fail when text is empty
    trim: true //remove any leading or trailing spaces
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null //because completedAt exists only when completed is true
  }
})

module.exports = {Todo}
