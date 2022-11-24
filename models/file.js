const moongoose = requiere('mongoose');
const Schema = mongoose.Schema;
const fileSchema = new Schema({
    url:{
        type: String,
        required: true
    },
    name:{
        type: String,
        requiered: true
    },
    mimeType:{
        type: String,
        requiere: true
    }
});

module.exports = mongooose.model('file', fileSchema);