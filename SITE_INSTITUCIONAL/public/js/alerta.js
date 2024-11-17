function exibirAlerta() {
    var fkLinha = sessionStorage.getItem("LINHA");

    fetch("/alertas/listar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            linhaServer: fkLinha
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    return [];
                }
                return resposta.json();
            } else {
                throw "Houve um erro na API!";
            }
        })
        .then(function (dados) {
            console.log("Dados recebidos: ", JSON.stringify(dados));
            var alertas = document.getElementById("div_alertas");
            alertas.innerHTML = "";

            if (dados.length == 0) {
                lista.innerHTML = "<p>Ainda não há nenhuma máquina cadastrada.</p>";
                return;
            }

            var contadorMargin = 0;
            var contadorZindex = 0;

            for (let i = 0; i < dados.length; i++) {
                var alerta = dados[i];

                if (i == 0) {
                    contadorMargin = 0;
                    contadorZindex = 0
                } else {
                    contadorMargin += 5;
                    contadorZindex += 1;
                }

                var divCard = document.createElement("div");
                divCard.className = "alerta";
                divCard.style.marginTop = `${contadorMargin}px`;
                divCard.style.zIndex += `${contadorZindex}`;
                divCard.id = `alerta-${alerta.idAlerta}`;

                var divCardAlerta = document.createElement("div");
                divCardAlerta.className = "conteudoAlerta";

                var texto = document.createElement("p");
                texto.id = "texto_alerta"
                texto.innerHTML = alerta.texto;

                var botao = document.createElement("button");
                botao.className = "botaoAlerta"
                botao.setAttribute("onclick", `fechar(${alerta.idAlerta})`)

                var img = document.createElement("i");
                img.className = "fa-solid fa-xmark"

                botao.appendChild(img);
                divCardAlerta.appendChild(texto)
                divCardAlerta.appendChild(botao);
                divCard.appendChild(divCardAlerta);
                alertas.appendChild(divCard);
            }
        })
        .catch(function (erro) {
            console.error(erro);

        });
}

function fechar(idAlerta) {

    var div = document.getElementById(`alerta-${idAlerta}`)

    fetch(`/alertas/editar/${idAlerta}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((resposta) => {
            console.log(resposta); // Verifique o que o servidor está retornando
            if (resposta.ok) {
                div.remove()
            } else {
                console.log(resposta)
                console.log("deu erro")
            }
        })
        .catch((erro) => {
            console.error("Erro ao tentar visualizar o alerta:", erro);
        });
}