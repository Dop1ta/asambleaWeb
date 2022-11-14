const acta_Meeting = require("../models/acta_Meeting");

const createActa = (req, res) => {
  const { name, description, date } = req.body;
  const newMeeting = new acta_Meeting({
    name,
    description,
    date,
  });

  newMeeting.save((error, meeting) => {
    if (error) {
      return res.status(400).send({ message: "Error al crear acta." });
    }
    return res.status(201).send(meeting);
  });
};

const getActa = (req, res) => {
  acta_Meeting.find({}, (error, meetings) => {
    if (error) {
      return res.status(400).send({ message: "Error obteniendo acta." });
    }
    if (meetings.length === 0) {
      return res.status(404).send({ message: "Acta no encontrada." });
    }
    return res.status(200).send(meetings);
  });
};

const updateActa = (req, res) => {
  const { id } = req.params;
  acta_Meeting.findByIdAndUpdate(id, req.body, (error, meeting) => {
    if (error) {
      return res.status(400).send({ message: "Error al actualizar acta." });
    }
    if (!meeting) {
      return res.status(404).send({ message: "Acta no encontrada." });
    }
    return res.status(200).send({ message: "Acta Actualizada." });
  });
};

const deleteActa = (req, res) => {
  const { id } = req.params;
  acta_Meeting.findByIdAndDelete(id, (error, meeting) => {
    if (error) {
      return res.status(400).send({ message: "Error eliminando acta." });
    }
    if (!meeting) {
      return res.status(404).send({ message: "Acta no encontrada." });
    }
    return res.status(200).send({ message: "Acta eliminada." });
  });
};

const getActaById = (req, res) => {
  const { id } = req.params;
  acta_Meeting.findById(id, (error, meeting) => {
    if (error) {
      return res.status(400).send({ message: "Error." });
    }
    if (!meeting) {
      return res.status(404).send({ message: "Acta no encontrada." });
    }
    return res.status(200).send(meeting);
  });
};

module.exports = {
  createActa,
  getActa,
  updateActa,
  deleteActa,
  getActaById,
};
