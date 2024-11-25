var avisoModel = require("../models/avisoModel");

function listar(req, res) {
    var fkNR = req.body.fkNRServer;
    var fkLinha = req.body.fkLinhaServer;

    avisoModel.listar(fkNR, fkLinha).then(function (resultado) {
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
    var Linha = req.body.linhaServer;
    avisoModel.listarSuporte(Linha).then(function (resultado) {
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
    var fkLinha = req.body.linhaSever;
    avisoModel.listarMaquina(fkLinha).then(function (resultado) {
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



function listarLinha(req,res) {
    avisoModel.listarLinha().then(function (resultado) {
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

function listarLinhaEmpresa(req,res) {
    var fkEmpresa = req.body.nrEmpresaServer;

    avisoModel.listarLinhaEmpresa(fkEmpresa).then(function (resultado) {
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

function associarLinha(req, res) {
    var idLinha = req.body.linhaServer;
    var nrEmpresa = req.body.fkNRServer;

    avisoModel.associarLinha(idLinha, nrEmpresa)
        .then(function (resultado) {
            if (resultado.affectedRows > 0) {
                res.status(200).send("Linha associada com sucesso à empresa!");
            } else {
                res.status(204).send("Nenhuma linha foi associada.");
            }
        })
        .catch(function (erro) {
            console.log("Erro ao associar linha com a empresa: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function desassociarLinha(req, res) {
    var idLinha = req.params.idLinha;

    avisoModel.desassociarLinha(idLinha)
        .then(function (resultado) {
            if (resultado.affectedRows > 0) {
                res.status(200).send("Linha desassociada com sucesso à empresa!");
            } else {
                res.status(204).send("Nenhuma linha foi desassociada.");
            }
        })
        .catch(function (erro) {
            console.log("Erro ao associar linha com a empresa: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function pesquisa(req, res) {
    var pesquisa = req.body.pesquisaServer;
    var fkNR = req.body.fkNRServer;
    var fkLinha = req.body.fkLinhaServer;

    avisoModel.pesquisa(pesquisa, fkNR, fkLinha).then(function (resultado) {
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
    var fkLinha = req.body.fkLinhaServer;

    avisoModel.pesquisaSuporte(pesquisa, fkLinha).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado); // Retorna os dados encontrados
        } else {
            res.status(204).send("Nenhum resultado encontrado!"); // Caso não encontre nada
        }
    }).catch(function (erro) {
        console.log("Houve um erro ao buscar os suportes: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage); // Retorna erro em caso de falha
    });
}

function pesquisaMaquina(req, res) {
    var pesquisa = req.body.pesquisaServer;
    var fkLinha = req.body.linhaServer;

    avisoModel.pesquisaMaquina(pesquisa, fkLinha).then(function (resultado) {
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
function pesquisaLinha(req, res) {
    var pesquisa = req.body.pesquisaServer;
    var nrEmpresa = req.body.nrEmpresaServer;

    avisoModel.pesquisaLinha(pesquisa, nrEmpresa).then(function (resultado) {
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

function publicarFeedback(req, res) {
    var descricao = req.body.descricao;
    var idUsuario = req.params.idUsuario;
    var NR = req.params.NR;

    console.log(`No controller o idUsuario é ${idUsuario}`)

    if (descricao == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else if (NR == undefined) {
        res.status(403).send("O NR do usuário está indefinido!");
    } else {
        avisoModel.publicarFeedback(descricao, idUsuario, NR)
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
function listarFeedbacks(req, res) {
    var idUsuario = req.params.idUsuario;

    avisoModel.listarFeedbacks(idUsuario).then(function (resultado) {
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
function alterar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    console.log(req.body);

    avisoModel.alterar(idUsuario, nome, cpf, email, senha).then(function (resultado) {
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
function alterarDadosGerente(req, res) {
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    console.log(req.body);

    avisoModel.alterarDadosGerente(nome, cpf, email, senha).then(function (resultado) {
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
function alterarDadosTecnico(req, res) {
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    console.log(req.body);

    avisoModel.alterarDadosTecnico(nome, cpf, email, senha).then(function (resultado) {
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

function listarFeedbacksGeral(req, res) {
    avisoModel.listarFeedbacksGeral().then(function (resultado) {
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

function editar(req, res) {
    var novoDado = req.body;  // Recebe todos os dados a serem atualizados
    var cpfUsuario = req.params.cpf;  // Recebe o CPF do usuário a ser atualizado da URL

    usuarioModel.editar(novoDado, cpfUsuario)
        .then(function(resultado) {
            res.json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function deletar(req, res) {
    var cpf = req.body.cpfServer;

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
    var cpf = req.body.cpf;

    usuarioModel.deletarSuporte(cpf)
        .then(function (resultado) {
            console.log("Resultado da exclusão:", resultado);
            res.json(resultado);
        })
        .catch(function (erro) {
            console.error("Erro ao deletar:", erro);
            res.status(500).json({ mensagem: "Erro ao deletar suporte", erro: erro.sqlMessage });
        });
}

function deletarFeedbacks(req, res) {
    var idFeedback = req.params.idFeedback;

    avisoModel.deletarFeedbacks(idFeedback).then(function (resultado) {
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
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicarFeedback,
    listarFeedbacks,
    alterar,
    alterarDadosGerente,
    alterarDadosTecnico,
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