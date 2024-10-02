import com.github.britooo.looca.api.core.Looca
import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate
import java.math.BigDecimal
import java.math.RoundingMode
import java.time.format.DateTimeFormatter

class SecurePass {

    private val looca = Looca()
    lateinit var jdbcTemplate: JdbcTemplate

    fun configurar() {
        val datasource = BasicDataSource()
        datasource.url = "jdbc:mysql://localhost:3306/securepass?serverTimezone=America/Sao_Paulo"
        datasource.username = "root"
        datasource.password = "#Gf48500284897"

        jdbcTemplate = JdbcTemplate(datasource)
    }

    fun getFormattedNetworkData(): Pair<Double, Double> {
        // Obtém os bytes recebidos e enviados da primeira interface de rede
        val bytesRecebidos = looca.rede.grupoDeInterfaces.interfaces[0].bytesRecebidos
        val bytesEnviados = looca.rede.grupoDeInterfaces.interfaces[0].bytesEnviados

        // Converte bytes para megabytes
        val megabytesRecebidos = bytesRecebidos / (1024.0 * 1024.0)
        val megabytesEnviados = bytesEnviados / (1024.0 * 1024.0)

        return Pair(megabytesRecebidos, megabytesEnviados)
    }

    fun inserir(novoRegistro: Captura): Boolean {
        val formattedRegistro = BigDecimal(novoRegistro.registro.toDouble())
            .setScale(4, RoundingMode.HALF_UP) // Arredonda para 4 casas decimais

        val formattedDataRegistro = novoRegistro.dataRegistro.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))

        // Implementar no Insert quando o node estiver funcionando
        // novoRegistro.fkDispositivo,
        // novoRegistro.fkNR,
        // novoRegistro.fkComponente,

        val qtdLinhasAfetadas = jdbcTemplate.update(
            """
          INSERT INTO captura (registro, dataRegistro)
          VALUES (?, ?)
        """,
            formattedRegistro,
            formattedDataRegistro
        )
        return qtdLinhasAfetadas > 0
    }

    fun listar(): List<Captura> {
        return jdbcTemplate.query(
            "SELECT * FROM captura",
            BeanPropertyRowMapper(Captura::class.java)
        )
    }
}