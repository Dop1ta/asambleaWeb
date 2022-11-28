const programMeeting = require("../models/program_meeting");
const user = require("../models/users");
const transporter = require("../controllers/mailerController");

const createMeeting = (req, res) => {
  const { name, time, hour, place, description } = req.body;
  const { id } = req.params;

  if (!name || !time || !hour || !place || !description) {
    return res.status(400).json({
      message: "Un parametro no fue ingresado.",
    });
  }

  if (Date.parse(time) < Date.now()) {
    return res.status(400).json({
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
          user.find({}, (error, person) => {
            let directory = person.map((person) => person.email);
            const mailOptions = {
              from: `Administrador`,
              to: directory,
              subject: "Nueva reuinon agendada",
              text: `Hola, se ha realizado de forma correcta el envio de los correos`,
              html: `
                    <h2>Hola estimados vecinos, se a agendado una reunion </h2>
                    <p>Dia: ${meeting.time}, Hora: ${meeting.hour}, lugar: ${meeting.place}</p>
                    <a href="http://146.83.198.35:1203/api/getMeetings/search/${meeting._id}"> Para mas informacion </a>
                `,
            };
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                return res.status(400).send({ message: "Error al enviar el correo" });
              }
              return res.status(200).send({ message: "Mensaje enviado" });
            });
          });
        } catch (error) {
          return res.status(400).send({ message: "Error enviando correo." });
        }
        return res.status(201).send(meeting);
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

module.exports = {
  createMeeting,
  getMeetings,
  deleteMeeting,
  updateMeeting,
  getMeetingById,
};
