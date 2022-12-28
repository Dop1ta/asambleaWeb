const user = require('../models/users');

const checkRut = (req, res, next) => {
    const { rut } = req.body;
    user.findOne({ rut }, (err, person) => {
        if(err) {
            return res.status(404).send({ message: 'Error al obtener el usuario' });
        }
        if(!person) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
        next();
    })
}

module.exports = checkRut;