var database = require("../database/config");

function listar(fkLinha) {
    console.log("Executando a função listar() para exibir os gerentes\n");

    var instrucaoSql = `
        SELECT alerta.idAlerta, CONCAT('Máquina ', dispositivo.nome, ' apresentando alerta: ', alerta.descricao) as texto FROM alerta 
        JOIN dispositivo ON alerta.fkDispositivo = dispositivo.idDispositivo
        WHERE alerta.fkLinha = ${fkLinha} AND visualizacao = 0;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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
    listar,
    editar
}
