const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const token = process.env.PWD;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "gabriel.ruiz1901@alumnos.ubiobio.cl",
    pass: token,
  },
});

module.exports = transporter;
