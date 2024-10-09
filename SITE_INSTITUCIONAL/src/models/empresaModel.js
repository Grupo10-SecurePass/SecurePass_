var database = require("../database/config");

function buscarPorId(idUsuario) {
  var instrucaoSql = `SELECT * FROM usuario WHERE idUsuario = '${idUsuario}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT NR FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(nomeEmpresa, emailEmpresa, cnpj, NR) {
  var instrucaoSql = `INSERT INTO empresa VALUES (${NR},'${nomeEmpresa}', ${cnpj}, '${emailEmpresa}', 'ativo')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
