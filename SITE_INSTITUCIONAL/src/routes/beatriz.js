var express = require("express");
var router = express.Router();
var beatrizController = require("../controllers/beatrizController");

router.get("/RAMbea", function (req, res) {
    medidaController.RAMbea(req, res);
});

router.get("/CPUbea", function (req, res) {
    medidaController.CPUbea(req, res);
});
router.get("/TempoRespostaBea", function (req, res) {
    medidaController.TempoRespostaBea(req, res);
});
router.get("/DISCObea", function (req, res) {
    medidaController.DISCObea(req, res);
});

module.exports = router;