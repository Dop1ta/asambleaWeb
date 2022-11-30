const mongoose = require("mongoose");
const schema = mongoose.Schema;

const votingActivitySchema = new schema({
  name: {                 //Cargo
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  startDate_vote: {
    type: Date,
    required: true,
  },
  endDate_vote: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("votingActivity", votingActivitySchema);
