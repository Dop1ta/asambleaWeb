const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
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
  address: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 200,
  },
});

module.exports = mongoose.model("user", userSchema);
