const express = require("express");
const votingActivityController = require("../controllers/votingActivityController");
const api = express.Router();

api.post("/createVotingActivity/:id", votingActivityController.createVotingActivity);
api.get("/getAllVotingActivity", votingActivityController.getVotingActivity);
api.put("/updateVotingActivity/:id/:userid", votingActivityController.updateVotingActivity);
api.delete("/deleteVotingActivity/:id/:userid", votingActivityController.deleteVotingActivity);
api.get("/getVotingActivity/search/:id", votingActivityController.getVotingActivityById);
api.get("/getVotingActivityByState/search/:state", votingActivityController.getVotingActivityByState);
api.get("/closeVotingActivity/:id/:userid", votingActivityController.closeVotingActivity)

module.exports = api;
