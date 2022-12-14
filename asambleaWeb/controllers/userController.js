const user = require("../models/users");

const createUser = (req, res) => {
  const { name, rut, rol, email, number, address, votos, admin } = req.body;
  const { id } = req.params;

  if(!name.match(/^([a-zA-Z]+( [a-zA-Z]+)+)$/)) {
    return res.status(405).send({ message: 'El nombre solo debe contener letras.' });
  }

  if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return res.status(407).send({ message: 'Email mal ingresado.' });
  }

  if(!number.match(/^9\d\d\d\d\d\d\d\d$/)) {
    return res.status(408).send({ message: 'Numero mal ingresado.' });
  }

  user.findOne({ rut: rut }, (error, person) => {

    if (error) {
      return res.status(400).send({ message: 'Error al buscar rut.' });
    }
    try {
      if (rut === person.rut) {
        return res.status(409).send({ message: 'El rut no se puede repetir.' })
      }
    } catch (error) {
    }
    if (!person) {
      user.findById(id, (error, person) => {
        if (error) {
          return res.status(400).send({ message: "Error al buscar el usuario." });
        }
        if (!person) {
          return res.status(404).send({ message: "Usuario no encontrado." });
        }
        if (person.rol === "administrador") {
          const newUser = new user({
            name,
            rut,
            rol,
            email,
            number,
            address,
            votos: 0,
            admin: 0,
          });
          newUser.save((error, Newperson) => {
            if (error) {
              return res.status(400).send({ message: "Error al crear un usuario." });
            }
            try {
              return res.status(201).send(Newperson);
            } catch (error) {
              console.log(error)
            }
          });
        } else {
          return res.status(404).send({ message: "Usuario no permitido." })
        }
      });
    }
  })



};

const login = async (req, res) => {
  const { rut } = req.body;
  user.findOne({ rut }, (err, person) => {
    if (err) {
      return res.status(400).send({ message: 'Error al iniciar sesion' });
    }
    if (!person) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    return res.status(201).send({ message: 'Se ha iniciado sesion', person: rut });
  })
}

const getUsers = (req, res) => {
  const { id } = req.params;

  user.findById(id, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if (person.rol === "administrador") {
      user.find({}, (error, person) => {
        if (error) {
          return res.status(400).send({ message: "Error al buscar usuario." });
        }
        if (person.length === 0) {
          return res.status(404).send({ message: "Usuario no encontrado." });
        }
        return res.status(201).send(person);
      });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." })
    }
  });
};

const getUsersAll = (req, res) => {
  const admin = '0'

  user.find({ admin }, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if (person.length === 0) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    return res.status(201).send(person);
  }).select("name rol");
};

const updateUser = (req, res) => {
  const { name, rol, email, number, address } = req.body;
  const { id, userid } = req.params;

  if(!name.match(/^([a-zA-Z]+( [a-zA-Z]+)+)$/)) {
    return res.status(405).send({ message: 'El nombre solo debe contener letras.' });
  }

  if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return res.status(407).send({ message: 'Email mal ingresado.' });
  }

  if(!number.match(/^9\d\d\d\d\d\d\d\d$/)) {
    return res.status(408).send({ message: 'Numero mal ingresado.' });
  }

  user.findById(id, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if (person.rol === "administrador") {
      user.findByIdAndUpdate(userid, req.body, (error, person) => {
        if (error) {
          return res.status(400).send({ message: "Error al actualizar el usuario." });
        }
        if (!person) {
          return res.status(404).send({ message: "Usuario no encontrado." });
        }
        return res.status(201).send({ message: "Usuario actualizado." });
      });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." })
    }
  });
};

const deleteUser = (req, res) => {
  const { id, userid } = req.params;

  user.findById(id, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if (person.rol === "administrador") {
      user.findByIdAndDelete(userid, (error, userd) => {
        if (error) {
          return res.status(400).send({ message: "Error al eliminar el usuario." });
        }
        if (!userd) {
          return res.status(404).send({ message: "Usuario no encontrado." });
        }
        return res.status(201).send({ message: "Usuario eliminado." });
      });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." })
    }
  });
};

const getUserById = (req, res) => {
  const { id, userid } = req.params;

  user.findById(id, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if (person.rol === "administrador") {
      user.findById(userid, (error, person) => {
        if (error) {
          return res.status(400).send({ message: "Error al buscar el usuario." });
        }
        if (!person) {
          return res.status(404).send({ message: "Usuario no encontrado." });
        }
        return res.status(201).send(person);
      });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." })
    }
  });
};

const getUserByRut = (req, res) => {
  const { rut } = req.params;
  console.log(rut)
  user.findOne({ rut: rut }, (err, person) => {
    if (err) {
      return res.status(400).send({ message: 'Error al buscar rut' });
    }
    if (!person) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    return res.status(201).send(person);
  })
};

const getUsersEmail = (req, res) => {
  user.find({}, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar usuario." });
    }
    if (person.length === 0) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    return res.status(201).send(person);
  }).select("email -_id");
};

const getUserEmailById = (req, res) => {
  const { id, userid } = req.params;

  user.findById(id, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if (person.rol === "administrador") {
      user.findById(userid, (error, person) => {
        if (error) {
          return res.status(400).send({ message: "Error al buscar el correo del usuario." });
        }
        if (!person) {
          return res.status(404).send({ message: "Usuario no encontrado." });
        }
        return res.status(201).send(person.email);
      });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." })
    }
  });
};

const updateUserVote = (req, res) => {
  const {id, userid } = req.params;
  user.findOne({ userid}, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
      user.findByIdAndUpdate(id, req.body, (error, person) => {
        if (error) {
          return res.status(400).send({ message: "Error al actualizar el usuario." });
        }
        if (!person) {
          return res.status(404).send({ message: "Usuario no encontrado." });
        }
        return res.status(201).send({ message: "Usuario actualizado." });
      });
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
  getUserByRut,
  getUsersEmail,
  getUserEmailById,
  updateUserVote,
};
