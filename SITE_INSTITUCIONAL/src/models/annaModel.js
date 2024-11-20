var database = require("../database/config");

function obterDados(linha) {
    var instrucaoSql = `
      SELECT 
            d.idDispositivo AS idMaquina,
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
            d.idDispositivo, a.dataAlerta
        ORDER BY 
         diaAlerta;
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterDados
}