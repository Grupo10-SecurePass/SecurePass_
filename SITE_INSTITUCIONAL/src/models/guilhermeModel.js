var database = require("../database/config");

function obterPercentualCpu(Linha) {
    console.log("ACESSEI A FUNÇÃO DE CAPTURA DE CPU");

    var instrucaoSql = `
       SELECT 
            DATE_FORMAT(c.dataRegistro, '%H:%i:%s') AS horario, 
            c.registro AS percentualCpu
       FROM captura c
       INNER JOIN componente cm ON c.fkComponente = cm.idComponente
       WHERE cm.nome = 'PercCPU'
         AND c.dataRegistro >= NOW() - INTERVAL 24 HOUR
         AND c.fkLinha = ${Linha}
       ORDER BY c.dataRegistro DESC
       LIMIT 15;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function obterPercentualRam(Linha) {
    console.log("ACESSEI A FUNÇÃO DE CAPTURA DE RAM");

    var instrucaoSql = `
       SELECT 
            DATE_FORMAT(c.dataRegistro, '%H:%i:%s') AS horario, 
            c.registro AS percentualRam
       FROM captura c
       INNER JOIN componente cm ON c.fkComponente = cm.idComponente
       WHERE cm.nome = 'PercMEM'
         AND c.dataRegistro >= NOW() - INTERVAL 24 HOUR
         AND c.fkLinha = ${Linha}
       ORDER BY c.dataRegistro DESC
       LIMIT 15;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);  
}

function obterQtdAlertasRamCpu(Linha) {
    console.log("ACESSEI A FUNÇÃO DE CAPTURA DE RAM");

    var instrucaoSql = `
      SELECT 
       COUNT(DISTINCT CASE WHEN comp.nome = 'PercCPU' THEN a.idAlerta END) AS totalAlertasCPU,
       COUNT(DISTINCT CASE WHEN comp.nome = 'PercMEM' THEN a.idAlerta END) AS totalAlertasRAM
FROM alerta a
JOIN captura c ON a.fkCaptura = c.idCaptura
JOIN componente comp ON c.fkComponente = comp.idComponente
WHERE c.dataRegistro >= NOW() - INTERVAL 24 HOUR
  AND comp.nome IN ('PercCPU', 'PercMEM')
  AND c.fkLinha = ${Linha};

    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);  
}

function obterTempAlertas(Linha) {
    console.log("ACESSEI A FUNÇÃO DE CAPTURA DE RAM");

    var instrucaoSql = `
       SELECT 
    CONCAT(ROUND((
        COUNT(CASE 
            WHEN a.fkCaptura IS NOT NULL AND c.fkComponente IN (1, 2) THEN c.idCaptura 
            END) / 
        (SELECT COUNT(*) FROM captura 
         WHERE dataRegistro >= NOW() - INTERVAL 24 HOUR 
         AND fkLinha = ${Linha}
         AND fkComponente IN (1, 2)
        )
    ) * 100, 1), '%') AS porcentagemAlertas,
    
    CONCAT(ROUND((
        COUNT(CASE 
            WHEN a.fkCaptura IS NULL AND c.fkComponente IN (1, 2) THEN c.idCaptura 
            END) / 
        (SELECT COUNT(*) FROM captura 
         WHERE dataRegistro >= NOW() - INTERVAL 24 HOUR 
         AND fkLinha = ${Linha}
         AND fkComponente IN (1, 2)
        )
    ) * 100, 1), '%') AS porcentagemSemAlertas
FROM captura c
LEFT JOIN alerta a ON c.idCaptura = a.fkCaptura
WHERE c.dataRegistro >= NOW() - INTERVAL 24 HOUR
AND c.fkLinha = ${Linha}
AND c.fkComponente IN (1, 2);


    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);  
}

function obterInfoAlertas(Linha) {
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
JOIN captura cap ON a.fkCaptura = cap.idCaptura
WHERE a.dataAlerta >= NOW() - INTERVAL 24 HOUR
  AND cap.dataRegistro >= NOW() - INTERVAL 24 HOUR
  AND cap.fkLinha = ${Linha}
  AND c.nome IN ('PercCPU', 'PercMEM')
ORDER BY a.dataAlerta DESC;

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
