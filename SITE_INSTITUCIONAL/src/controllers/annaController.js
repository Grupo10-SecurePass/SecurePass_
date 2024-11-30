var annaModel = require("../models/annaModel");

function obterDados(req, res) {
    var linha = req.params.linha;

    annaModel.obterDados(linha).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).json("nada")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterDadosComponente(req, res) {
    var linha = req.params.linha;

    annaModel.obterDadosComponente(linha)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).json("Nenhum dado encontrado.");
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar os dados:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    obterDados,
    obterDadosComponente
};


