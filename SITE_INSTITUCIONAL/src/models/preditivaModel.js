var database = require("../database/config");

function obterMediaDiaria(linha) {
    const instrucaoSql = `
        SELECT 
            DATE(cp.dataRegistro) AS dia,
            ROUND(AVG(CASE WHEN c.nome = 'PercCPU' THEN cp.registro END), 2) AS media_cpu,
            ROUND(AVG(CASE WHEN c.nome = 'PercMEM' THEN cp.registro END), 2) AS media_ram
        FROM 
            captura cp
        JOIN 
            componente c ON cp.fkComponente = c.idComponente
        WHERE 
            cp.dataRegistro >= DATE_SUB((SELECT MAX(dataRegistro) FROM captura), INTERVAL 14 DAY) AND
            c.nome IN ('PercCPU', 'PercMEM') AND
            cp.fkLinha = ${linha}
        GROUP BY 
            DATE(cp.dataRegistro)
        ORDER BY 
            dia;
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterDados(linha) {
    var instrucaoSql = `SELECT 
            sub.semana,
            ROUND(AVG(sub.registro), 2) AS media_geral
        FROM (
            SELECT 
                cp.registro,
                CASE
                    WHEN DATEDIFF(MAX(cp.dataRegistro) OVER (), cp.dataRegistro) BETWEEN 7 AND 13 THEN 'Semana 1'
                    WHEN DATEDIFF(MAX(cp.dataRegistro) OVER (), cp.dataRegistro) BETWEEN 0 AND 6 THEN 'Semana 2'
                END AS semana
            FROM 
                captura cp
            JOIN 
                componente c ON cp.fkComponente = c.idComponente
            WHERE 
                cp.fkLinha = ${linha} AND
                cp.dataRegistro >= DATE_SUB((SELECT MAX(dataRegistro) FROM captura), INTERVAL 14 DAY) AND
                c.nome IN ('PercCPU', 'PercMEM')
        ) AS sub
        GROUP BY 
            sub.semana
        ORDER BY 
            sub.semana;
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterMediaDiaria,
    obterDados
}