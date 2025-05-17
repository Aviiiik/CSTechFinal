const mongoose = require('mongoose');
const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: {
    type: String,
    required: true,
    match: /^\+[1-9]\d{1,14}$/ // E.164 international format
  },
  password: { type: String, required: true, minlength: 6 }
});

module.exports = mongoose.model('Agent', AgentSchema);
