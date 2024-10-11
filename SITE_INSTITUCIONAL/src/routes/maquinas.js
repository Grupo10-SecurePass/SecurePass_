var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/:empresaId", function (req, res) {
  maquinaController.buscarAquariosPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  maquinaController.cadastrar(req, res);
})

module.exports = router;