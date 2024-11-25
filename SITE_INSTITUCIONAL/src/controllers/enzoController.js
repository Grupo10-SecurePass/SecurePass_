var enzoController = require("../models/enzoModel")

function obterTaxaDownload(req, res) {
    const linha = req.params.linha;
    enzoModel.obterTaxaDownload(linha)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado.");
            }
        })
        .catch((erro) => {
            console.error("Erro ao obter dados de Download: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterTaxaUpload(req, res) {
    const linha = req.params.linha;
    enzoModel.obterTaxaUpload(linha)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado.");
            }
        })
        .catch((erro) => {
            console.error("Erro ao obter dados de Upload: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterTransferencia(req, res) {
    const linha = req.params.linha;
    enzoModel.obterTransferencia(linha)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado.");
            }
        })
        .catch((erro) => {
            console.error("Erro ao obter dados de transferencia: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}