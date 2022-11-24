const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        const route = './upload'+req.param.archivo
        if(!fs.existsSync(route)){
            fs.mkdirSync(route, { recursive: true})
        }
        cb(null,ruta)
    },
    filename:function (req,file,cb){
        cb(null, date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storgae:storage,
    fileFilter:function (req,file,cb){
        if(file.mimetype==='archivo/pdf'){
            console.log("El archvio es un pdf")
        }else{
            console.log("El archivo tiene otra extension")
        }
        cb(null, true)
    },
    limits:{
        fileSize: 1024 * 1024 * 200
    }
})

module.exports = upload