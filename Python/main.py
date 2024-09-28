from mysql.connector import connect, Error
import psutil
import time
import os
from dotenv import load_dotenv

load_dotenv()

config = {
  "user": os.getenv("USER_LOGIN"),
  "password": os.getenv("DB_PASSWORD"),
  "host": os.getenv("HOST"),
  "database": os.getenv("DATABASE")
}

print('Monitorando CPU...')

atualizador = 5  # Número de vezes que o loop vai rodar
limite_cpu = 15  # Limite de uso de CPU para disparar o alerta
i = 0

while i < atualizador:
    cpu_percent = psutil.cpu_percent(interval=1)


    print(f"Uso de CPU: {cpu_percent:.2f}%")
    print(cpu_percent)

    if cpu_percent > limite_cpu:
        print(f"Uso de CPU {cpu_percent:.2f}% ...ALERTA")
    else:
        print("a cpu está normal")

    try:
        # Conectar ao banco de dados
        mydb = connect(**config)
        if mydb.is_connected():
            mycursor = mydb.cursor()

            # Inserir dados na tabela
            sql_query = """
            INSERT INTO Dados (data_hora, alerta, status_cpu)
            VALUES (current_timestamp(), 'Uso de CPU está normal', %s)
            """
            val = (round(cpu_percent, 2),)
            mycursor.execute(sql_query, val)
            mydb.commit()
                
            print(mycursor.rowcount, "registro inserido")
                 

    except Error as e:
        print("Erro ao conectar com o MySQL:", e)
        
    finally:
        # Fechar cursor e conexão
        if mydb.is_connected():
            mycursor.close()
            mydb.close()

    i += 1
    time.sleep(5)