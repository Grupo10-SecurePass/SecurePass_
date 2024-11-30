var express = require("express");
var router = express.Router();

var annaController = require("../controllers/annaController");

router.get("/obterDados/:linha", function (req, res) {
    annaController.obterDados(req, res);
});

router.get("/obterDadosComponente/:linha", function (req, res) {
    annaController.obterDadosComponente(req, res);
});

module.exports = router;


