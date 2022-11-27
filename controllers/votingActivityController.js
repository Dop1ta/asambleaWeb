const votingActivity = require("../models/votingActivity");
const user = require("../models/users");

const createVotingActivity = (req, res) => {
  const { name, startDate_vote, endDate_vote } = req.body;
  const { id } = req.params;

  user.findById(id, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if (person.rol === "administrador") {
      const newVotingActivity = new votingActivity({
      name,
      startDate_vote,
      endDate_vote,
      });

      newVotingActivity.save((error, vote) => {
        if (error) {
          return res
            .status(400)
            .send({ message: "Error al crear la votación." });
        }
        return res.status(201).send(vote);
      });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." });
    }
  });
};

const getVotingActivity = (req, res) => {
    votingActivity.find({}, (error, vote) => {
      if (error) {
        return res.status(400).send({ message: "Error al encontrar una actividad de votación." });
      }
      if (votingActivity.length === 0) {
        return res.status(404).send({ message: "Votación no encontrada." });
      }
      return res.status(200).send(vote);
    });
  };

  const updateVotingActivity = (req, res) => {
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

  const deleteVotingActivity = (req, res) => {
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
}


  const getVotingActivityById = (req, res) => {
    const { id } = req.params;
    votingActivity.findById(id, (error, vote) => {
      if (error) {
        return res.status(400).send({ message: "Error." });
      }
      if (!vote) {
        return res.status(404).send({ message: "Votación no encontrada." });
      }
      return res.status(200).send(vote);
    });
  };

module.exports = {
  createVotingActivity,
  getVotingActivity,
  deleteVotingActivity,
  updateVotingActivity,
  getVotingActivityById,
};
