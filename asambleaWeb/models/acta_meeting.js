const mongoose = require("mongoose");
const schema = mongoose.Schema;

const actaMeetingSchema = new schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  description: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  date: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
});

module.exports = mongoose.model("acta_meeting", actaMeetingSchema);
