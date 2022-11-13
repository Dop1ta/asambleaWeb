const mongoose = require("mongoose");
const schema = mongoose.Schema;

const programMeetingSchema = new schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  time: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  hour: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  place: {
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
});

module.exports = mongoose.model("program_meeting", programMeetingSchema);
