var preditivaModel = require("../models/preditivaModel");

function obterMediaDiaria(req, res) {
    var linha = req.params.linha;
    var idDispositivo = req.params.idDispositivo;
    var componente = req.params.componente;
    preditivaModel.obterMediaDiaria(linha, idDispositivo, componente)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado.");
            }
        })
        .catch((erro) => {
            console.error("Erro ao obter dados de CPU e RAM: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


function obterDados(req, res) {
    var linha = req.params.linha;
    var idDispositivo = req.params.idDispositivo;
    var componente = req.params.componente;

    preditivaModel.obterDados(linha, idDispositivo, componente).then(function (resultado) {
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

function listarMaquinaPreditiva(req,res) {
  var fkLinha = req.params.linha;
  console.log(fkLinha)
    
  preditivaModel.listarMaquinaPreditiva(fkLinha).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function obterAlertas(req, res) {
    var linha = req.params.linha;
    var idDispositivo = req.params.idDispositivo;
    preditivaModel.obterAlertas(linha, idDispositivo)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado.");
            }
        })
        .catch((erro) => {
            console.error("Erro ao obter dados de CPU e RAM: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    obterMediaDiaria,
    obterDados,
    listarMaquinaPreditiva,
    obterAlertas
}