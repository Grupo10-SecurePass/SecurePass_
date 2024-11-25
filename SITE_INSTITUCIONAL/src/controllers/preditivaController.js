var preditivaModel = require("../models/preditivaModel");

function obterMediaDiaria(req, res) {
    const linha = req.params.linha;
    preditivaModel.obterMediaDiaria(linha)
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

    preditivaModel.obterDados(linha).then(function (resultado) {
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
  var fkLinha = req.params.fkLinha;
  console.log(fkLinha)
    
  maquinaModel.preditivaModel(fkLinha).then(function (resultado) {
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

module.exports = {
    obterMediaDiaria,
    obterDados,
    listarMaquinaPreditiva
}