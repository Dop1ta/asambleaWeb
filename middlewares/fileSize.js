const fileSizeError = (err, req, res, next) => {
    if(err){
        return res.status(413).send({message:"El archivo es demasiado garnde"})
    }else{
        next()
    }
}

module.exports = fileSizeError