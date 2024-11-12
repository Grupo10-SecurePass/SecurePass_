var database = require("../database/config");

function cadastrar(idDispositivo, fkLinha, limitePercCPU, 
  limitePercMEM,
  limitePercDISCO,
  limiteRedeEnviada,
  limiteRedeRecebida,
  limiteFreqCPU,
  limitePerdaPacote,
  limiteTempoResposta) {
  
  var inserirPercCPU = `INSERT INTO limite (valor, tipo, fkComponente, fkLinha, fkDispositivo) VALUES (${limitePercCPU}, 'acima', 1, ${fkLinha}, ${idDispositivo})`;

  return database.executar(inserirPercCPU)
  
  .then(result => {
    console.log("PercCPU inserida, próximo...", result)
    var inserirPercMEM = `INSERT INTO limite (valor, tipo, fkComponente, fkLinha, fkDispositivo) VALUES (${limitePercMEM}, 'acima', 2, ${fkLinha}, ${idDispositivo})`

    return database.executar(inserirPercMEM)
  })

  .then(result => {
    console.log("PercMEM inserida, próximo...", result)
    var inserirPercDISCO = `INSERT INTO limite (valor, tipo, fkComponente, fkLinha, fkDispositivo) VALUES (${limitePercDISCO}, 'acima', 3, ${fkLinha}, ${idDispositivo})`

    return database.executar(inserirPercDISCO)
  })

  
  .then(result => {
    console.log("PercDISCO inserida, próximo...", result)
    var inserirRedeRecebida = `INSERT INTO limite (valor, tipo, fkComponente, fkLinha, fkDispositivo) VALUES (${limiteRedeRecebida}, 'abaixo', 4, ${fkLinha}, ${idDispositivo})`
    
    return database.executar(inserirRedeRecebida)
  })
  
  .then(result => {
    console.log("RedeRecebida inserida, próximo...", result)
    var inserirRedeEnviada = `INSERT INTO limite (valor, tipo, fkComponente, fkLinha, fkDispositivo) VALUES (${limiteRedeEnviada}, 'abaixo', 5, ${fkLinha}, ${idDispositivo})`

    return database.executar(inserirRedeEnviada)
  })

  .then(result => {
    console.log("RedeEnviada inserida, próximo...", result)
    var inserirFreqCPU = `INSERT INTO limite (valor, tipo, fkComponente, fkLinha, fkDispositivo) VALUES (${limiteFreqCPU}, 'abaixo', 6, ${fkLinha}, ${idDispositivo})`

    return database.executar(inserirFreqCPU)
  })

  .then(result => {
    console.log("FreqCPU inserida, próximo...", result)
    var inserirPerdaPacote = `INSERT INTO limite (valor, tipo, fkComponente, fkLinha, fkDispositivo) VALUES (${limitePerdaPacote}, 'acima', 7, ${fkLinha}, ${idDispositivo})`

    return database.executar(inserirPerdaPacote)
  })

  .then(result => {
    console.log("PerdaPacote inserida, próximo...", result)
    var inserirTempoResposta = `INSERT INTO limite (valor, tipo, fkComponente, fkLinha, fkDispositivo) VALUES (${limiteTempoResposta}, 'acima', 8, ${fkLinha}, ${idDispositivo})`

    return database.executar(inserirTempoResposta)
  })

}

function atualizar(idDispositivo, limitePercCPU, 
  limitePercMEM,
  limitePercDISCO,
  limiteRedeEnviada,
  limiteRedeRecebida,
  limiteFreqCPU,
  limitePerdaPacote,
  limiteTempoResposta) {
  
    const queries = [
      `UPDATE limite SET valor = ${limitePercCPU} WHERE fkDispositivo = ${idDispositivo} AND fkComponente = 1`,
      `UPDATE limite SET valor = ${limitePercMEM} WHERE fkDispositivo = ${idDispositivo} AND fkComponente = 2`,
      `UPDATE limite SET valor = ${limitePercDISCO} WHERE fkDispositivo = ${idDispositivo} AND fkComponente = 3`,
      `UPDATE limite SET valor = ${limiteRedeEnviada} WHERE fkDispositivo = ${idDispositivo} AND fkComponente = 4`,
      `UPDATE limite SET valor = ${limiteRedeRecebida} WHERE fkDispositivo = ${idDispositivo} AND fkComponente = 5`,
      `UPDATE limite SET valor = ${limiteFreqCPU} WHERE fkDispositivo = ${idDispositivo} AND fkComponente = 6`,
      `UPDATE limite SET valor = ${limitePerdaPacote} WHERE fkDispositivo = ${idDispositivo} AND fkComponente = 7`,
      `UPDATE limite SET valor = ${limiteTempoResposta} WHERE fkDispositivo = ${idDispositivo} AND fkComponente = 8`
    ];
  
    return Promise.all(queries.map(query => database.executar(query)))
      .then(results => {
        console.log("Todas as atualizações foram concluídas com sucesso:", results);
      })
      .catch(error => {
        console.error("Erro ao atualizar os limites:", error);
      });
  
}

module.exports = {
  cadastrar,
  atualizar
}
