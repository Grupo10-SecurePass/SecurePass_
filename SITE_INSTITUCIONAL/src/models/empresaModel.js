var database = require("../database/config");

function buscarPorId(idUsuario) {
  var instrucaoSql = `SELECT * FROM usuario WHERE idUsuario = '${idUsuario}'`;

  return database.executar(instrucaoSql);
}

function verificarNR(fkNR) {
  var instrucaoSql = `SELECT * FROM empresa WHERE NR = '${fkNR}'`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(nomeEmpresa, razaoSocial, cnpj, NR) {
  var instrucaoSql = `INSERT INTO empresa VALUES (${NR},'${nomeEmpresa}', ${cnpj}, '${razaoSocial}', 'ativo')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, verificarNR };
