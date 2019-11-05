CREATE DATABASE MisProductos

CREATE TABLE productos(
codigo varchar(3),
descripcion varchar(30),
precio decimal(6,2),
PRIMARY KEY (codigo)
);

INSERT INTO productos VALUES ('P1','BOLIGRAFOS',1.50);
INSERT INTO productos VALUES ('P2','LAPICEROS',4);
INSERT INTO productos VALUES ('P3','BORRADORES',0.2);