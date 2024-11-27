var database = require("../database/config");
const { listarMaquinaDash } = require("./maquinaModel");

function obterTaxaDownload() {
  console.log("ACESSEI A FUNÇÃO DA TAXA DE DOWNLOAD");
  var instrucaoSql = `

    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  var receberDados = database.executar(instrucaoSql);
  console.log(receberDados);
  return receberDados;
}

function obterTaxaUpload(Linha) {
  console.log("ACESSEI A FUNÇÃO DA TAXA DE DOWNLOAD");

  var instrucaoSql = `
     SELECT 
          
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
            AND fkComponente = 4
            GROUP BY DATE_FORMAT(dataRegistro, '%d-%m')
            ORDER BY data
            LIMIT 5;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  obterTaxaDownload,
  obterTaxaUpload,
  obterTransferencia
}