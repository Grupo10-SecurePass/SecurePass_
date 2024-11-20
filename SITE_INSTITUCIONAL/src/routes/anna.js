var express = require("express");
var router = express.Router();

var annaController = require("../controllers/annaController");

router.get("/obterDados/:linha", function (req, res) {
    annaController.obterDados(req, res);
});

module.exports = router;