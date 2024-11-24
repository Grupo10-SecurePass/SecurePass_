var database = require("../database/config");

function listar(fkNR, fkLinha) {
    console.log("Executando a função listar() para exibir os gerentes\n");

    var instrucaoSql = `
        SELECT 
            usuario.*, 
            cargo.nome AS cargo
        FROM usuario
        JOIN empresa ON usuario.fkNR = empresa.NR
        JOIN cargo ON usuario.fkCargo = cargo.idCargo
        WHERE cargo.nome = 'gerente' AND empresa.NR = '${fkNR}' AND usuario.fkLinha = '${fkLinha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function listarSuporte(Linha) {
    console.log("Executando a função listarSuporte() para exibir os técnicos de suporte\n");

    var instrucaoSql = `
    SELECT 
        usuario.idUsuario, 
        usuario.nome, 
        usuario.cpf, 
        usuario.email, 
        usuario.senha, 
        cargo.nome AS cargo, 
        usuario.status
    FROM usuario
    JOIN cargo ON usuario.fkCargo = cargo.idCargo
    WHERE usuario.fkLinha = ${Linha} AND cargo.nome = 'tecnico';
`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function listarMaquina(fkLinha) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `SELECT * FROM dispositivo 
    WHERE fkLinha = ${fkLinha} AND status = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarLinha() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `SELECT * FROM linha WHERE fkEmpresa IS NULL;`;
   
     
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarLinhaEmpresa(fkEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `SELECT * FROM linha WHERE fkEmpresa = ${fkEmpresa};`;
   
     
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisa(pesquisa, fkNR, fkLinha) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucaoSql = `SELECT usuario.*, cargo.nome AS cargo
    FROM usuario
    JOIN empresa ON usuario.fkNR = ${fkNR}
    JOIN cargo ON usuario.fkCargo = cargo.idCargo
    WHERE usuario.nome LIKE '%${pesquisa}%' AND usuario.fkLinha = '${fkLinha}' AND cargo.nome = 'gerente';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}
function pesquisaSuporte(pesquisa, fkLinha) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    // Consulta corrigida sem o JOIN na tabela empresa
    var instrucaoSql = `SELECT usuario.*, cargo.nome AS cargo
    FROM usuario
    JOIN cargo ON usuario.fkCargo = cargo.idCargo
    WHERE usuario.nome LIKE '%${pesquisa}%' AND usuario.fkLinha = '${fkLinha}' AND cargo.nome = 'técnico';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql); // Executa a consulta
}


function pesquisaMaquina(pesquisa, fkLinha) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucaoSql = `SELECT * FROM dispositivo 
    WHERE nome LIKE '%${pesquisa}%' AND fkLinha = '${fkLinha}'`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}
function pesquisaLinha(pesquisa, nrEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucaoSql = `SELECT * FROM linha 
    WHERE nome LIKE '%${pesquisa}%' AND fkEmpresa = '${nrEmpresa}'`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}
function dadosPerfil(idUsuario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucaoSql = `SELECT 
                            usuario.nome AS nome, 
                            usuario.senha AS senha, 
                            empresa.nome AS nomeEmpresa 
                        FROM 
                            usuario 
                        INNER JOIN 
                            empresa ON usuario.fkNR = empresa.NR 
                        WHERE 
                            usuario.idUsuario = '${idUsuario}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function pesquisarDescricao(texto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
    var instrucaoSql = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE a.descricao LIKE '${texto}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE u.id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function publicarFeedback(descricao, idUsuario, NR) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", descricao, idUsuario, NR);
    var instrucaoSql = `
        INSERT INTO feedback (descricao, fkUsuario, fkNR) VALUES ('${descricao}', '${idUsuario}', '${NR}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function listarFeedbacks(idUsuario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `SELECT * FROM feedback 
    WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function listarFeedbacksGeral() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `SELECT * FROM feedback;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function editar(novoDado, cpf) {
    console.log("ACESSEI A FUNÇÃO DE EDITAR USUÁRIO \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarUsuario(): ", novoDado, cpf);

    // Construção dinâmica da instrução SQL
    var camposParaAtualizar = [];
    
    // Verificar se os dados a serem atualizados existem no objeto novoDado
    if (novoDado.nome) camposParaAtualizar.push(`nome = '${novoDado.nome}'`);
    if (novoDado.email) camposParaAtualizar.push(`email = '${novoDado.email}'`);
    if (novoDado.senha) camposParaAtualizar.push(`senha = '${novoDado.senha}'`);
    if (novoDado.status) camposParaAtualizar.push(`status = ${novoDado.status}`);
    if (novoDado.fkCargo) camposParaAtualizar.push(`fkCargo = ${novoDado.fkCargo}`);
    if (novoDado.fkLinha) camposParaAtualizar.push(`fkLinha = ${novoDado.fkLinha}`);
    if (novoDado.fkNR) camposParaAtualizar.push(`fkNR = ${novoDado.fkNR}`);

    // Se não houver dados para atualizar, retornar um erro
    if (camposParaAtualizar.length === 0) {
        console.log("Nenhum dado foi fornecido para atualização.");
        return Promise.reject("Nenhum dado para atualizar.");
    }

    // Construção da query
    var instrucaoSql = `
        UPDATE usuario 
        SET ${camposParaAtualizar.join(", ")}
        WHERE cpf = '${cpf}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    // Executando a instrução no banco
    return database.executar(instrucaoSql);
}



function deletarSuporte(cpf) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", cpf);
    
    var instrucaoSql = `
    UPDATE usuario 
    SET fkResponsavel = NULL 
    WHERE fkResponsavel = (
        SELECT idUsuario FROM usuario WHERE CPF = '${cpf}'
    );
    DELETE FROM usuario WHERE CPF = '${cpf}';
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(cpf) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", cpf);
    
    var instrucaoSql = `
    UPDATE usuario 
    SET fkResponsavel = NULL 
    WHERE fkResponsavel = (
        SELECT idUsuario FROM usuario WHERE CPF = '${cpf}'
    );
    DELETE FROM usuario WHERE CPF = '${cpf}';
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function associarLinha(idLinha, nrEmpresa) {
    console.log("Associando a linha com a empresa...");

    const instrucaoSql = `
        UPDATE linha
        SET fkEmpresa = '${nrEmpresa}'
        WHERE idLinha = '${idLinha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function desassociarLinha(idLinha) {
    console.log("Desassociando a linha com a empresa...");

    const instrucaoSql = `
        UPDATE linha
        SET fkEmpresa = NULL
        WHERE idLinha = '${idLinha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function deletarFeedbacks(idFeedback) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `DELETE FROM feedback 
    WHERE idFeedback = ${idFeedback};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicarFeedback,
    listarFeedbacks,
    listarFeedbacksGeral,
    editar,
    deletar,
    pesquisa,
    listarSuporte,
    pesquisaSuporte,
    deletarSuporte,
    listarMaquina,
    pesquisaMaquina,
    listarLinhaEmpresa,
    listarLinha,
    associarLinha,
    desassociarLinha,
    pesquisaLinha,
    dadosPerfil,
    deletarFeedbacks
}
