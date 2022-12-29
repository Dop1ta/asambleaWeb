const user = require("../models/users");

const createUser = (req, res) => {
  const { name, rut, rol, email, number, address, votos } = req.body;
  const { id } = req.params;

  user.findById(id, (error, person) => {
    if(error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if(!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if(person.rol === "administrador") {
      const newUser = new user({
        name,
        rut,
        rol,
        email,
        number,
        address,
        votos,
      });
      newUser.save((error, person) => {
        if (error) {
          return res.status(400).send({ message: "Error al crear un usuario." });
        }
        return res.status(201).send(person);
      });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." })
    }
  });
};

const login = async (req, res) => {
  const { rut } = req.body;
  user.findOne({ rut }, (err, person) => {
    if(err) {
      return res.status(400).send({ message: 'Error al iniciar sesion' });
    }
    if(!person) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    return res.status(201).send({ message: 'Se ha iniciado sesion', person:rut });
  })
}

const getUsers = (req, res) => {
  const { id } = req.params;

  user.findById(id, (error, person) => {
    if(error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if(!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if(person.rol === "administrador") {
      user.find({}, (error, person) => {
        if(error) {
          return res.status(400).send({ message: "Error al buscar usuario." });
        }
        if(person.length === 0) {
          return res.status(404).send({ message: "Usuario no encontrado." });
        }
        return res.status(200).send(person);
      });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." })
    }
  });
};

const getUsersAll = (req, res) => {
  user.find({}, (error, person) => {
    if(error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if(person.length === 0) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    return res.status(200).send(person);
  }).select("name -_id");
};

const updateUser = (req, res) => {
  const { id, userid } = req.params;

  user.findById(id, (error, person) => {
    if(error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if(!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if(person.rol === "administrador") {
      user.findByIdAndUpdate(userid, req.body, (error, person) => {
        if(error) {
          return res.status(400).send({ message: "Error al actualizar el usuario." });
        }
        if(!person) {
          return res.status(404).send({ message: "Usuario no encontrado." });
        }
        return res.status(200).send({ message: "Usuario actualizado." });
      });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." })
    }
  });
};

const deleteUser = (req, res) => {
  const { id, userid } = req.params;

  user.findById(id, (error, person) => {
    if(error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if(!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if(person.rol === "administrador") {
      user.findByIdAndDelete(userid, (error, person) => {
        if(error) {
          return res.status(400).send({ message: "Error al eliminar el usuario." });
        }
        if(!person) {
          return res.status(404).send({ message: "Usuario no encontrado." });
        }
        return res.status(200).send({ message: "Usuario eliminado." });
      });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." })
    }
  });
};

const getUserById = (req, res) => {
  const { id, userid } = req.params;

  user.findById(id, (error, person) => {
    if(error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if(!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if(person.rol === "administrador") {
      user.findById(userid, (error, person) => {
        if(error) {
          return res.status(400).send({ message: "Error al buscar el usuario." });
        }
        if(!person) {
          return res.status(404).send({ message: "Usuario no encontrado." });
        }
        return res.status(200).send(person);
      });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." })
    }
  });
};

const getUsersEmail = (req, res) => {
  user.find({}, (error, person) => {
    if(error) {
      return res.status(400).send({ message: "Error al buscar usuario." });
    }
    if(person.length === 0) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    return res.status(200).send(person);
  }).select("email -_id");
};

const getUserEmailById = (req, res) => {
  const { id, userid } = req.params;

  user.findById(id, (error, person) => {
    if(error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if(!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if(person.rol === "administrador") {
      user.findById(userid, (error, person) => {
        if(error) {
          return res.status(400).send({ message: "Error al buscar el correo del usuario." });
        }
        if(!person) {
          return res.status(404).send({ message: "Usuario no encontrado." });
        }
        return res.status(200).send(person.email);
      });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." })
    }
  });
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUsersAll,
  updateUser,
  deleteUser,
  getUserById,
  getUsersEmail,
  getUserEmailById,
};
