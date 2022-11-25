const fileUpload = require("../models/file");
const uploadfile = (req, res) => {
    const {files} = req
    let aux = files.map((file)=>{
      const newFile = new fileUpload({
        url:file.path,
        name:file.originalname,
        mimeType:file.mimetype
      });
      newFile.save((err, fileSaved)=>{
        if(err){
          return res.status(400).send({message:"Error al guardar el archivo"});
        }
        return newFile;
      });
    });
    return res.status(201).send(aux);
}

const getFiles = (req,res)=>{
  fileUpload.find({},(err, file)=>{
    if (err) {
      return res.status(400).send({message: "Error al obtener los archivos"});
    }
    return res.status(200).send(file);
  });
}

const getSFiles = (req, res) =>{
  const {id} = req.params
  fileUpload.findById(id,(err,file)=>{
    if(err){
      return res.status(400).send({message: "Error al obtener el archivo"})
    }
    if(!file){
      return res.status(404).send({message: "Archivo mo existe"})
    }
    return res.download('./' + file.url)
  })
}

module.exports = {
  uploadfile,
  getFiles,
  getSFiles
};
