var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/:empresaId", function (req, res) {
  maquinaController.buscarAquariosPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  maquinaController.cadastrar(req, res);
})

router.post("/atualizar", function (req, res) {
  maquinaController.atualizar(req, res);
})

router.post("/ativarMaquina", function (req, res) {
  maquinaController.ativar(req, res);
})

router.post("/desativarMaquina", function (req, res) {
  maquinaController.desativar(req, res);
})

router.get("/listarMaquinaDash/:fkLinha", function (req, res) {
  maquinaController.listarMaquinaDash(req, res);
})

module.exports = router;