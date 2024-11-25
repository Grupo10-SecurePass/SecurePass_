var express = require("express");
var router = express.Router();

var enzoController = require("../controllers/enzoController");

router.get("/obterTaxaDownload/:linha", function (req, res) {
    enzoController.obterTaxaDownload(req, res);
});

router.get("/obterTaxaUpload/:linha", function (req, res) {
    enzoController.obterTaxaUpload(req, res);
});

router.get("/obterTransferencia/:linha", function (req, res) {
    enzoController.obterTransferencia(req, res);
});


module.exports = router;
