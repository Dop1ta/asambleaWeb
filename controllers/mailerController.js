const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.PWD;

console.log(process.env.PWD);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "gabriel.ruiz1901@alumnos.ubiobio.cl",
    pass: token,
  },
});

transporter.verify(function (error, _) {
  console.error(error);
});


module.exports = transporter;
