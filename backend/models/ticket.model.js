const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    trim: true,
  },
  department: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('ticket', TicketSchema);
