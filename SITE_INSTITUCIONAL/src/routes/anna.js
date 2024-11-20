var express = require("express");
var router = express.Router();

var annaController = require("../controllers/annaController");

router.put("/listar", function (req, res) {
    annaController.listar(req, res);
});

router.put("/editar/:idAlerta", function (req, res) {
    annaController.editar(req, res);
});

module.exports = router;