var enzoModel = require("../models/enzoModel")

function obterTaxaDownload(req, res) {

    const idDispositivo = req.params.idDispositivo;
    enzoModel.obterTaxaDownload(idDispositivo)

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

//-----------------------------------------------------------------------------------------------------------------

function obterTaxaPacote(req, res) {

    const idDispositivo = req.params.idDispositivo;
    enzoModel.obterTaxaPacote(idDispositivo)

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

//-----------------------------------------------------------------------------------------------------------------

function obterPacote(req, res) {
    const idDispositivo = req.params.idDispositivo;
    enzoModel.obterPacote(idDispositivo)
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


//-----------------------------------------------------------------------------------------------------------------

function obterTransferencia(req, res) {
    const idDispositivo = req.params.idDispositivo;
    enzoModel.obterTransferencia(idDispositivo)
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

module.exports = {
    obterTaxaDownload,
    obterTaxaPacote,
    obterPacote,
    obterTransferencia
}