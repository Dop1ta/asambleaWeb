const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fileSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    requiered: true,
  },
  mimeType: {
    type: String,
    requiere: true,
  },
  idacta: {
    type: String,
    requiere: true,
  },
});

module.exports = mongoose.model("file", fileSchema);
