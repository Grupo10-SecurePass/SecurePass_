var database = require("../database/config");

function buscarAquariosPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM aquario a WHERE fk_empresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

async function cadastrar(nome, fkLinha, ipCatraca) {
  
  var instrucaoSqlInserir = `INSERT INTO dispositivo(nome, ipv4Catraca, fkLinha, status) VALUES ('${nome}', '${ipCatraca}', ${fkLinha}, 1)`;

    await database.executar(instrucaoSqlInserir);

    // Segunda instrução para obter o `idDispositivo` recém-inserido
    var instrucaoSqlUltimoId = `SELECT MAX(idDispositivo) as idDispositivo FROM dispositivo`;

    console.log("Executando a instrução SQL para pegar o último ID inserido: \n" + instrucaoSqlUltimoId);
    
    // Executa a instrução para pegar o ID e retorna o valor
    const resultado = await database.executar(instrucaoSqlUltimoId);
    console.log(resultado)
    const idDispositivo = resultado[0].idDispositivo;

    return idDispositivo;
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
