var express = require("express");
var router = express.Router();

var limiteController = require("../controllers/limiteController");

router.post("/cadastrar", function (req, res) {
  limiteController.cadastrar(req, res);
})

router.post("/atualizar", function (req, res) {
  limiteController.atualizar(req, res);
})

module.exports = router;