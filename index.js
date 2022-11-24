const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const programMeetingRoutes = require("./routes/program_meetingRoutes");
const actaRoutes = require("./routes/actaRoutes");
const userRoutes = require("./routes/userRoutes");
const votingActivityRoutes = require("./routes/votingActivityRoutes");
const fileRoutes = require("./routes/fileRoutes");

app.use(cors());
app.use(express.json());
app.options("*", cors());
app.use("/api", programMeetingRoutes);
app.use("/api", actaRoutes);
app.use("/api", userRoutes);
app.use("/api", votingActivityRoutes);
app.use("/api", fileRoutes);

const options = {
  useNewUrlParser: true,
  autoIndex: true,
  keepAlive: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DB, options, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to database");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port  ${process.env.PORT}`);
});
