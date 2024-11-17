var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.post("/listar", function (req, res) {
    alertaController.listar(req, res);
});

router.put("/editar/:idAlerta", function (req, res) {
    alertaController.editar(req, res);
});

module.exports = router;