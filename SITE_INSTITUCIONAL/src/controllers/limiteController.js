var limiteModel = require("../models/limiteModel");

function cadastrar(req, res) {
  var limitePercCPU = req.body.percCPUServer;
  var limitePercCPU = req.body.percCPUServer;
  var limitePercMEM = req.body.percMEMServer;
  var limitePercDISCO = req.body.percDISCOServer;
  var limiteRedeEnviada = req.body.redeEnviadaServer;
  var limiteRedeRecebida = req.body.redeRecebidaServer;
  var limiteFreqCPU = req.body.freqCPUServer;
  var limitePerdaPacote = req.body.perdaPacoteServer;
  var limiteTempoResposta = req.body.tempoRespostaServer;
  var fkLinha = req.body.fkLinhaServer;
  var idDispositivo = req.body.idDispositivoServer

  if (idDispositivo == undefined) {
    res.status(400).send("O idDispositivo está indefinido!");
  } else if (fkLinha == undefined) {
    res.status(400).send("A chave da linha está indefinida!");
  }else {

    limiteModel.cadastrar(idDispositivo, fkLinha, 
      limitePercCPU, 
      limitePercMEM,
      limitePercDISCO,
      limiteRedeEnviada,
      limiteRedeRecebida,
      limiteFreqCPU,
      limitePerdaPacote,
      limiteTempoResposta)
      .then((resultado) => {
        console.log(resultado)
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function atualizar(req, res) {
  var limitePercCPU = req.body.percCPUServer;
  var limitePercCPU = req.body.percCPUServer;
  var limitePercMEM = req.body.percMEMServer;
  var limitePercDISCO = req.body.percDISCOServer;
  var limiteRedeEnviada = req.body.redeEnviadaServer;
  var limiteRedeRecebida = req.body.redeRecebidaServer;
  var limiteFreqCPU = req.body.freqCPUServer;
  var limitePerdaPacote = req.body.perdaPacoteServer;
  var limiteTempoResposta = req.body.tempoRespostaServer;
  var idDispositivo = req.body.idDispositivoServer

  if (idDispositivo == undefined) {
    res.status(400).send("O idDispositivo está indefinido!");
  }else {

    limiteModel.atualizar(idDispositivo, 
      limitePercCPU, 
      limitePercMEM,
      limitePercDISCO,
      limiteRedeEnviada,
      limiteRedeRecebida,
      limiteFreqCPU,
      limitePerdaPacote,
      limiteTempoResposta)
      .then((resultado) => {
        console.log(resultado)
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}


module.exports = {
  cadastrar,
  atualizar,
}