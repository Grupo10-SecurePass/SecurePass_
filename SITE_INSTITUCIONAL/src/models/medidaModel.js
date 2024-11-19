var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    var instrucaoSql = `SELECT 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    FROM medida
                    WHERE fk_aquario = ${idAquario}
                    ORDER BY id DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    var instrucaoSql = `SELECT 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        FROM medida WHERE fk_aquario = ${idAquario} 
                    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alertaVEL(idDispositivo) {

    var instrucaoSql = `SELECT COUNT(idAlerta) as quantidade, CONCAT(DAY(MIN(dataAlerta)), "/", MONTH(MIN(dataAlerta))) as data FROM alerta 
    WHERE fkComponente = 6 OR fkComponente = 8 
    AND fkDispositivo = ${idDispositivo} 
    GROUP BY DAY(dataAlerta), MONTH(dataAlerta) 
    ORDER BY DAY(dataAlerta), MONTH(dataAlerta);`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function TempoResposta(idDispositivo) {

    var instrucaoSql = `SELECT registro as valor FROM captura 
            WHERE fkDispositivo = ${idDispositivo} 
            AND fkComponente = 8 
            ORDER BY dataRegistro
            LIMIT 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function TempoRespostaCalor(idDispositivo) {

    var instrucaoSql = `SELECT AVG(registro) as valor, 
    CONCAT(DAY(dataRegistro), "/", MONTH(dataRegistro)) as dia, 
    HOUR(dataRegistro) as hora 
    FROM captura 
    WHERE fkComponente = 8 AND fkDispositivo = ${idDispositivo} 
    AND dataRegistro >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    AND dataRegistro < CURDATE()
    GROUP BY hora, dia 
    ORDER BY dia, hora 
    LIMIT 120;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function Freq(idDispositivo) {

    var instrucaoSql = `SELECT registro as valor FROM captura 
            WHERE fkDispositivo = ${idDispositivo} 
            AND fkComponente = 6 
            ORDER BY dataRegistro
            LIMIT 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function Upload(idDispositivo) {

    var instrucaoSql = `SELECT registro as valor FROM captura 
            WHERE fkDispositivo = ${idDispositivo} 
            AND fkComponente = 5 
            ORDER BY dataRegistro
            LIMIT 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function Download(idDispositivo) {

    var instrucaoSql = `SELECT registro as valor FROM captura 
            WHERE fkDispositivo = ${idDispositivo} 
            AND fkComponente = 4 
            ORDER BY dataRegistro
            LIMIT 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function RAM(idDispositivo) {

    var instrucaoSql = `SELECT registro as valor FROM captura 
            WHERE fkDispositivo = ${idDispositivo} 
            AND fkComponente = 2 
            ORDER BY dataRegistro
            LIMIT 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function CPU(idDispositivo) {

    var instrucaoSql = `SELECT registro as valor FROM captura 
            WHERE fkDispositivo = ${idDispositivo} 
            AND fkComponente = 1 
            ORDER BY dataRegistro
            LIMIT 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function DISCO(idDispositivo) {

    var instrucaoSql = `SELECT registro as valor FROM captura 
            WHERE fkDispositivo = ${idDispositivo} 
            AND fkComponente = 3 
            ORDER BY dataRegistro
            LIMIT 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    alertaVEL,
    TempoResposta,
    TempoRespostaCalor,
    Freq,
    Upload,
    Download,
    RAM,
    CPU,
    DISCO
}
