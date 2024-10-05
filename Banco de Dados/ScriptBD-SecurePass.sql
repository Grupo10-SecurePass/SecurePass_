CREATE DATABASE securepass;
USE securepass;

#drop database securepass;

CREATE TABLE feedback(
idFeedback INT PRIMARY KEY auto_increment,
nome VARCHAR(100),
email VARCHAR(256),
descricao TEXT
);

CREATE TABLE empresa(
NR INT PRIMARY KEY,
nome varchar(100) UNIQUE NOT NULL,
CNPJ CHAR(14) UNIQUE NOT NULL,
email VARCHAR(256) UNIQUE NOT NULL,
stats VARCHAR(45),
	CONSTRAINT chStats CHECK (stats in ('ativo', 'inativo'))
);

INSERT INTO empresa VALUES
(4826, 'SecurePass', 12345678901234, 'teste@gmail.com', 'ativo');

select * from empresa;

CREATE TABLE usuario(
idUsuario INT auto_increment,
fkNR INT,
	CONSTRAINT fkNrUsuario FOREIGN KEY (fkNR)
		REFERENCES empresa(NR),
PRIMARY KEY(idUsuario, fkNR),
nome VARCHAR(100),
CPF CHAR(11) UNIQUE NOT NULL,
email VARCHAR(256) UNIQUE NOT NULL,
	CONSTRAINT chEmail CHECK (email like('%@%.%')),
senha VARCHAR(45),
cargo VARCHAR(45),
	CONSTRAINT chCargo CHECK (cargo in ('representante','gerente','técnico')),
stats VARCHAR(45),
	CONSTRAINT chStatsUsuario CHECK (stats in ('ativo','inativo')),
fkResponsavel INT,
	CONSTRAINT fkResponsavelUsuario FOREIGN KEY (fkResponsavel)
		REFERENCES usuario(idUsuario)
);

INSERT INTO usuario VALUES 
(default, 4826, 'Ayrton', 12345678901, 'ayrton@gmail.com', '1234', 'representante', 'ativo', null);

select * from usuario;

update usuario set stats = 'inativo' where idUsuario = 1;

CREATE TABLE dispositivo(
idDispositivo INT auto_increment,
fkNR INT,
CONSTRAINT fkNrDispositivo FOREIGN KEY (fkNR)
		REFERENCES empresa(NR),
PRIMARY KEY(idDispositivo, fkNR),
nome VARCHAR(100) UNIQUE,
stats VARCHAR(45),
	CONSTRAINT chStatsDispositivo CHECK (stats in ('ativo', 'inativo'))
);

#máquina colocada só para testar o python e o kotlin
INSERT INTO dispositivo(fkNR, nome, stats) VALUES
(4826,'DESKTOP-17C842E', 'ativo');

CREATE TABLE componente(
idComponente INT PRIMARY KEY auto_increment,
nome VARCHAR(100),
unidadeDeMedida VARCHAR(45)
);

#coloquem o nome dos componentes igual ao nome da variavel no python e kotlin
INSERT INTO componente(nome, unidadeDeMedida) VALUES
('PercCPU', '%'),
('PercMEM', '%'),
('PercDISCO', '%');
#falta da rede


CREATE TABLE captura(
idCaptura INT auto_increment,
fkDispositivo INT,
	CONSTRAINT fkDispositivoCaptura FOREIGN KEY (fkDispositivo)
		REFERENCES dispositivo(idDispositivo),
fkNR INT,
	CONSTRAINT fkNrCaptura FOREIGN KEY (fkNR)
		REFERENCES dispositivo(fkNR),
fkComponente INT,
	CONSTRAINT fkComponenteCaptura FOREIGN KEY (fkComponente)
		REFERENCES componente(idComponente),
PRIMARY KEY (idCaptura, fkDispositivo, fkNR, fkComponente),
registro FLOAT,
dataRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

select * from captura;

CREATE TABLE alerta(
idAlerta INT auto_increment,
fkCaptura INT,
	CONSTRAINT fkCapturaAlerta FOREIGN KEY (fkCaptura)
		REFERENCES captura(idCaptura),
fkNR INT,
	CONSTRAINT fkNrAlerta FOREIGN KEY (fkNR)
		REFERENCES empresa(NR),
PRIMARY KEY (idAlerta, fkCaptura, fkNR),
dataAlerta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
descricao TEXT
);

select * from alerta;