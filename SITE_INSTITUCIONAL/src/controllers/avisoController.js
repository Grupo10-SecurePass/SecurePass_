var avisoModel = require("../models/avisoModel");

function listar(req, res) {
    var fkResponsavel = req.body.fkResponsavelServer;
    avisoModel.listar(fkResponsavel).then(function (resultado) {
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
function listarSuporte(req, res) {
    var fkResponsavel = req.body.fkResponsavelServer;
    avisoModel.listarSuporte(fkResponsavel).then(function (resultado) {
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
function listarMaquina(req, res) {
    var nrEmpresa = req.body.nrEmpresaSever;
    avisoModel.listarMaquina(nrEmpresa).then(function (resultado) {
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
function pesquisa(req, res) {
    var pesquisa = req.body.pesquisaServer;

    avisoModel.pesquisa(pesquisa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log("Houve um erro ao buscar os gerentes: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function pesquisaSuporte(req, res) {
    var pesquisa = req.body.pesquisaServer;

    avisoModel.pesquisaSuporte(pesquisa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log("Houve um erro ao buscar os gerentes: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function pesquisaMaquina(req, res) {
    var pesquisa = req.body.pesquisaServer;
    var nrEmpresa = req.body.nrEmpresaServer;

    avisoModel.pesquisaMaquina(pesquisa, nrEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log("Houve um erro ao buscar os gerentes: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function dadosPerfil(req, res) {
    var idUsuario = req.body.idUsuarioServer;

    avisoModel.dadosPerfil(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log("Houve um erro ao buscar os gerentes: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    avisoModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pesquisarDescricao(req, res) {
    var descricao = req.params.descricao;

    avisoModel.pesquisarDescricao(descricao)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function publicar(req, res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var idUsuario = req.params.idUsuario;

    if (titulo == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (descricao == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        avisoModel.publicar(titulo, descricao, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editar(req, res) {
    var novaDescricao = req.body.descricao;
    var idAviso = req.params.idAviso;

    avisoModel.editar(novaDescricao, idAviso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function deletar(req, res) {
    var cpf = req.params.cpf;
    console.log("CPF recebido na rota:", cpf);

    avisoModel.deletar(cpf)
        .then(function (resultado) {
            console.log("Resultado da exclusão:", resultado);
            res.json(resultado);
        })
        .catch(function (erro) {
            console.error("Erro ao deletar:", erro);
            res.status(500).json({ mensagem: "Erro ao deletar gerente", erro: erro.sqlMessage });
        });
}
function deletarSuporte(req, res) {
    var cpf = req.params.cpf;
    console.log("CPF recebido na rota:", cpf);

    avisoModel.deletarSuporte(cpf)
        .then(function (resultado) {
            console.log("Resultado da exclusão:", resultado);
            res.json(resultado);
        })
        .catch(function (erro) {
            console.error("Erro ao deletar:", erro);
            res.status(500).json({ mensagem: "Erro ao deletar gerente", erro: erro.sqlMessage });
        });
}

module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar,
    pesquisa,
    listarSuporte,
    pesquisaSuporte,
    deletarSuporte,
    listarMaquina,
    pesquisaMaquina,
    dadosPerfil
}