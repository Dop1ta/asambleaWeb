const express = require("express");
const meetingController = require("../controllers/program_meetingController");
const api = express.Router();

api.post("/createMeeting/:id", meetingController.createMeeting);
api.get("/getMeetings", meetingController.getMeetings);
api.put("/getMeetings/update/:id/:idadmin", meetingController.updateMeeting);
api.delete("/getMeetings/delete/:id/:idadmin", meetingController.deleteMeeting);
api.get("/getMeetings/search/:id", meetingController.getMeetingById);
api.get("/getMeetings/recently/", meetingController.getRecently);

module.exports = api;
