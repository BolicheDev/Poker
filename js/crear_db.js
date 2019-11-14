'use strict'

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
        this.result.createObjectStore("Mezcla", { keyPath: "idMezcla", autoIncrement: true });
    }
}

function añadir(obj, tabla) {
    arrGlo.conn = arrGlo.miBd.indexedDB.open("Poker");
    arrGlo.conn.onsuccess = function() {
        this.result.transaction(tabla, "readwrite").objectStore(tabla).add(obj);
    };
}

function añadir_cartas(obj) {
    arrGlo.conn = arrGlo.miBd.indexedDB.open("Poker");
    arrGlo.conn.onsuccess = function() {
        this.result.transaction("Mezcla", "readwrite").objectStore("Mezcla").add(obj).onsuccess = (function() {
            cargar_cartas_mezcla("Mezcla");
        })
    };
}

function cargar_cartas_mezcla() {
    arrGlo.conn = arrGlo.miBd.indexedDB.open("Poker");

    arrGlo.conn.onsuccess = function() {
        var transaccion = this.result;
        var variable = this.result.transaction("Mezcla", "readwrite").objectStore("Mezcla").count().onsuccess = function() {
            transaccion.transaction("Mezcla", "readwrite").objectStore("Mezcla").get(this.result).onsuccess = function() {
                arrGlo.comprobante = this.result;
            };
        };
    }
}