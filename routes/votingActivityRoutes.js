const express = require("express");
const votingActivityController = require("../controllers/votingActivityController");
const api = express.Router();

api.post("/createVotingActivity/:id", votingActivityController.createVotingActivity);
api.get("/getVotingActivity", votingActivityController.getVotingActivity);
api.put("/getVotingActivity/update/:id", votingActivityController.updateVotingActivity);
api.delete("/getVotingActivity/delete/:id", votingActivityController.deleteVotingActivity);
api.get("/getVotingActivity/search/:id", votingActivityController.getVotingActivityById);

module.exports = api;
