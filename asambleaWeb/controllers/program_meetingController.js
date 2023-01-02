const programMeeting = require("../models/program_meeting");
const user = require("../models/users");
const sendmail = require("../controllers/mailerProgram");
const useRegex = require("../utils/regex");

const createMeeting = (req, res) => {
  const { name, time, hour, place, description } = req.body;
  const { id } = req.params;

  if (!useRegex(name) || !useRegex(description) || !useRegex(place)) {
    return res.status(400).send({
      message: "El nombre, lugar y descripcion solo puede contener letras.",
    });
  }

  if (name == null || time == null || hour == null || place == null || description == null) {
    return res.status(400).send({
      message: "Un parametro no fue ingresado.",
    });
  }
  if (!name || !time || !hour || !place || !description) {
    return res.status(400).json({
      message: "Un parametro no fue ingresado.",
    });
  }
  if (name === "" || time === "" || hour === "" || place === "" || description === "") {
    return res.status(400).send({
      message: "Un parametro no fue ingresado.",
    });
  }
  if (Date.parse(time) < Date.now()) {
    return res.status(400).send({
      message: "La fecha no puede ser menor a la actual.",
    });
  }

  user.findById(id, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if (person.rol === "administrador") {
      const newMeeting = new programMeeting({
        name,
        time,
        hour,
        place,
        description,
      });

      newMeeting.save((error, meeting) => {
        if (error) {
          return res.status(400).send({ message: "Error creando reunión." });
        }
        try {
          sendmail(meeting);
          return res.status(201).send(meeting);
        } catch (error) {
          return res.status(400).send({ message: "Error enviando correo." });
        }
      });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." });
    }
  });
};

const getMeetings = (req, res) => {
  programMeeting.find({}, (error, meetings) => {
    if (error) {
      return res.status(400).send({ message: "Error encontrando reuniones." });
    }
    if (meetings.length === 0) {
      return res.status(404).send({ message: "Reunión no encontrada." });
    }
    return res.status(200).send(meetings);
  });
};

const updateMeeting = (req, res) => {
  const { id, idadmin } = req.params;
  const { name, time, place, description } = req.body;

  if (!useRegex(name) || !useRegex(description) || !useRegex(place)) {
    return res.status(400).send({
      message: "El nombre, lugar y descripcion solo puede contener letras.",
    });
  }
  if (Date.parse(time) < Date.now()) {
    return res.status(400).send({
      message: "La fecha no puede ser menor a la actual.",
    });
  }

  user.findById(idadmin, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if (person.rol === "administrador") {
      programMeeting.findByIdAndUpdate(id, req.body, (error, meeting) => {
        if (error) {
          return res
            .status(400)
            .send({ message: "Error al actualizar reunión." });
        }
        if (!meeting) {
          return res.status(404).send({ message: "Reunión no encontrada." });
        }
        sendmail(req.body);
        return res.status(200).send({ message: "Reunión actualizada." });
      });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." });
    }
  });
};

const deleteMeeting = (req, res) => {
  const { id, idadmin } = req.params;
  user.findById(idadmin, (error, person) => {
    if (error) {
      return res.status(400).send({ message: "Error al buscar el usuario." });
    }
    if (!person) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    if (person.rol === "administrador") {
      programMeeting.findByIdAndDelete(id, (error, meeting) => {
        if (error) {
          return res.status(400).send({ message: "Error eliminando reunión." });
        }
        if (!meeting) {
          return res.status(404).send({ message: "Reunión no encontrada." });
        }
        return res.status(200).send({ message: "Reunión eliminada." });
      });
    } else {
      return res.status(404).send({ message: "Usuario no permitido." });
    }
  });
};

const getMeetingById = (req, res) => {
  const { id } = req.params;
  programMeeting.findById(id, (error, meetings) => {
    if (error) {
      return res.status(400).send({ message: "Error al encontrar reuniones." });
    }
    if (!meetings) {
      return res.status(404).send({ message: "Reunión no encontrada." });
    }
    return res.status(200).send(meetings);
  });
};

const getRecently = (req, res) => {
  programMeeting.find({}, (error, meetings) => {
    if (error) {
      return res.status(400).send({ message: "Error encontrando reuniones." });
    }
    if (meetings.length === 0) {
      return res.status(404).send({ message: "Reunión no encontrada." });
    }
    const recently = meetings.filter(
      (meeting) => Date.parse(meeting.time) > Date.now()
    );
    return res.status(200).send(recently);
  });
}

module.exports = {
  createMeeting,
  getMeetings,
  deleteMeeting,
  updateMeeting,
  getMeetingById,
  getRecently
};
