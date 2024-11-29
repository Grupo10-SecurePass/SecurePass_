var express = require("express");
var router = express.Router();

var guilhermeController = require("../controllers/guilhermeController");

router.get("/obterPercentualCpu/:Linha", function (req, res) {
    guilhermeController.obterPercentualCpu(req, res);
});

router.get("/obterPercentualRam/:Linha", function (req, res) {
    guilhermeController.obterPercentualRam(req, res);
});

router.get("/obterQtdAlertasRamCpu/:Linha", function (req, res) {
    guilhermeController.obterQtdAlertasRamCpu(req, res);
});

router.get("/obterTempAlertas/:Linha", function (req, res) {
    guilhermeController.obterTempAlertas(req, res);
});

router.post("/Gemini/Bobia", function (req, res) {
    guilhermeController.Bobia(req, res);
});

router.get("/obterInfoAlertas/:Linha", function (req, res) {
    guilhermeController.obterInfoAlertas(req, res);
});

module.exports = router;
