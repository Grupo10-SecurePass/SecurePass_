var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/cadastrar", function (req, res) {
  empresaController.cadastrar(req, res);
});

router.get("/buscar", function (req, res) {
  empresaController.buscarPorCnpj(req, res);
});

router.get("/buscar/:idUsuario", function (req, res) {
  empresaController.buscarPorId(req, res);
});

router.get("/verificarNR", function (req, res) {
  empresaController.verificarNR(req, res);
});

module.exports = router;
