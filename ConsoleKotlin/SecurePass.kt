class SecurePass(
    var horario: Int,
    var Rede: Int,
    var CPU: Double,
    var Ram: Double,
    var Armazenamento: Double,
) {
    fun verHorario(horas: Int){
        if ( (horas >= 6 && horas <= 9) || (horas >= 17 && horas <= 20)){
            println("Estamos em horário de pico, verifique os componentes!!!")
        }
        else
        {
            println("Não estamos em horário de pico mas verifique os componentes.")
        }
    }

    fun verRede(conexao: Int){
        if(conexao < 100){
            println("A conexão está baixa, verifque RAPIDAMENTE!")
        }
        else{
            println("A conexão está estável.")
        }
    }

    fun verCPU(cpu: Double){
        if(cpu > 70){
            println("O uso da CPU está alto, verifque RAPIDAMENTE!")
        }
        else{
            println("A CPU está estável.")
        }
    }

    fun verRam(memoria: Double){
        if(memoria > 70){
            println("O uso de memória RAM está alto, verifque RAPIDAMENTE!")
        }
        else{
            println("A memória Ram está estável.")
        }
    }

    fun verDisco(disco: Double){
        if(disco > 70){
            println("O uso do disco está alto, verifque RAPIDAMENTE!")
        }
        else{
            println("O disco está estável.")
        }
    }

    fun verDetalhes(): String{
        val texto = "Agora são: ${horario}h, a rede está em ${Rede}mmbs, a CPU está em ${"%.1f".format(CPU)}%, o uso de Ram está" +
                " em ${"%.1f".format(Ram)}, e o uso de armazenamento está ${"%.1f".format(Armazenamento)}%. \n"

        return texto
    }
}