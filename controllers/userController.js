const user = require("../models/users");

const createUser = (req, res) => {
  const { name, rut, rol, email, address } = req.body;
  const newUser = new user({
    name,
    rut,
    rol,
    email,
    address,
  });

  newUser.save((error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al crear un usuario." });
    }
    return res.status(201).send(person);
  });
};

const getUsers = (req, res) => {
  user.find({}, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Hay un error al buscar usuario." });
    }
    if (person.length === 0) {
      return res.status(404).send({ message: "No se puede encontrar el usuario." });
    }
    return res.status(200).send(person);
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  user.findByIdAndUpdate(id, req.body, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al actualizar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    return res.status(200).send({ message: "Usuario actualizado." });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  user.findByIdAndDelete(id, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al eliminar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    return res.status(200).send({ message: "Usuario eliminado." });
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  user.findById(id, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    return res.status(200).send(person);
  });
};

const getUsersEmail = (req, res) => {
  user.find({}, (error, person) => {
      if (error) {
        return res.status(400).send({ message: "Hay un error al buscar usuario." });
      }
      if (person.length === 0) {
        return res.status(404).send({ message: "No se puede encontrar el usuario." });
      }
      return res.status(200).send(person);
    })
    .select("email -_id");
};

const getUserEmailById = (req, res) => {
  const { id } = req.params;
  user.findById(id, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el correo del usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    return res.status(200).send(person.email);
  });
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  getUsersEmail,
  getUserEmailById,
};
