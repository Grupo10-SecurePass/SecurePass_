fun main() {
    val analiseSistem = SecurePass(
        0,
        0,
        0.0,
        0.0,
        0.0
    )

    println("Digite que horas são (deixe arredondada): ")
    analiseSistem.horario = readln().toInt()
    analiseSistem.verHorario(analiseSistem.horario)

    println("Digite quantos MBBS está a rede: ")
    analiseSistem.Rede = readln().toInt()
    analiseSistem.verRede(analiseSistem.Rede)

    println("Digite qual a porcentagem da CPU: ")
    analiseSistem.CPU = readln().toDouble()
    analiseSistem.verCPU(analiseSistem.CPU)

    println("Digite qual a porcentagem de Ram usada: ")
    analiseSistem.Ram = readln().toDouble()
    analiseSistem.verRam(analiseSistem.Ram)

    println("Digite qual a porcentagem de armazenamento que está sendo usado: ")
    analiseSistem.Armazenamento = readln().toDouble()
    analiseSistem.verDisco(analiseSistem.Armazenamento)

    while (true){
        println("Escolha uma das opções:")
        println("1 - Detalhes.")
        println("2 - Sair.")

        val opcao = readln().toInt()

        when(opcao){
            1 -> {
                println(analiseSistem.verDetalhes())
            }
            2 -> {
               break
            }
            else -> {
                println("OPÇÃO INVÁLIDA!")
            }
        }
    }
}