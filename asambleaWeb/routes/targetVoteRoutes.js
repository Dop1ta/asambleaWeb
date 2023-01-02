const express = require("express");
const TargetVoteController = require("../controllers/TargetVoteController");
const api = express.Router();

api.post("/createTargetVote/:id", TargetVoteController.createTargetVote);
api.get("/getTargetVote", TargetVoteController.getTargetVote);
api.put("/updateTargetVote/:id/:userid", TargetVoteController.updateTargetVote);
api.delete("/deleteTargetVote/:id/:userid", TargetVoteController.deleteTargetVote);

module.exports = api;
