var maquinaModel = require("../models/maquinaModel");

function buscarAquariosPorEmpresa(req, res) {
  var idUsuario = req.params.idUsuario;

  aquarioModel.buscarAquariosPorEmpresa(idUsuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function cadastrar(req, res) {
  var nome = req.body.nomeServer;
  var fkLinha = req.body.fkLinhaServer;
  var ipCatraca = req.body.ipCatracaServer
  console.log(nome)
  console.log(fkLinha)
  console.log(ipCatraca)

  if (nome == undefined) {
    res.status(400).send("O nome está indefinido!");
  } else if (fkLinha == undefined) {
    res.status(400).send("A chave da linha está indefinida!");
  } else if (ipCatraca == undefined) {
    res.status(400).send("O ip da catraca está indefinido!");
  } else {

    maquinaModel.cadastrar(nome, fkLinha, ipCatraca)
      .then((idDispositivo) => {
        console.log(`id do dispositivo no controler: ${idDispositivo}`)
        res.status(201).json({idDispositivo: idDispositivo});
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
  var nome = req.body.nomeServer;
  var ipCatraca = req.body.ipCatracaServer;
  var idDispositivo = req.body.idDispositivoServer;
  console.log(nome)
  console.log(ipCatraca)
  console.log(idDispositivo)

  if (nome == undefined) {
    res.status(400).send("O nome está indefinido!");
  } else if (ipCatraca == undefined) {
    res.status(400).send("O ip da catraca está indefinido!");
  } else if (idDispositivo == undefined) {
    res.status(400).send("O id do dispositivo está indefinido!");
  } else {

    maquinaModel.atualizar(nome, ipCatraca, idDispositivo)
      .then((resultado) => {
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

function ativar(req, res) {
  var idDispositivo = req.body.idDispositivoServer;
  console.log(idDispositivo)

  if (idDispositivo == undefined) {
    res.status(400).send("O id do dispositivo está indefinido!");
  } else {

    maquinaModel.ativar(idDispositivo)
      .then((resultado) => {
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

function desativar(req, res) {
  var idDispositivo = req.body.idDispositivoServer;
  console.log(idDispositivo)

  if (idDispositivo == undefined) {
    res.status(400).send("O id do dispositivo está indefinido!");
  } else {

    maquinaModel.desativar(idDispositivo)
      .then((resultado) => {
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

function listarMaquinaDash(req,res) {
  var fkLinha = req.params.fkLinha;
  console.log(fkLinha)
    
  maquinaModel.listarMaquinaDash(fkLinha).then(function (resultado) {
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
  buscarAquariosPorEmpresa,
  cadastrar,
  atualizar,
  ativar,
  desativar,
  listarMaquinaDash
}