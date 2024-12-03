var database = require("../database/config");

function obterMediaDiaria(linha, idDispositivo, componente) {
    const instrucaoSql = `
        SELECT
            DATE(cp.dataRegistro) AS dia,
            MAX(dis.idDispositivo) AS idDispositivo,
            ROUND(AVG(CASE WHEN c.nome = '${componente}' THEN cp.registro END), 2) AS media
        FROM
            captura cp
        JOIN
            componente c ON cp.fkComponente = c.idComponente
        JOIN
            dispositivo dis ON cp.fkDispositivo = ${idDispositivo}
        WHERE
            cp.dataRegistro >= DATE_SUB((SELECT MAX(dataRegistro) FROM captura), INTERVAL 14 DAY)
            AND c.nome LIKE '${componente}'
            AND cp.fkLinha = ${linha}
        GROUP BY
            DATE(cp.dataRegistro)
        ORDER BY
            dia;
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterDados(linha, idDispositivo, componente) {
    var instrucaoSql = `SELECT 
            sub.semana,
            ROUND(AVG(sub.registro), 2) AS media_geral
        FROM (
            SELECT 
                cp.registro, 
                dis.idDispositivo,
                CASE
                    WHEN DATEDIFF(MAX(cp.dataRegistro) OVER (), cp.dataRegistro) BETWEEN 7 AND 13 THEN 'Semana 1'
                    WHEN DATEDIFF(MAX(cp.dataRegistro) OVER (), cp.dataRegistro) BETWEEN 0 AND 6 THEN 'Semana 2'
                END AS semana
            FROM 
                captura cp
            JOIN 
                componente c ON cp.fkComponente = c.idComponente 
            JOIN 
                dispositivo dis ON cp.fkDispositivo = ${idDispositivo}
            WHERE 
                cp.fkLinha = ${linha} AND
                cp.dataRegistro >= DATE_SUB((SELECT MAX(dataRegistro) FROM captura), INTERVAL 14 DAY) AND
                c.nome LIKE '${componente}'
        ) AS sub
        GROUP BY 
            sub.semana
        ORDER BY 
            sub.semana;
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarMaquinaPreditiva(fkLinha) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucaoSql = `SELECT * FROM dispositivo WHERE fkLinha = ${fkLinha} AND status = 1;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function obterAlertas(linha, idDispositivo) {
    const instrucaoSql = `
        SELECT
            DATE(cp.dataRegistro) AS dia,
            MAX(dis.idDispositivo) AS idDispositivo,
            ROUND(AVG(CASE WHEN c.nome = 'PercCPU' THEN cp.registro END), 2) AS media_cpu,
            ROUND(AVG(CASE WHEN c.nome = 'PercMEM' THEN cp.registro END), 2) AS media_ram
        FROM
            captura cp
        JOIN
            componente c ON cp.fkComponente = c.idComponente
        JOIN
            dispositivo dis ON cp.fkDispositivo = ${idDispositivo}
        WHERE
            cp.dataRegistro >= DATE_SUB((SELECT MAX(dataRegistro) FROM captura), INTERVAL 14 DAY)
            AND c.nome IN ('PercCPU', 'PercMEM')
            AND cp.fkLinha = ${linha}
        GROUP BY
            DATE(cp.dataRegistro)
        ORDER BY
            dia;
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterMediaDiaria,
    obterDados,
    listarMaquinaPreditiva,
    obterAlertas
}