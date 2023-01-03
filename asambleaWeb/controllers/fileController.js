const { application } = require("express");
const Acta = require("../models/acta_meeting");
const fileUpload = require("../models/file");
const fs = require("fs");

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
      console.log(id)
      newFile.save((err, fileSaved) => {
        if (err) {
          return res.status(400).send({ message: "Error al guardar el archivo" });
        }
        return newFile;
      });
    });
    return res.status(201).send(aux);
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

const getFilesByActaId = (req, res) => {
  const { idacta } = req.params
  fileUpload.findOne({idacta}, (error, file) => {
    if (error) {
      return res.status(400).send({ message: "Error al obtener los archivos" });
    }
    if (!file) {
      return res.status(404).send({ message: "Archivo no encontrado." })
    }
    fileUpload.findById(file.id, (error, fine) => {
      if (error) {
        return res.status(400).send({ message: "Error al obtener los archivos" });
      }
      if(!fine){
        return res.status(400).send({ message: "No encontrado" });
      }
        return res.status(200).send(fine);
      });
  })
}

const getSFiles = (req, res) => {
  const { idacta } = req.params
  fileUpload.findOne({idacta}, (error, file) => {
    if (error) {
      return res.status(400).send({ message: "Error al obtener los archivos" });
    }
    if (!file) {
      return res.status(404).send({ message: "Archivo no encontrado." })
    }
    fileUpload.findById(file.id, (error, fix) => {
      if (error) {
        return res.status(400).send({ message: "Error al obtener el archivo" })
      }
      if (!fix) {
        return res.status(404).send({ message: "Archivo no existe" })
      }
      return res.download('./' + fix.url)
    })
  });
}

const deleteFiles = async (req, res) => {
  const { idacta } = req.params
  fileUpload.findOne({idacta}, (error, file) => {
    if (error) {
      return res.status(400).send({ message: "Error al obtener los archivos" });
    }
    if (!file) {
      return res.status(404).send({ message: "Archivo no encontrado 1." })
    }
    fileUpload.findByIdAndDelete(file._id, (error, fmas) => {
      if (error) {
        return res.status(400).send({ message: "Error." })
      }
      if (!fmas) {
        return res.status(404).send({ message: "Archivo no encontrado." })
      }
      fs.unlink(fmas.url, (error) => {
        if(error){
          return res.status(404).send({ message: "Error." })
        }
        if(!fmas){
          return res.status(404).send({ message: "Error" })
        }
        return res.status(200).send({ message: "Archivo Eliminado"})
      })
    });
  });
}

const deleteFilesS = async (req, res) => {
  const { id } = req.params
  fileUpload.findByIdAndDelete(id, (error, file) => {
    if (error) {
      return res.status(400).send({ message: "Error." })
    }
    if (!file) {
      return res.status(404).send({ message: "Archivo no encontrado." })
    }
    fs.unlink(file.url, (error) => {
      if(error){
        return res.status(404).send({ message: "Error." })
      }
      if(!file){
        return res.status(404).send({ message: "Error" })
      }
      return res.status(200).send({ message: "Archivo Eliminado"})
    })
  });
}

module.exports = {
  uploadfile,
  getFiles,
  getFilesByActaId,
  getSFiles,
  deleteFiles,
  deleteFilesS
};
