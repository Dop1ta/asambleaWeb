const express = require("express");
const foroController = require("../controllers/foroController");
const api = express.Router();

api.post("/createForo/:id", foroController.createForo);
api.get("/getForo/:id", foroController.getForo);
api.put("/getForo/update/:id/:foroid", foroController.updateForo);
api.delete("/getForo/delete/:id/:foroid", foroController.deleteForoAdmin);
api.delete("/getForo/deleteUser/:id/:foroid", foroController.deleteForoUser);

module.exports = api;