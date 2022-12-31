const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  rut: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 12,
  },
  rol: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  number: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 9,
  },
  address: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 200,
  },
  votos: {
    type: Number,
    required: false,
  },
  idVotingAct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'votingActivity',
  }
});

module.exports = mongoose.model("user", userSchema);
