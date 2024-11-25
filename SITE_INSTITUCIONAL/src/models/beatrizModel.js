var database = require("../database/config");

function RAMbea(idDispositivo) {
    var instrucaoSql = `SELECT registro as valor FROM captura 
            WHERE fkDispositivo = ${idDispositivo} 
            AND fkComponente = 2 
            ORDER BY dataRegistro DESC
            LIMIT 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function CPUbea(idDispositivo) {
    var instrucaoSql = `SELECT registro as valor FROM captura 
            WHERE fkDispositivo = ${idDispositivo} 
            AND fkComponente = 1 
            ORDER BY dataRegistro DESC
            LIMIT 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function DISCObea(idDispositivo) {
    var instrucaoSql = `SELECT registro as valor FROM captura 
            WHERE fkDispositivo = ${idDispositivo} 
            AND fkComponente = 3 
            ORDER BY dataRegistro DESC
            LIMIT 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function TempoRespostaBea(idDispositivo) {
    var instrucaoSql = `SELECT registro as valor FROM captura 
            WHERE fkDispositivo = ${idDispositivo} 
            AND fkComponente = 8 
            ORDER BY dataRegistro DESC
            LIMIT 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    TempoRespostaBea,
    RAMbea,
    CPUbea,
    DISCObea
}
