const TargetVote = require("../models/TargetVote");
const user = require("../models/users");

const createTargetVote = (req, res) => {
  const { rut, rut_v, name_v} = req.body;
  const { id } = req.params;

  user.findById(id, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if (person.rol === "vecino") {
      const newTargetVote = new TargetVote({
      rut,
      rut_v,
      name_v,
      });
      newTargetVote.save((error, TargetVote) => {
        if (error) {
          return res.status(400).send({ message: "Error al crear la votación." });
        }
        try{
            return res.status(201).send(vote);
        } catch(error){
            console.log(error)
        }
    });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." });
    }
  });
};

const getTargetVote = (req, res) => {
    TargetVote.find({}, (error, vote) => {
      if (error) {
        return res.status(400).send({ message: "Error al encontrar una actividad de votación." });
      }
      if (TargetVote.length === 0) {
        return res.status(404).send({ message: "Votación no encontrada." });
      }
      return res.status(200).send(vote);
    });
  };

  const updateTargetVote = (req, res) => {
    const { id, userid } = req.params;
    user.findById(userid, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if (person.rol === "administrador") {
      votingActivity.findByIdAndUpdate(id, req.body, (error, vote) => {
        if (error) {
          return res.status(400).send({ message: "Error al actualizar la actividad de votación." });
        }
        if (!vote) {
          return res.status(404).send({ message: "Votación no encontrada." });
        }
        return res.status(200).send({ message: "Votación actualizada." });
      });
      } else {
        return res.status(404).send({ message: "No tienes permisos para actualizar una votación." });
      }
  })
}

  const deleteTargetVote = (req, res) => {
    const { id, userid } = req.params;
    user.findById(userid, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if (person.rol === "administrador") {
    votingActivity.findByIdAndDelete(id, (error, vote) => {
      if (error) {
        return res.status(400).send({ message: "Error al eliminar la actividad de votación." });
      }
      if (!vote) {
        return res.status(404).send({ message: "Votación no encontrada." });
      }
      return res.status(200).send({ message: "Votación eliminada." });
    });
  } else {
    return res.status(404).send({ message: "No tienes permisos para eliminar una votación." });
  }
})
};

module.exports = {
  createTargetVote,
  getTargetVote,
  deleteTargetVote,
  updateTargetVote,
};
