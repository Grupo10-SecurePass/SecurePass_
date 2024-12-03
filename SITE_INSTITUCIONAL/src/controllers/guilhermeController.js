var guilhermeModel = require("../models/guilhermeModel");
const fetch = require('node-fetch');
const { GoogleGenerativeAI } = require("@google/generative-ai");

function obterPercentualCpu(req, res) {
    console.log("ACESSEI A CONTROLLER DE CPU");
    var Linha = req.params.Linha;

    guilhermeModel.obterPercentualCpu(Linha).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados da CPU:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterPercentualRam(req, res) {
    console.log("ACESSEI A CONTROLLER DE RAM");
    var Linha = req.params.Linha;

    guilhermeModel.obterPercentualRam(Linha).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados da RAM:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterQtdAlertasRamCpu(req, res) {
    console.log("ACESSEI A CONTROLLER DE ALERTAS RAM E CPU");
    var Linha = req.params.Linha;

    guilhermeModel.obterQtdAlertasRamCpu(Linha).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados dos alertas da ram e da cpu:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterTempAlertas(req, res) {
    console.log("ACESSEI A CONTROLLER DE TEMPO ESTÁVEL E EM ALERTA");
    var Linha = req.params.Linha;

    guilhermeModel.obterTempAlertas(Linha).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados de estável e em alerta:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterInfoAlertas(req, res) {
    console.log("ACESSEI A CONTROLLER DE INFORMAÇÃO DOS ALERTAS");
    var Linha = req.params.Linha;

    guilhermeModel.obterInfoAlertas(Linha).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados de informações dos alertas", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function Bobia(req, res) {
    const pergunta = req.body.pergunta;

    gerarResposta(pergunta).then( resposta => {
        res.status(200).json({ resposta: resposta });
    }).catch( erro => {
        res.status(500).json({ status: "Erro", message: "Falha ao gerar resposta", erro: erro.message});
    });

    async function gerarResposta(mensagem) {

        let chaveGemini = null;

        try {
            const respostaBanco = await guilhermeModel.Bobia();
            chaveGemini = String(respostaBanco[0].codigo);
        } catch (error) {
            console.error("Erro ao obter chave gemini do banco de dados.");
        }

        if(chaveGemini) {
            console.log("Chave da API do Gemini Obtida com Sucesso...");
        }

        // instanciando a classe GoogleGenerativeAI
        const chatIA = new GoogleGenerativeAI(chaveGemini);
        // obtendo o modelo de IA
        const modeloIA = chatIA.getGenerativeModel({ model: "gemini-pro" });
    
        try {
            // gerando conteúdo com base na pergunta
            const resultado = await modeloIA.generateContent(`${mensagem}`);
            const resposta = await resultado.response.text();
            
            console.log('Requisição na API do Gemini feita, resposta: ', resposta);
    
            return resposta;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

module.exports = {
    obterPercentualCpu,
    obterPercentualRam,
    obterQtdAlertasRamCpu,
    obterTempAlertas,
    obterInfoAlertas,
    Bobia
};
