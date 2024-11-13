var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkCargo = req.body.fkCargoServer

    if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (fkCargo == undefined) {
        res.status(400).send("Seu cargo está indefinido!");
    }
    else {

        usuarioModel.autenticar(email, senha, fkCargo)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            idUsuario: resultadoAutenticar[0].idUsuario,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            cargo: resultadoAutenticar[0].fkCargo,
                            cpf: resultadoAutenticar[0].CPF,
                            status: resultadoAutenticar[0].status,
                            fkNR: resultadoAutenticar[0].fkNR,
                            fkLinha: resultadoAutenticar[0].fkLinha
                        })

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha e/ou cargo inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkNR = req.body.idEmpresaVincularServer;

    if (!nome) {
        res.status(400).send("Seu nome está undefined!");
    } else if (!cpf) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (!email) {
        res.status(400).send("Seu email está undefined!");
    } else if (!senha) {
        res.status(400).send("Sua senha está undefined!");
    } else if (!fkNR) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {
        usuarioModel.cadastrar(fkNR, nome, cpf, email, senha)
            .then((resultado) => {
                res.json(resultado);
            })
            .catch((erro) => {
                console.error("Erro ao cadastrar usuário:", erro);
                res.status(500).json({ error: erro.sqlMessage });
            });
    }
}

function cadastrarGerente(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeGerente = req.body.nomeGerenteServer;
    var cpfGerente = req.body.cpfGerenteServer;
    var emailGerente = req.body.emailGerenteServer; // Corrigido
    var senhaGerente = req.body.senhaGerenteServer; // Corrigido
    var representanteGerente = req.body.representanteServer; // Corrigido para 'Server'
    var fkNRGerente = req.body.fkNRServer;


    // Faça as validações dos valores
    if (fkNRGerente == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else if (nomeGerente == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cpfGerente == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (emailGerente == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senhaGerente == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (representanteGerente == undefined) {
        res.status(400).send("Seu representante a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarGerente(fkNRGerente, nomeGerente, cpfGerente, emailGerente, senhaGerente, representanteGerente)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarSuporte(req, res) {
    // Recupere os valores do front-end (por exemplo, do arquivo cadastro.html)
    var nomeTecnico = req.body.nomeTecnicoServer;
    var cpfTecnico = req.body.cpfTecnicoServer;
    var emailTecnico = req.body.emailTecnicoServer;
    var senhaTecnico = req.body.senhaTecnicoServer;
    var fkNRSuporte = req.body.fkNRServer;
    var fkLinha = req.body.fkLinhaServer

    // Validações dos valores
    if (fkNRSuporte == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else if (nomeTecnico == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cpfTecnico == undefined) {
        res.status(400).send("Seu CPF está undefined!");
    } else if (emailTecnico == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senhaTecnico == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarSuporte(fkNRSuporte, nomeTecnico, cpfTecnico, emailTecnico, senhaTecnico, fkLinha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarCargo(req,res) {
    
    usuarioModel.listarCargo().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarGerente,
    cadastrarSuporte,
    listarCargo
}