const express = require("express");
const meetingController = require("../controllers/program_meetingController");
const api = express.Router();

api.post("/createMeeting", meetingController.createMeeting);
api.get("/getMeetings", meetingController.getMeetings);
api.put("/createMeeting/update/:id", meetingController.updateMeeting);
api.delete("/createMeeting/delete/:id", meetingController.deleteMeeting);
api.get("/createMeeting/search/:id", meetingController.getMeeting);

module.exports = api;
