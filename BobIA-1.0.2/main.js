// Importando as bibliotecas necessárias
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const path = require("path");

// Carregando as variáveis de ambiente do projeto do arquivo .env
require("dotenv").config();

// Configurando o servidor express
const app = express();
const PORTA_SERVIDOR = process.env.PORTA;

// Configurando o gemini (IA)
const chatIA = new GoogleGenerativeAI(process.env.MINHA_CHAVE);

// Configurando o servidor para receber requisições JSON
app.use(express.json());

// Configurando o servidor para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Configurando CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

// Rota principal para carregar a página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashGuilherme.html"));
});

// Inicializando o servidor
app.listen(PORTA_SERVIDOR, () => {
    console.info(
        `
        ######                ###    #    
        #     #  ####  #####   #    # #   
        #     # #    # #    #  #   #   #  
        ######  #    # #####   #  #     # 
        #     # #    # #    #  #  ####### 
        #     # #    # #    #  #  #     # 
        ######   ####  #####  ### #     # 
        `
    );
    console.info(`A API BobIA iniciada, acesse http://localhost:${PORTA_SERVIDOR}`);
});

// Rota para receber perguntas e gerar respostas
app.post("/perguntar", async (req, res) => {
    const pergunta = req.body.pergunta;

    try {
        const resultado = await gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Função para gerar respostas usando o gemini
async function gerarResposta(mensagem) {
    // Obtendo o modelo de IA
    const modeloIA = chatIA.getGenerativeModel({ model: "gemini-pro" });

    try {
        // Gerando conteúdo com base na pergunta
        const resultado = await modeloIA.generateContent(`Responda: ${mensagem}`);
        const resposta = await resultado.response.text();

        console.log(resposta);

        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
