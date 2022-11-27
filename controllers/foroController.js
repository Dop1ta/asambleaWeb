const foro = require("../models/foro");

const createForo = (req, res) => {
    const { username, comment, userid } = req.body;
    const { id } = req.params;

    foro.findById(id, (error, person) => {
        if(error) {
            return res.status(400).send({ message: "Error al buscar el usuario." });
        }
        if(!person) {
            return res.status(404).send({ mesage: "Usuario no encontrado." });
        }
        if(person.rol === "administrador") {
            const newForo = new foro({
                username,
                comment,
                userid,
            });
            newForo.save((error, foro) => {
                if(error) {
                    return res.status(400).send({ message: "Error al crear un comentario." });
                }
                return res.status(201).send(foro);
            });
        } else {
            return res.status(404).send({ message: "Usuario no permitido." });
        }
    });

    const newForo = new foro({
        username,
        comment,
        userid,
    });
    newForo.save((error, foro) => {
        if(error) {
            return res.status(400).send({ message: "Error al crear un comentario." });
        }
        return res.status(201).send(foro);
    });
};



module.exports = {
    createForo,
};