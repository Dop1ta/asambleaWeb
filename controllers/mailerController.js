const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const token = process.env.PW;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "gabriel.1901@alumnos.ubiobio.cl",
    pass: token,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Servidor de correos habilitado");
  })
  .catch((err) => {
    console.log("Error al utilizar servidor de correos");
  });

module.exports = transporter;
