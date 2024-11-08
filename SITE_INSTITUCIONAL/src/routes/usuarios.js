var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})
router.post("/cadastrarGerente", function (req, res) {
    usuarioController.cadastrarGerente(req, res);
})
router.post("/cadastrarSuporte", function (req, res) {
    usuarioController.cadastrarSuporte(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listarCargo", function (req, res) {
    usuarioController.listarCargo(req, res);
});

module.exports = router;