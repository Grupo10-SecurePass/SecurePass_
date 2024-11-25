var express = require("express");
var router = express.Router();

var preditivaController = require("../controllers/preditivaController");

router.get("/obterMediaDiaria/:linha", (req, res) => {
    preditivaController.obterMediaDiaria(req, res);
});

router.get("/obterDados/:linha", function (req, res) {
    preditivaController.obterDados(req, res);
});

router.get("/listarMaquinaPreditiva/:fkLinha", function (req, res) {
  preditivaController.listarMaquinaPreditiva(req, res);
})

module.exports = router;