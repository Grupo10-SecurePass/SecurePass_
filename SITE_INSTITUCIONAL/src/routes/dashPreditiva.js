var express = require("express");
var router = express.Router();

var preditivaController = require("../controllers/preditivaController");

router.get("/obterMediaDiaria/:linha/:idDispositivo/:componente", (req, res) => {
    preditivaController.obterMediaDiaria(req, res);
});

router.get("/obterDados/:linha/:idDispositivo/:componente", function (req, res) {
    preditivaController.obterDados(req, res);
});

router.get("/listarMaquinaPreditiva/:linha", function (req, res) {
  preditivaController.listarMaquinaPreditiva(req, res);
});

router.get("/obterAlertas/:linha/:idDispositivo", (req, res) => {
  preditivaController.obterAlertas(req, res);
});

module.exports = router;