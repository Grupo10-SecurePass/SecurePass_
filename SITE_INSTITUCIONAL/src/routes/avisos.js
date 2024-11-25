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

router.get("/listarLinha", function (req, res) {
    avisoController.listarLinha(req, res);
});

router.post("/listarLinhaEmpresa", function (req, res) {
    avisoController.listarLinhaEmpresa(req, res);
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
router.post("/pesquisaLinha", function (req, res) {
    avisoController.pesquisaLinha(req, res);
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

router.post("/publicarFeedback/:idUsuario/:NR", function (req, res) {
    avisoController.publicarFeedback(req, res);
});
router.get("/listarFeedbacks/:idUsuario", function (req, res) {
    avisoController.listarFeedbacks(req, res);
});
router.get("/listarFeedbacksGeral", function (req, res) {
    avisoController.listarFeedbacksGeral(req, res);
});
router.put("/alterar", function (req, res) {
    avisoController.alterar(req, res);
});
router.put("/alterarDadosGerente", function (req, res) {
    avisoController.alterarDadosGerente(req, res);
});
router.put("/alterarTecnico", function (req, res) {
    avisoController.alterarDadosGerente(req, res);
});

router.put("/editar/:cpf", function (req, res) {
    avisoController.editar(req, res);
});

router.put("/deletar", function (req, res) {
    avisoController.deletar(req, res);
});

router.delete("/deletarSuporte", function (req, res) {
    avisoController.deletarSuporte(req, res);
});

router.post("/associar", function (req, res) {
    avisoController.associarLinha(req, res);
});

router.put("/desassociar/:idLinha", function (req, res) {
    avisoController.desassociarLinha(req, res);
});

router.delete("/deletarFeedbacks/:idFeedback", function (req, res) {
    avisoController.deletarFeedbacks(req, res);
});

module.exports = router;