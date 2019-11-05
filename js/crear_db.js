'use strict'

function crear_carta(valor, palo, imagen) {
    var carta = {
        "valor": valor,
        "palo": palo,
        "imagen": imagen
    };
    return carta;
}

function crearBD() {
    arrGlo.miBd.indexedDB = window.indexedDB;
    arrGlo.miBd.IDBKeyRange = window.IDBKeyRange;
    arrGlo.miBd.IDBKeyTransaction = window.IDBKeyTransaction;

    arrGlo.conn = arrGlo.miBd.indexedDB.open("Poker");

    arrGlo.conn.onupgradeneeded = function() {
        this.result.createObjectStore("Partidas", { keyPath: "idPartida", autoIncrement: true });
        this.result.createObjectStore("Usuarios", { keyPath: "idUsuario", autoIncrement: true });
        this.result.createObjectStore("Cartas", { keyPath: "idCarta", autoIncrement: true });
        this.result.createObjectStore("Jugadas", { keyPath: "idJugada", autoIncrement: true });
    }
}

function añadir(obj, tabla) {
    arrGlo.conn = arrGlo.miBd.indexedDB.open("Poker");

    arrGlo.conn.onsuccess = function() {
        this.result.transaction(tabla, "readwrite").objectStore(tabla).add(obj);
    };
}