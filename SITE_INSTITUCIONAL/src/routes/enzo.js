var express = require("express");
var router = express.Router();

var enzoController = require("../controllers/enzoController");

router.get("/obterTaxaDownload/:idDispositivo", function (req, res) {
    enzoController.obterTaxaDownload(req, res);
});

router.get("/obterTaxaPacote/:idDispositivo", function (req, res) {
    enzoController.obterTaxaPacote(req, res);
});

router.get("/obterPacote/:idDispositivo", function (req, res) {
    enzoController.obterPacote(req, res);
});

router.get("/obterTransferencia/:idDispositivo", function (req, res) {
    enzoController.obterTransferencia(req, res);
});


module.exports = router;
