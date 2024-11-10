var database = require("../database/config");

function buscarAquariosPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM aquario a WHERE fk_empresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(nome, fkLinha, ipCatraca) {
  
  var instrucaoSql = `INSERT INTO dispositivo(nome, ipv4Catraca, fkLinha, status) VALUES ('${nome}', '${ipCatraca}', ${fkLinha}, 1)`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atualizar(nome, ipCatraca, idDispositivo) {
  
  var instrucaoSql = `UPDATE dispositivo SET nome = '${nome}', ipv4Catraca = '${ipCatraca}' WHERE idDispositivo = ${idDispositivo}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function ativar(idDispositivo) {
  
  var instrucaoSql = `UPDATE dispositivo SET status = 1 WHERE idDispositivo = ${idDispositivo}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function desativar(idDispositivo) {
  
  var instrucaoSql = `UPDATE dispositivo SET status = 0 WHERE idDispositivo = ${idDispositivo}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarAquariosPorEmpresa,
  cadastrar,
  atualizar,
  ativar,
  desativar
}
