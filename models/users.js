const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  ocupation: {
    type: String,
    required: true,
    minLength: 20,
    maxLength: 100,
  },
});

module.exports = mongoose.model("user", userSchema);
