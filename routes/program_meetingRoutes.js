const express = require("express");
const meetingController = require("../controllers/program_meetingController");
const api = express.Router();

api.post("/createMeeting", meetingController.createMeeting);
api.get("/getMeetings", meetingController.getMeetings);
api.put("/getMeetings/update/:id", meetingController.updateMeeting);
api.delete("/getMeetings/delete/:id", meetingController.deleteMeeting);
api.get("/getMeetings/search/:id", meetingController.getMeetingById);

module.exports = api;
