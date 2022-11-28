const mongoose = require("mongoose");
const schema = mongoose.Schema;

const foroSchema = new schema({
  username: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  comment: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 400,
  },
  userid: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 123,
  },
});

module.exports = mongoose.model("foro", foroSchema);
