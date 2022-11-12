const mongoose = require("mongoose");
const schema = mongoose.Schema;

const actaMeetingSchema = new schema({
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
});

module.exports = mongoose.model("acta_meeting", actaMeetingSchema);
