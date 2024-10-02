import java.time.LocalDateTime

// Implementar na class quando o node estiver funcionando
// var fkDispositivo: Int = 0
// var fkNR: Int = 0
// var fkComponente: Int = 0

class Captura {
    var idCaptura: Int = 0
    var dataRegistro: LocalDateTime = LocalDateTime.now()
    var registro: Float = 0.0f
        private set

    fun setRegistro(novoValor: Float) {
        if (novoValor > 0) {
            registro = novoValor
        } else {
            println("Registro inválido! Deve ser registrado um valor maior que 0")
        }
    }
}