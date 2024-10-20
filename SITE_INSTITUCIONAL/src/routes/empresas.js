var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

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