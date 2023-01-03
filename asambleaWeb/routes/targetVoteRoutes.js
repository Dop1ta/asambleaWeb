const express = require("express");
const targetVoteController = require("../controllers/target_voteController");
const api = express.Router();

api.post("/createTargetVote/:id", targetVoteController.createTargetVote);
api.get("/getTargetVote", targetVoteController.getTargetVote);
api.put("/updateTargetVote/:id/:userid", targetVoteController.updateTargetVote);
api.delete("/deleteTargetVote/:id/:userid", targetVoteController.deleteTargetVote);

module.exports = api;
