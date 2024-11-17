var database = require("../database/config");

function obterPercentualCpu() {
    console.log("ACESSEI A FUNÇÃO DE CAPTURA DE CPU");

    var instrucaoSql = `
       SELECT 
    DATE_FORMAT(c.dataRegistro, '%H:%i:%s') AS horario, 
    c.registro AS percentualCpu
FROM captura c
INNER JOIN componente cm ON c.fkComponente = cm.idComponente
WHERE cm.nome = 'PercCPU'
ORDER BY c.dataRegistro DESC
LIMIT 15;

    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function obterPercentualRam() {
    console.log("ACESSEI A FUNÇÃO DE CAPTURA DE RAM");

    var instrucaoSql = `
       SELECT 
    DATE_FORMAT(c.dataRegistro, '%H:%i:%s') AS horario, 
    c.registro AS percentualRam
FROM captura c
INNER JOIN componente cm ON c.fkComponente = cm.idComponente
WHERE cm.nome = 'PercMEM'
ORDER BY c.dataRegistro DESC
LIMIT 15;

    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);  
}

function obterQtdAlertasRamCpu() {
    console.log("ACESSEI A FUNÇÃO DE CAPTURA DE RAM");

    var instrucaoSql = `
     SELECT 
    COUNT(DISTINCT CASE WHEN comp.nome = 'PercCPU' AND a.fkCaptura IS NOT NULL THEN a.idAlerta END) AS totalAlertasCPU,
    COUNT(DISTINCT CASE WHEN comp.nome = 'PercMEM' AND a.fkCaptura IS NOT NULL THEN a.idAlerta END) AS totalAlertasRAM
FROM captura c
LEFT JOIN alerta a ON c.idCaptura = a.fkCaptura
LEFT JOIN componente comp ON c.fkComponente = comp.idComponente
WHERE c.dataRegistro >= NOW() - INTERVAL 24 HOUR
  AND comp.nome IN ('PercCPU', 'PercMEM')
  AND a.fkCaptura IS NOT NULL;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);  
}

function obterTempAlertas() {
    console.log("ACESSEI A FUNÇÃO DE CAPTURA DE RAM");

    var instrucaoSql = `
    SELECT 
    CONCAT(ROUND((COUNT(DISTINCT CASE WHEN a.fkCaptura IS NOT NULL THEN c.idCaptura END) / (SELECT COUNT(*) FROM captura WHERE dataRegistro >= NOW() - INTERVAL 24 HOUR)) * 100, 1), '%') AS porcentagemAlertas,
    CONCAT(ROUND((COUNT(DISTINCT CASE WHEN a.fkCaptura IS NULL THEN c.idCaptura END) / (SELECT COUNT(*) FROM captura WHERE dataRegistro >= NOW() - INTERVAL 24 HOUR)) * 100, 1), '%') AS porcentagemSemAlertas
FROM captura c
LEFT JOIN alerta a ON c.idCaptura = a.fkCaptura
WHERE c.dataRegistro >= NOW() - INTERVAL 24 HOUR;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);  
}

function obterInfoAlertas() {
    console.log("ACESSEI A FUNÇÃO DE CAPTURA DE RAM");

    var instrucaoSql = `
    SELECT 
    a.dataAlerta,
    a.descricao AS descricaoAlerta,
    c.nome AS nomeComponente,
    d.nome AS nomeDispositivo
FROM alerta a
JOIN componente c ON a.fkComponente = c.idComponente
JOIN dispositivo d ON a.fkDispositivo = d.idDispositivo
WHERE a.dataAlerta >= NOW() - INTERVAL 24 HOUR
ORDER BY a.dataAlerta DESC
;

    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);  
}


module.exports = {
    obterPercentualCpu,
    obterPercentualRam,
    obterQtdAlertasRamCpu,
    obterTempAlertas,
    obterInfoAlertas
};

