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
  ganador: {
    type: String,
    required: false,
    minLength: 1,
    maxLength: 100,
  },
  votos_ganador: {
    type: Number,
    required: false,
  },
  rut1:{
    type: String,
    required: true,
    minLength: 1,
    maxLength: 12,
  },
  rut2:{
    type: String,
    required: true,
    minLength: 1,
    maxLength: 12,
  },
  rut3:{
    type: String,
    required: true,
    minLength: 1,
    maxLength: 12,
  },
  rut4:{
    type: String,
    required: true,
    minLength: 1,
    maxLength: 12,
  }
});

module.exports = mongoose.model("votingActivity", votingActivitySchema);
