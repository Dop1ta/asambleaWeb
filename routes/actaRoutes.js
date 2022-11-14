const express = require("express");
const actaController = require("../controllers/actaController");
const api = express.Router();

api.post("/createActa", actaController.createActa);
api.get("/getActas", actaController.getActa);
api.put("/getActas/update/:id", actaController.updateActa);

api.delete("/getActas/delete/:id", actaController.deleteActa);
api.get("/getActas/search/:id", actaController.getActaById);

module.exports = api;
