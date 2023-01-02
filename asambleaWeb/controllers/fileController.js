const { application } = require("express");
const { Acta } = require("../models/acta_meeting");
const fileUpload = require("../models/file");

const uploadfile = (req, res) => {
  const { files } = req
  const { id } = req.params
  Acta.findById(id, (err, actaf) => {
    if (err) {
      return res.status(400).send({ message: "Error al subir archivo" });
    }
    if (!actaf) {
      return res.status(400).send({ message: "No hay actas para subir archivo" });
    }
    let aux = files.map((file) => {
      const newFile = new fileUpload({
        url: file.path,
        name: file.originalname,
        mimeType: file.mimetype,
        idacta: id
      });
      newFile.save((err, fileSaved) => {
        if (err) {
          return res.status(400).send({ message: "Error al guardar el archivo" });
        }
        return newFile;
      });
      return res.status(201).send(aux);
    });
  })
}

const getFiles = (req, res) => {
  fileUpload.find({}, (error, file) => {
    if (error) {
      return res.status(400).send({ message: "Error al obtener los archivos" });
    }
    return res.status(200).send(file);
  });
}

const getSFiles = (req, res) => {
  const { idacta } = req.params
  fileUpload.findById(idacta, (error, file) => {
    if (error) {
      return res.status(400).send({ message: "Error al obtener el archivo" })
    }
    if (!file) {
      return res.status(404).send({ message: "Archivo no existe" })
    }
    return res.download('./' + file.url)
  });
}

const deleteFiles = async (req, res) => {
  const { idacta } = req.params
  fileUpload.findByIdAndDelete(idacta, (error, meeting) => {
    if (error) {
      return res.status(400).send({ message: "Error." })
    }
    if (!file) {
      return res.status(404).send({ message: "Archvio no encontrado." })
    }
    return res.status(200).send(file)
  });
}

module.exports = {
  uploadfile,
  getFiles,
  getSFiles,
  deleteFiles
};
