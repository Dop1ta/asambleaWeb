const programMeeting = require("../models/program_meeting");
const user = require("../models/users");
const transporter = require("../controllers/mailerController");

const createMeeting = (req, res) => {
  const { name, time, hour, place, description } = req.body;
  const { id } = req.params;

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
          let directory = ["gabriel.ruiz1901@alumnos.ubiobio.cl"];
          const mailOptions = {
            from: `Administrador <Prueba de texto>`,
            to: directory,
            subject: "Prueba de correos",
            text: `Hola, se ha realizado de forma correcta el envio de los correos`,
            html: `
                <h1>Felicitaciones, has enviado un correo</h1>
                <p>${meeting.description}</p>
            `,
          };
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              return res
                .status(400)
                .send({ message: "Error al enviar el correo" });
            }
            return res.status(200).send({ message: "Mensaje enviado" });
          });
          transporter
            .verify()
            .then(() => {
              console.log("Servidor de correos habilitado");
            })
            .catch((err) => {
              console.log("Error al utilizar servidor de correos");
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
  const { id } = req.params;
  programMeeting.findByIdAndUpdate(id, req.body, (error, meeting) => {
    if (error) {
      return res.status(400).send({ message: "Error al actualizar reunión." });
    }
    if (!meeting) {
      return res.status(404).send({ message: "Reunión no encontrada." });
    }
    return res.status(200).send({ message: "Reunión actualizada." });
  });
};

const deleteMeeting = (req, res) => {
  const { id } = req.params;
  programMeeting.findByIdAndDelete(id, (error, meeting) => {
    if (error) {
      return res.status(400).send({ message: "Error eliminando reunión." });
    }
    if (!meeting) {
      return res.status(404).send({ message: "Reunión no encontrada." });
    }
    return res.status(200).send({ message: "Reunión eliminada." });
  });
};

const getMeetingById = (req, res) => {
  programMeeting.findById({}, (error, meetings) => {
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
