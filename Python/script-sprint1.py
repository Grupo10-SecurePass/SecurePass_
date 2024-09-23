import psutil
import time
import subprocess
from datetime import datetime

while (True):

    data_e_hora_atuais = datetime.now()
    dt= data_e_hora_atuais.strftime("%d/%m/%Y")
    dthora = data_e_hora_atuais.strftime("%d/%m/%Y %H:%M")
    
    cpu_percent = psutil.cpu_percent(interval=1)

    mem = psutil.virtual_memory()
    total_ram = mem.total
    ulitilizado_ram = mem.used
    livre_ram = mem.available

    disco = psutil.disk_usage('/')
    total_armazenamento = disco.total
    ultilizado_armazenamento = disco.used
    livre_armazenamento = disco.free

    print(dthora)
    print(f"CPU usada: {cpu_percent}%")
    print(f"Total de RAM: {total_ram / (1024 ** 3):.2f} GB")
    print(f"RAM usada: {ulitilizado_ram / (1024 ** 3):.2f} GB")
    print(f"RAM livre: {livre_ram / (1024 ** 3):.2f} GB")
    print(f"Armazenamento total: {total_armazenamento / (1024 ** 3):.2f} GB")
    print(f"Armazenamento usado: {ultilizado_armazenamento / (1024 ** 3):.2f} GB")
    print(f"Armazenamento livre: {livre_armazenamento / (1024 ** 3):.2f} GB")
    print("------------------------------")

    time.sleep(5)
   
