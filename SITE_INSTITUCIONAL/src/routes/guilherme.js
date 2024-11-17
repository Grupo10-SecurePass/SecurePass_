var express = require("express");
var router = express.Router();

var guilhermeController = require("../controllers/guilhermeController");

router.get("/obterPercentualCpu", function (req, res) {
    guilhermeController.obterPercentualCpu(req, res);
});

router.get("/obterPercentualRam", function (req, res) {
    guilhermeController.obterPercentualRam(req, res);
});

router.get("/obterQtdAlertasRamCpu", function (req, res) {
    guilhermeController.obterQtdAlertasRamCpu(req, res);
});

router.get("/obterTempAlertas", function (req, res) {
    guilhermeController.obterTempAlertas(req, res);
});

router.get("/obterInfoAlertas", function (req, res) {
    guilhermeController.obterInfoAlertas(req, res);
});

module.exports = router;
