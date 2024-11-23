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
    AND dataRegistro >= DATE_SUB(CURDATE(), INTERVAL 5 DAY)
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

function UploadGerente(idDispositivo) {

    var instrucaoSql = ` SELECT 
            DATE_FORMAT(dataRegistro, '%d-%m') AS data,
            AVG(registro) AS media_diaria
            FROM captura
            WHERE fkDispositivo = ${idDispositivo}
            AND fkComponente = 5
            GROUP BY DATE_FORMAT(dataRegistro, '%d-%m')
            ORDER BY data
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

function DownloadGerente(idDispositivo) {

    var instrucaoSql = `SELECT 
            DATE_FORMAT(dataRegistro, '%d-%m') AS data,
            AVG(registro) AS media_diaria
            FROM captura
            WHERE fkDispositivo = ${idDispositivo}
            AND fkComponente = 4
            GROUP BY DATE_FORMAT(dataRegistro, '%d-%m')
            ORDER BY data
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

function CPUGerente(idDispositivo) {

    var instrucaoSql = `SELECT 
            DATE_FORMAT(dataRegistro, '%d-%m') AS data,
            AVG(registro) AS media_diaria
            FROM captura
            WHERE fkDispositivo = ${idDispositivo}
            AND fkComponente = 1
            GROUP BY DATE_FORMAT(dataRegistro, '%d-%m')
            ORDER BY data
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

function MaquinasRisco() {

    var instrucaoSql = `
            SELECT 
            DATE_FORMAT(a.dataAlerta, '%d-%m') AS data, 
            COUNT(DISTINCT d.idDispositivo) AS quantidadeDispositivosEmAlerta
            FROM 
            alerta a
            JOIN 
            dispositivo d ON a.fkDispositivo = d.idDispositivo
            WHERE 
            a.dataAlerta >= NOW() - INTERVAL 5 DAY
            GROUP BY 
            DATE_FORMAT(a.dataAlerta, '%d-%m')
            ORDER BY 
            data ASC;
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function LinhaProblemas() {

    var instrucaoSql = `
        SELECT 
        l.nome AS linha, 
        COUNT(a.idAlerta) AS totalProblemas
        FROM 
        alerta a
        JOIN 
        dispositivo d ON a.fkDispositivo = d.idDispositivo
        JOIN 
        linha l ON d.fkLinha = l.idLinha
        GROUP BY 
        l.nome
        ORDER BY 
        totalProblemas DESC
        LIMIT 1;
`;

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
    DISCO,
    UploadGerente,
    DownloadGerente,
    CPUGerente,
    MaquinasRisco,
    LinhaProblemas
}
