const mongoose = require("mongoose");
const schema = mongoose.Schema;

const TargetVoteSchema = new schema({
  rut: {                 //Cargo
    type: String,
    required: true,
    minLength: 1,
    maxLength: 12,
  },
  rut_v: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 12,
  },
  name_v: {
    type: Date,
    required: true,
    minLength: 1,
    maxLength: 12,
  },
});

module.exports = mongoose.model("TargetVote", TargetVoteSchema);
