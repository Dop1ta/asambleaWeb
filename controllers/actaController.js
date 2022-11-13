const acta_Meeting = require("../models/acta_Meeting");

const createActa = (req, res) => {
  const { description, date } = req.body;
  const newMeeting = new acta_Meeting({
    description,
    date,
  });

  newMeeting.save((error, meeting) => {
    if (error) {
      return res.status(400).send({ message: "Error create acta" });
    }
    return res.status(201).send(meeting);
  });
};

const getActa = (req, res) => {
  acta_Meeting.find({}, (error, meetings) => {
    if (error) {
      return res.status(400).send({ message: "Error getting actas" });
    }
    if (meetings.length === 0) {
      return res.status(404).send({ message: "No actas found" });
    }
    return res.status(200).send(meetings);
  });
};

const updateActa = (req, res) => {
  const { id } = req.params;
  acta_Meeting.findByIdAndUpdate(id, req.body, (error, meeting) => {
    if (error) {
      return res.status(400).send({ message: "Error update acta" });
    }
    if (!meeting) {
      return res.status(404).send({ message: "Acta not found" });
    }
    return res.status(200).send({ message: "Acta Update" });
  });
};

const deleteActa = (req, res) => {
  const { id } = req.params;
  acta_Meeting.findByIdAndDelete(id, (error, meeting) => {
    if (error) {
      return res.status(400).send({ message: "Error deleting acta" });
    }
    if (!meeting) {
      return res.status(404).send({ message: "Acta not found" });
    }
    return res.status(200).send({ message: "Acta deleted" });
  });
};

const getActaById = (req, res) => {
  const { id } = req.params;
  acta_Meeting.findById(id, (error, meeting) => {
    if (error) {
      return res.status(400).send({ message: "Error" });
    }
    if (!meeting) {
      return res.status(404).send({ message: "Acta not found" });
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
