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
      return res.status(400).send({ message: "Error creating meeting" });
    }
    return res.status(201).send(meeting);
  });
};

const getMeetings = (req, res) => {
  programMeeting.find({}, (error, meetings) => {
    if (error) {
      return res.status(400).send({ message: "Error getting meetings" });
    }
    if (meetings.length === 0) {
      return res.status(404).send({ message: "No meetings found" });
    }
    return res.status(200).send(meetings);
  });
};

const updateMeeting = (req, res) => {
  const { id } = req.params;
  programMeeting.findByIdAndUpdate(id, (error, meeting) => {
    if (error) {
      return res.status(400).send({ message: "Error update meeting" });
    }
    if (!meeting) {
      return res.status(404).send({ message: "Meeting not found" });
    }
    return res.status(200).send({ message: "Meeting Update" });
  });
};

const deleteMeeting = (req, res) => {
  const { id } = req.params;
  programMeeting.findByIdAndDelete(id, (error, meeting) => {
    if (error) {
      return res.status(400).send({ message: "Error deleting meeting" });
    }
    if (!meeting) {
      return res.status(404).send({ message: "Meeting not found" });
    }
    return res.status(200).send({ message: "Meeting deleted" });
  });
};

const getMeeting = (req, res) => {
  const { id } = req.params;
  programMeeting.findById(id, (error, meeting) => {
    if (error) {
      return res.status(400).send({ message: "Error" });
    }
    if (!meeting) {
      return res.status(404).send({ message: "Meeting not found" });
    }
    return res.status(200).send(meeting);
  });
};

module.exports = {
  createMeeting,
  getMeetings,
  deleteMeeting,
  updateMeeting,
  getMeeting,
};
