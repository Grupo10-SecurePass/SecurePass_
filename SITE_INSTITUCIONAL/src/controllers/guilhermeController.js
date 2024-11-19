var guilhermeModel = require("../models/guilhermeModel");

function obterPercentualCpu(req, res) {
    console.log("ACESSEI A CONTROLLER DE CPU");
    var Linha = req.params.Linha;

    guilhermeModel.obterPercentualCpu(Linha).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados da CPU:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterPercentualRam(req, res) {
    console.log("ACESSEI A CONTROLLER DE RAM");
    var Linha = req.params.Linha;

    guilhermeModel.obterPercentualRam(Linha).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados da RAM:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterQtdAlertasRamCpu(req, res) {
    console.log("ACESSEI A CONTROLLER DE ALERTAS RAM E CPU");
    var Linha = req.params.Linha;

    guilhermeModel.obterQtdAlertasRamCpu(Linha).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados dos alertas da ram e da cpu:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterTempAlertas(req, res) {
    console.log("ACESSEI A CONTROLLER DE TEMPO ESTÁVEL E EM ALERTA");
    var Linha = req.params.Linha;

    guilhermeModel.obterTempAlertas(Linha).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados de estável e em alerta:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterInfoAlertas(req, res) {
    console.log("ACESSEI A CONTROLLER DE INFORMAÇÃO DOS ALERTAS");
    var Linha = req.params.Linha;

    guilhermeModel.obterInfoAlertas(Linha).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados de informações dos alertas", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    obterPercentualCpu,
    obterPercentualRam,
    obterQtdAlertasRamCpu,
    obterTempAlertas,
    obterInfoAlertas
};
