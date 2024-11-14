var database = require("../database/config")

function autenticar(email, senha, fkCargo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha, fkCargo)
    var instrucaoSql = `
        SELECT idUsuario, fkCargo, fkLinha, fkNR, nome, CPF, email, senha, status FROM usuario WHERE email = '${email}' AND senha = '${senha}' AND fkCargo = ${fkCargo};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(fkNR, nome, cpf, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkNR, nome, cpf, email, senha);

    var instrucaoSql = `
        INSERT INTO usuario (fkNR, nome, cpf, email, senha, status, fkCargo, fkLinha) 
        VALUES ('${fkNR}', '${nome}', '${cpf}', '${email}', '${senha}', '1', 1, NULL);
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrarGerente(fkNRGerente, nomeGerente, cpfGerente, emailGerente, senhaGerente) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkNRGerente, nomeGerente, cpfGerente, emailGerente, senhaGerente);
    
    var instrucaoSql = `
        INSERT INTO usuario 
        (fkNR, nome, cpf, email, senha, status, fkCargo, fkLinha) 
        VALUES ('${fkNRGerente}', '${nomeGerente}', '${cpfGerente}', '${emailGerente}', '${senhaGerente}', '1', '2', NULL);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarSuporte(fkNRSuporte, nomeTecnico, cpfTecnico, emailTecnico, senhaTecnico, fkLinha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkNRSuporte, nomeTecnico, cpfTecnico, emailTecnico, senhaTecnico);
    
    var instrucaoSql = `
        INSERT INTO usuario 
        (fkNR, nome, cpf, email, senha, status, fkCargo, fkLinha) 
        VALUES ('${fkNRSuporte}', '${nomeTecnico}', '${cpfTecnico}', '${emailTecnico}', '${senhaTecnico}', 1, 3, '${fkLinha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarCargo() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `SELECT * FROM cargo;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarGerente,
    cadastrarSuporte,
    listarCargo
};