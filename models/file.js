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
});

fileSchema.methods.seturl = function seturl (){
  
}

module.exports = mongoose.model("file", fileSchema);
