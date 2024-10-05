from mysql.connector import connect, Error
import psutil
import time
import os
import platform
from dotenv import load_dotenv
import socket #serve para pegar o nome da máquina

load_dotenv()

#vejo sistema operacional
SO = platform.system()

#configurando o banco de dados
config = {
  "user": os.getenv("USER_LOGIN"),
  "password": os.getenv("DB_PASSWORD"),
  "host": os.getenv("HOST"),
  "database": os.getenv("DATABASE")
}

#pegando a fkDispositivo e a fkNR por meio do nome e armazenando em uma variável
try:
        # Conectar ao banco de dados
        mydb = connect(**config)
        if mydb.is_connected():
            mycursor = mydb.cursor()

            nome_dispositivo = socket.gethostname()

            result = mycursor.execute(f"SELECT idDispositivo, fkNR FROM dispositivo WHERE nome LIKE '%{nome_dispositivo}%';")
            select = mycursor.fetchall()
            fkDispositivo = select[0][0]
            fkNR = select[0][1]
                 

except Error as e:
        print("Erro ao conectar com o MySQL (parte da fkDispositivo):", e)
        
finally:
        # Fechar cursor e conexão
        if mydb.is_connected():
            mycursor.close()
            mydb.close()


#começo da captura de dados

#serve para o disco sendo como um indicador para quando capturar 
contador_disco = 0

while True:
    PercCPU = psutil.cpu_percent()
    PercMEM = psutil.virtual_memory().percent

    #listas para trabalhar com mais de um valor
    lista_valor = [PercCPU, PercMEM]
    lista_variavel = ["PercCPU", "PercMEM"]
    lista_idComponente = []



    try:
        # Conectar ao banco de dados
        mydb = connect(**config)
        if mydb.is_connected():
            mycursor = mydb.cursor()

        #select pra pegar idComponente
        for captura in lista_variavel:
            result = mycursor.execute(f"SELECT idComponente FROM componente WHERE nome LIKE '%{captura}%';")
            idComponente = mycursor.fetchall()
            idComponente = idComponente[0][0]
            lista_idComponente.append(idComponente)

        if (PercCPU > 70.0 or PercMEM > 75.0):
            
            #serve para identificar na lista_idComponente, qual a fkComponente
            i = 0

            for item in lista_valor:
                sql_query = """
                INSERT INTO Captura (fkDispositivo, fkNR,fkComponente, registro, dataRegistro)
                VALUES (%s, %s,%s, %s, current_timestamp())
                """
                val = (fkDispositivo, fkNR,lista_idComponente[i],item)
                mycursor.execute(sql_query, val)
                mydb.commit()

                #pego a fkCaptura pegando o último dado que foi inserido
                result = mycursor.execute(f"SELECT idCaptura FROM captura ORDER BY idCaptura DESC LIMIT 1;")
                idUltimoDado = mycursor.fetchall()
                idUltimoDado = idUltimoDado[0][0]

                #vejo com o índice qual é a variável da lista e se o valor dela ultrapassa o limite para fazer a descrição do alerta
                if(lista_variavel[i] == "PercCPU" and PercCPU > 70.0):
                        descricao = f"Porcentual de uso de CPU está em risco! CPU: {PercCPU}"
                        
                        sql_query = "INSERT INTO Alerta(fkCaptura, fkNR, dataAlerta, descricao) VALUES (%s, %s, current_timestamp(), %s);"
                        val = [idUltimoDado, fkNR, descricao]
                        mycursor.execute(sql_query, val)
                        mydb.commit()

                if(lista_variavel[i] == "PercMEM" and PercMEM > 75.0):
                        descricao = f"Porcentual de uso de memória RAM está em risco! RAM: {PercMEM}"

                        sql_query = "INSERT INTO Alerta(fkCaptura, fkNR, dataAlerta, descricao) VALUES (%s, %s, current_timestamp(), %s);"
                        val = [idUltimoDado, fkNR, descricao]
                        mycursor.execute(sql_query, val)
                        mydb.commit()

                i += 1

        else:

            # Inserir dados na tabela
            i = 0

            for item in lista_valor:
                sql_query = """
                    INSERT INTO Captura (fkDispositivo, fkNR, fkComponente, registro, dataRegistro)
                    VALUES (%s, %s,%s, %s, current_timestamp())
                    """
                val = (fkDispositivo, fkNR,lista_idComponente[i],item)
                mycursor.execute(sql_query, val)
                mydb.commit()
                i += 1
                
                print(mycursor.rowcount, "registro inserido")


        #cada dado de cpu e ram será cadastrado a cada 30 segundos e dessa forma a cada 120 dados pegos, irá inserir um dado de disco (30 segundos = 120 dados em uma hora)
        if (contador_disco == 0 or contador_disco % 120 == 0):
            print("entrando em disco")

            result = mycursor.execute(f"SELECT idComponente FROM componente WHERE nome LIKE '%PercDISCO%';")
            idComponente = mycursor.fetchall()
            idComponente = idComponente[0][0]

            #vejo sistema operacional e assim coloco a pasta
            if(SO == "Windows"):
                PercDISCO = psutil.disk_usage('C:\\').percent
            else:
                PercDISCO = psutil.disk_usage('/').percent

            sql_query = """
                INSERT INTO Captura (fkDispositivo, fkNR, fkComponente, registro, dataRegistro)
                VALUES (%s, %s, %s, %s, current_timestamp())
                """
            val = (fkDispositivo, fkNR,idComponente, PercDISCO)
            mycursor.execute(sql_query, val)
            mydb.commit()

            result = mycursor.execute(f"SELECT idCaptura FROM captura ORDER BY idCaptura DESC LIMIT 1;")
            idUltimoDadoDISK = mycursor.fetchall()
            idUltimoDadoDISK = idUltimoDadoDISK[0][0]
            

            if(PercDISCO > 80.0):
                descricao = f"Porcentual de uso de disco está em risco! disk: {PercDISCO}"

                sql_query = "INSERT INTO Alerta(fkCaptura, fkNR, dataAlerta, descricao) VALUES (%s, %s, current_timestamp(), %s);"
                val = [idUltimoDadoDISK, fkNR, descricao]
                mycursor.execute(sql_query, val)
                mydb.commit()

                 

    except Error as e:
        print("Erro ao conectar com o MySQL:", e)
        
    finally:
        # Fechar cursor e conexão
        if mydb.is_connected():
            mycursor.close()
            mydb.close()


    contador_disco += 1
    time.sleep(30)