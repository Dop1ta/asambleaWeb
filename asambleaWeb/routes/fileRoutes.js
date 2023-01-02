const express = require("express");
const fileController = require("../controllers/fileController");
const upload = require("../middlewares/handleMulter");
const fileSize = require("../middlewares/fileSize");

const api = express.Router();

api.post("/file/:archivo", upload.array("archivos"), fileSize, fileController.uploadfile);
api.get('/files', fileController.getFiles);
api.get('/files/get/:idacta', fileController.getFilesById);
api.get('/file/download/:idacta', fileController.getSFiles);
api.delete('/file/delete/:idacta', fileController.deleteFiles);

module.exports = api;
