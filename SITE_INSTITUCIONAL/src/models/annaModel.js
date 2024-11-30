var database = require("../database/config");

function obterDados(linha) {
    var instrucaoSql = `
         SELECT 
            d.idDispositivo AS idMaquina,
            d.nome AS nomeDispositivo,
            DATE_FORMAT(a.dataAlerta, '%d/%m') AS diaAlerta,
            COUNT(a.idAlerta) AS quantidadeAlertas
        FROM 
            alerta a
        JOIN 
            dispositivo d ON a.fkDispositivo = d.idDispositivo
        WHERE 
            d.fkLinha = ${linha}
            AND a.dataAlerta >= DATE_SUB(NOW(), INTERVAL 14 DAY)
        GROUP BY 
            d.idDispositivo, d.nome, a.dataAlerta
        ORDER BY 
            diaAlerta;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterDadosComponente(linha) {
    const instrucaoSql = `
          SELECT 
            d.idDispositivo AS idDispositivo,
            d.nome AS nomeDispositivo,
            c.nome AS nomeComponente,
            COUNT(a.idAlerta) AS quantidadeAlertas
        FROM 
            alerta a
        JOIN 
            dispositivo d ON a.fkDispositivo = d.idDispositivo
        JOIN 
            componente c ON a.fkComponente = c.idComponente
        WHERE 
            d.fkLinha = ${linha}
            AND a.dataAlerta >= DATE_SUB(NOW(), INTERVAL 14 DAY)
        GROUP BY 
            d.idDispositivo, c.idComponente
        ORDER BY 
            d.nome, c.nome;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    obterDados,
    obterDadosComponente
};