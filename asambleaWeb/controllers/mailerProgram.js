const nodemailer = require('nodemailer');
const user = require('../models/users');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.PWD;

const sendmail = (meeting, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "gabriel.ruiz1901@alumnos.ubiobio.cl",
      pass: token,
    },
  });

  user.find({ transporter, meeting }, (error, person) => {
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


  transporter.verify().then(() => {
    console.log("Servidor de correos habilitado");
  }).catch((err) => {
    console.log("Error al utilizar servidor de correos");
  });
}

module.exports = sendmail;