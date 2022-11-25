const express = require("express");
const fileController = require("../controllers/fileController");
const upload = require("../middlewares/handleMulter");
const fileSize = require("../middlewares/fileSize");

const api = express.Router();

api.post("/file/:archivo", upload.array("archivos"), fileSize, fileController.uploadfile);
api.get('/files', fileController.getFiles);
api.get('/file/download/:id', fileController.getSFiles);

module.export = api;
