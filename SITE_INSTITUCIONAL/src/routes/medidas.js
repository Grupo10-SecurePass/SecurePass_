var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/alertaVEL/:idDispositivo", function (req, res) {
    medidaController.alertaVEL(req, res);
});

router.get("/TempoResposta/:idDispositivo", function (req, res) {
    medidaController.TempoResposta(req, res);
});

router.get("/TempoRespostaCalor/:idDispositivo", function (req, res) {
    medidaController.TempoRespostaCalor(req, res);
});

router.get("/Freq/:idDispositivo", function (req, res) {
    medidaController.Freq(req, res);
});

router.get("/Upload/:idDispositivo", function (req, res) {
    medidaController.Upload(req, res);
});

router.get("/UploadGerente/:idDispositivo", function (req, res) {
    medidaController.UploadGerente(req, res);
});

router.get("/Download/:idDispositivo", function (req, res) {
    medidaController.Download(req, res);
});

router.get("/DownloadGerente/:idDispositivo", function (req, res) {
    medidaController.DownloadGerente(req, res);
});

router.get("/RAM/:idDispositivo", function (req, res) {
    medidaController.RAM(req, res);
});

router.get("/CPU/:idDispositivo", function (req, res) {
    medidaController.CPU(req, res);
});

router.get("/CPUGerente/:idDispositivo", function (req, res) {
    medidaController.CPUGerente(req, res);
});

router.get("/DISCO/:idDispositivo", function (req, res) {
    medidaController.DISCO(req, res);
});

router.get("/MaquinasRisco", function (req, res) {
    medidaController.MaquinasRisco(req, res);
});

router.get("/LinhaProblemas", function (req, res) {
    medidaController.LinhaProblemas(req, res);
});

module.exports = router;