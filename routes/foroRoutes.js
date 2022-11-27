const express = require("express");
const foroController = require("../controllers/foroController");
const api = express.Router();

api.post("/createForo/:id", foroController.createForo);

module.exports = api;