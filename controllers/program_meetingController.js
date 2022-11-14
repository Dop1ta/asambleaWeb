const programMeeting = require("../models/program_meeting");

const createMeeting = (req, res) => {
  const { name, time, hour, place, description } = req.body;
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
    return res.status(201).send(meeting);
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
      return res.status(400).send({ message: "Error actualiza reunión." });
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
  const { id } = req.params;
  programMeeting.findById(id, (error, meeting) => {
    if (error) {
      return res.status(400).send({ message: "Error." });
    }
    if (!meeting) {
      return res.status(404).send({ message: "Reunión no encontrada." });
    }
    return res.status(200).send(meeting);
  });
};

module.exports = {
  createMeeting,
  getMeetings,
  deleteMeeting,
  updateMeeting,
  getMeetingById,
};
