const mongoose = require("mongoose");
const schema = mongoose.Schema;

const programMeetingSchema = new schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  time: {
    type: Date,
    required: true,
    minLength: 10,
    maxLength: 100,
  },
  hour: {
    type: Number,
    required: true,
    minLength: 10,
    maxLength: 100,
  },
  place: {
    type: String,
    required: true,
    minLength: 20,
    maxLength: 100,
  },
  description: {
    type: String,
    required: true,
    minLength: 20,
    maxLength: 100,
  },
});

module.exports = mongoose.model("program_meeting", programMeetingSchema);
