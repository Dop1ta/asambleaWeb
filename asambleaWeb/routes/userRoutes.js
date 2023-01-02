const express = require("express");
const userController = require("../controllers/userController");
const api = express.Router();

api.post("/createUser/:id", userController.createUser);
api.post("/login", userController.login);
api.get("/getUsers/:id", userController.getUsers);
api.get("/getUsersAll", userController.getUsersAll);
api.put("/getUsers/update/:id/:userid", userController.updateUser);
api.delete("/getUsers/delete/:id/:userid", userController.deleteUser);
api.get("/getUsers/search/:id/:userid", userController.getUserById);
api.get("/getUsers/rut/:rut", userController.getUserByRut);
api.get("/getEmails", userController.getUsersEmail);
api.get("/getUsers/email/:id/:userid", userController.getUserEmailById);
api.get("/updateUserVote/:rut/:userid", userController.updateUserVote);
module.exports = api;