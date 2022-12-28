const user = require("../models/users");

function verifyAdmin(id) {
  user.findById(id, (error, person) => {
    return person.rol === "administrador";
  });
}

module.exports = verifyAdmin;