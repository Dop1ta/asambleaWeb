const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        const route = './upload'+req.param.archivo
        if(!fs.existsSync(route)){
            fs.mkdirSync(route, { recursive: true})
        }
        cb(null,route)
    },
    filename:function (req,file,cb){
        const fecha = Date.now();
        cb(null, fecha + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter:function (req,file,cb){
        if(file.mimetype==='application/pdf'){
            console.log("El archivo es un pdf")
        }else{
            console.log("El archvio subido es de otro formato")
        }
        cb(null, true);
    },
    limits:{
        fileSize: 1024 * 1024 * 15
    }
})

module.exports = upload