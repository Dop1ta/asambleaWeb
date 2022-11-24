const express = require("express");
const userController = require("../controllers/userController");
const api = express.Router();

api.post("/createUser", userController.createUser);
api.get("/getUsers", userController.getUsers);
api.put("/getUsers/update/:id", userController.updateUser);
api.delete("/getUsers/delete/:id", userController.deleteUser);
api.get("/getUsers/search/:id", userController.getUserById);
api.get("/getUsers/emails", userController.getUsersEmail);
api.get("/getUsers/email/:id", userController.getUserEmailById);

module.exports = api;
