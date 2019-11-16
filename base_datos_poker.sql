drop database if exists poker_sergio_online;
create database poker_sergio_online CHARACTER SET utf8 COLLATE utf8_general_ci;

use poker_sergio_online;

drop table if exists jugadores;
create table jugadores(
	id_jugador int auto_increment,
    nick varchar(200) not null unique,
    cantera double(8,2) default 1000,
    password varchar(200),
    foto varchar(200),
    primary key(id_jugador)
);

drop table if exists cartas;
create table cartas(
	id_carta int auto_increment,
    valor int,
    imagen varchar(200),
    palo int,
    numero int,
    primary key(id_carta)
);

drop table if exists partidas;
create table partidas (
	id_partida int auto_increment,
    estado boolean,
    abierta boolean,
    fecha datetime default current_timestamp,
    primary key(id_partida)
);

drop table if exists jugadores_partida;
create table jugadores_partida(
	id_jugador_partida int auto_increment,
    id_partida int,
    id_jugador int,
    primary key(id_jugador_partida),
    foreign key(id_partida) references partidas(id_partida),
    foreign key(id_jugador) references jugadores(id_jugador)
);

drop table if exists juegos;
create table juegos(
    id_juego int auto_increment,
    id_partida int,
    id_jugador_partida int,
    primary key(id_juego),
    foreign key(id_partida) references partidas(id_partida),
    foreign key(id_jugador_partida) references jugadores_partida(id_jugador_partida)
);

drop table if exists mezclas;
create table mezclas(
    id_mezcla int auto_increment,
    id_juego int,
    primary key(id_mezcla),
    foreign key(id_juego) references juegos(id_juego)
);

drop table if exists mezclas_cartas;
create table mezclas_cartas(
    id_mezcla_juego int auto_increment,
    id_carta int,
    id_mezcla int,
    primary key(id_mezcla_juego),
    foreign key(id_carta) references cartas(id_carta),
    foreign key(id_mezcla) references mezclas(id_mezcla)
);

drop table if exists manos;
create table manos(
	id_mano int auto_increment,
    id_juego int,
    id_jugador int,
    id_carta int,
    primary key (id_mano),
    foreign key(id_juego) references juegos (id_juego),
    foreign key(id_jugador) references jugadores(id_jugador),
    foreign key(id_carta) references cartas(id_carta)
);

drop table if exists rondas;
create table rondas(
	id_ronda int auto_increment,
    id_juego int,
    bote double(10,2),
    primary key (id_ronda),
    foreign key(id_juego) references juegos (id_juego)
);

drop table if exists jugadores_rondas;
create table jugadores_rondas(
	id_jugadores_rondas int auto_increment,
    id_ronda int,
    id_jugador int,
    primary key (id_jugadores_rondas),
    foreign key(id_ronda) references rondas (id_ronda),
    foreign key(id_jugador) references jugadores(id_jugador)
);

drop table if exists turnos;
create table turnos(
	id_turno int auto_increment,
    id_ronda int,
    id_jugador int,
    estado boolean,
    apuesta double(10, 2),
    allin boolean,
    primary key (id_turno),
    foreign key(id_ronda) references rondas (id_ronda),
    foreign key(id_jugador) references jugadores(id_jugador)
);