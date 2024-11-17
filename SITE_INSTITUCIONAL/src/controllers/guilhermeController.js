var guilhermeModel = require("../models/guilhermeModel");

function obterPercentualCpu(req, res) {
    console.log("ACESSEI A CONTROLLER DE CPU");

    guilhermeModel.obterPercentualCpu().then(function (resultado) {
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

    guilhermeModel.obterPercentualRam().then(function (resultado) {
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

    guilhermeModel.obterQtdAlertasRamCpu().then(function (resultado) {
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

    guilhermeModel.obterTempAlertas().then(function (resultado) {
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

    guilhermeModel.obterInfoAlertas().then(function (resultado) {
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
