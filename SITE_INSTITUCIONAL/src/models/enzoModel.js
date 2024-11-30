var database = require("../database/config");
const { listarMaquinaDash } = require("./maquinaModel");

function obterTaxaDownload(idDispositivo) {
  console.log("ACESSEI A FUNÇÃO DA TAXA DE DOWNLOAD");
  var instrucaoSql = `
      SELECT 
    ROUND(AVG(c.registro), 2) AS media_registro
FROM 
    captura c
WHERE 
    c.dataRegistro >= CURDATE() - INTERVAL 5 DAY
    AND c.fkDispositivo = ${idDispositivo};
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  var receberDados = database.executar(instrucaoSql);
  console.log(receberDados);
  return receberDados;
}

function obterPacote(idDispositivo) {
  console.log("ACESSEI A FUNÇÃO DA TAXA DE DOWNLOAD");

  var instrucaoSql = `
    SELECT 
            DATE_FORMAT(dataRegistro, '%d-%m') AS data,
            AVG(registro) AS media_diaria
            FROM captura
            WHERE fkDispositivo = ${idDispositivo}
            AND fkComponente in (9,10)
            GROUP BY DATE_FORMAT(dataRegistro, '%d-%m')
            ORDER BY MAX(dataRegistro) LIMIT 5 ;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function obterTransferencia(idDispositivo) {
  console.log("ACESSEI A FUNÇÃO DA TAXA DE DOWNLOAD");

  var instrucaoSql = `
    SELECT 
            DATE_FORMAT(dataRegistro, '%d-%m') AS data,
            AVG(registro) AS media_diaria
            FROM captura
            WHERE fkDispositivo = ${idDispositivo}
            AND fkComponente in (4,5)
            GROUP BY DATE_FORMAT(dataRegistro, '%d-%m')
            ORDER BY MAX(dataRegistro) LIMIT 5 ;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function obterTaxaPacote(idDispositivo) {
  console.log("ACESSEI A FUNÇÃO DA TAXA DE DOWNLOAD");
  var instrucaoSql = `
      SELECT 
    ROUND(AVG(
        (c.PacoteEnviado - c.PacoteRecebido) / c.PacoteEnviado * 100
    ), 2) AS media_perda_pacotes
FROM 
    captura c
WHERE 
    c.dataRegistro >= CURDATE() - INTERVAL 5 DAY
    AND c.fkDispositivo = ${idDispositivo} IN (9, 10);
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  var receberDados = database.executar(instrucaoSql);
  console.log(receberDados);
  return receberDados;
}


module.exports = {
  obterTaxaDownload,
  obterTaxaPacote,
  obterPacote,
  obterTransferencia
}