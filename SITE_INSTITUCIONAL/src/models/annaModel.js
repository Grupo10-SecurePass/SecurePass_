var database = require("../database/config");


function listarAlertas() {

    console.log("Executando a função listar() para exibir os alertas por servidores da linha\n");

    var instrucaoSql = `
   SELECT fklinha, fkdispositivo, COUNT(*) AS quantidade_alertas, CONCAT(DAY(dataAlerta), "/", MONTH(dataAlerta)) 
   AS dia FROM alerta where fklinha like 1 GROUP BY fklinha, fkdispositivo, dia ORDER BY dia;
;
`;

console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    
}

function alertasComponente() {

    console.log("Executando a função Al() para exibir os alertas por servidores da linha\n");

    var instrucaoSql = `
   SELECT fklinha, fkdispositivo, COUNT(*) AS quantidade_alertas, CONCAT(DAY(dataAlerta), "/", MONTH(dataAlerta)) 
   AS dia FROM alerta GROUP BY  fklinha, fkdispositivo, dia ORDER BY dia;
;
`;

    
}


function editar(idAlerta) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idAlerta);
    var instrucaoSql = `
        UPDATE alerta SET visualizacao = 1 WHERE idAlerta = ${idAlerta};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarAlertas,
    editar
}