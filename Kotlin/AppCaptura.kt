fun main() {
    val networkData = SecurePass()

    networkData.configurar()

    while (true) {
        val (recebidos, enviados) = networkData.getFormattedNetworkData()

        println("Bytes Recebidos: %.2f MB".format(recebidos))
        println("Bytes Enviados: %.2f MB".format(enviados))

        // Implementar na val abaixo quando o Node estiver funcionando
        // novoRegistroRecebidos.fkDispositivo = 1
        // novoRegistroRecebidos.fkNR = 1
        // novoRegistroRecebidos.fkComponente = 1
        val novoRegistroRecebidos = Captura()
        novoRegistroRecebidos.setRegistro(recebidos.toFloat())

        if (networkData.inserir(novoRegistroRecebidos)) {
            println("Registro de recebidos inserido com sucesso.")
        } else {
            println("Falha ao inserir registro de recebidos.")
        }

        // Implementar na val abaixo quando o Node estiver funcionando
        // novoRegistroEnviados.fkDispositivo = 1
        // novoRegistroEnviados.fkNR = 1
        // novoRegistroEnviados.fkComponente = 1
        val novoRegistroEnviados = Captura()
        novoRegistroEnviados.setRegistro(enviados.toFloat())

        if (networkData.inserir(novoRegistroEnviados)) {
            println("Registro de enviados inserido com sucesso.")
        } else {
            println("Falha ao inserir registro de enviados.")
        }

        // Implementar no for quando o Node estiver funcionando
        // fkDispositivo: ${it.fkDispositivo}
        // fkNR: ${it.fkNR}
        // fkComponente: ${it.fkComponente}
        val listaCapturas = networkData.listar()

        for (it in listaCapturas) {
            println("""
                idCaptura: ${it.idCaptura}
                Registro: ${it.registro}
                Data de Registro: ${it.dataRegistro}
            """.trimIndent())
        }

        Thread.sleep(60000) // Espera 60 segundos
    }
}