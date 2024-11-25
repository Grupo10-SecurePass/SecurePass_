var database = require("../database/config");

function obterTaxaDownload(Linha) {
  console.log("ACESSEI A FUNÇÃO DA TAXA DE DOWNLOAD");

  var instrucaoSql = `
       SELECT 
    YEAR(c.dataRegistro) AS ano,
    WEEK(c.dataRegistro) AS semana,
    AVG(c.registro) AS media_bytes_recebidos
    FROM 
        captura c
    INNER JOIN 
        componente comp ON c.fkComponente = comp.idComponente
    WHERE 
        comp.nome = 'RedeRecebida'
    GROUP BY 
        ano, semana
    ORDER BY 
       ano, semana;
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function obterTaxaUpload(Linha) {
  console.log("ACESSEI A FUNÇÃO DA TAXA DE DOWNLOAD");

  var instrucaoSql = `
     SELECT 
          
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function obterTransferencia(Linha) {
  console.log("ACESSEI A FUNÇÃO DA TAXA DE DOWNLOAD");

  var instrucaoSql = `
    
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
