var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.post("/listar", function (req, res) {
    avisoController.listar(req, res);
});
router.post("/listarSuporte", function (req, res) {
    avisoController.listarSuporte(req, res);
});
router.post("/listarMaquina", function (req, res) {
    avisoController.listarMaquina(req, res);
});
router.post("/pesquisa", function (req, res) {
    avisoController.pesquisa(req, res);
});
router.post("/pesquisaSuporte", function (req, res) {
    avisoController.pesquisaSuporte(req, res);
});
router.post("/pesquisaMaquina", function (req, res) {
    avisoController.pesquisaMaquina(req, res);
});
router.post("/dadosPerfil", function (req, res) {
    avisoController.dadosPerfil(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    avisoController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    avisoController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    avisoController.publicar(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    avisoController.editar(req, res);
});

router.delete("/deletar/:cpf", function (req, res) {
    avisoController.deletar(req, res);
});
router.delete("/deletarSuporte/:cpf", function (req, res) {
    avisoController.deletarSuporte(req, res);
});

module.exports = router;