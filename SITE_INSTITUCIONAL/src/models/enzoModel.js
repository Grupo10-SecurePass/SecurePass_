var database = require("../database/config");
const { listarMaquinaDash } = require("./maquinaModel");

function obterTaxaDownload(idDispositivo) {

  console.log("ACESSEI A FUNÇÃO DA TAXA DE DOWNLOAD");
  var instrucaoSql = `
SELECT 
    DATE(c.dataRegistro) AS data,
    ROUND(AVG(c.registro), 2) AS media_diaria_download
FROM 
    captura c
WHERE 
    c.fkComponente = 4 -- Filtro para a taxa de download
    AND DATE(c.dataRegistro) = CURDATE() -- Apenas o dia de hoje
GROUP BY 
    DATE(c.dataRegistro) -- Agrupamento por data (aqui será apenas hoje)
ORDER BY 
    data;
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
  console.log("ACESSEI A FUNÇÃO DA TAXA DE PACOTE");
  var instrucaoSql = `
      SELECT 
    COALESCE(ROUND(AVG(ABS(PacoteEnviado - PacoteRecebido)), 0), 0) AS media_perda_pacotes
FROM (
    SELECT 
        SUM(CASE WHEN c.fkComponente = 9 THEN c.registro ELSE 0 END) AS PacoteRecebido,
        SUM(CASE WHEN c.fkComponente = 10 THEN c.registro ELSE 0 END) AS PacoteEnviado
    FROM 
        captura c
    WHERE 
        c.dataRegistro >= CURDATE() - INTERVAL 5 DAY
    AND 
        c.fkDispositivo = ${idDispositivo}
    AND 
        c.fkComponente IN (9, 10)
    GROUP BY c.dataRegistro
) as tb;
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