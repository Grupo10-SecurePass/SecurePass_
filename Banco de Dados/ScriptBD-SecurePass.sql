CREATE DATABASE securepass;
USE securepass;

CREATE TABLE feedback(
idFeedback INT PRIMARY KEY auto_increment,
nome VARCHAR(100),
email VARCHAR(256),
descricao TEXT
);

CREATE TABLE empresa(
NR INT PRIMARY KEY,
CNPJ CHAR(14) UNIQUE NOT NULL,
email VARCHAR(256) UNIQUE NOT NULL,
stats VARCHAR(45),
	CONSTRAINT chStats CHECK (stats in ('ativo', 'inativo'))
);

CREATE TABLE usuario(
idUsuario INT auto_increment,
fkNR INT,
	CONSTRAINT fkNrUsuario FOREIGN KEY (fkNR)
		REFERENCES empresa(NR),
PRIMARY KEY(idUsuario, fkNR),
nome VARCHAR(100),
CPF CHAR(14) UNIQUE NOT NULL,
email VARCHAR(256) UNIQUE NOT NULL,
	CONSTRAINT chEmail CHECK (cargo like('%@%.%')),
senha VARCHAR(45),
cargo VARCHAR(45),
	CONSTRAINT chCargo CHECK (cargo in ('representante','gerente','técnico')),
stats VARCHAR(45),
	CONSTRAINT chStatsUsuario CHECK (stats in ('ativo','inativo')),
fkResponsavel INT,
	CONSTRAINT fkResponsavelUsuario FOREIGN KEY (fkResponsavel)
		REFERENCES usuario(idUsuario)
);

CREATE TABLE dispositivo(
idDispositivo INT auto_increment,
fkNR INT,
CONSTRAINT fkNrDispositivo FOREIGN KEY (fkNR)
		REFERENCES dispositivo(idDispositivo),
PRIMARY KEY(idDispositivo, fkNR),
nome varchar(100),
stats VARCHAR(45),
	CONSTRAINT chStatsDispositivo CHECK (stats in ('ativo', 'inativo'))
);

CREATE TABLE componente(
idComponente INT PRIMARY KEY auto_increment,
nome VARCHAR(100),
unidadeDeMedida VARCHAR(45)
);

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