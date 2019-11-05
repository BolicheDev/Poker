var variablesGlobales = {
    mibd: {},
    arrayCartas: [],
    arrayDesc: { C: "Corazones", D: "Diamantes", T: "Tréboles", P: "Picas" },
    cartasJugadores: [],
    cartasMesa: [],
    conn: '',
    miObjetoJS: {}
};
/*var mibd={};
var arrayCartas = [];
var arrayDesc = {C:"Corazones",D:"Diamantes",T:"Tréboles",P:"Picas"};
var cartasJugadores=[];
var cartasMesa=[];*/

window.onload = iniciar;

function crearBD() {
    variablesGlobales.mibd.indexedDB = window.indexedDB;
    variablesGlobales.mibd.IDBKeyRange = window.IDBKeyRange;
    variablesGlobales.mibd.IDBKeyTransaction = window.IDBKeyTransaction;

    variablesGlobales.conn = variablesGlobales.mibd.indexedDB.open("partida");

    variablesGlobales.conn.onupgradeneeded = function() {
        this.result.createObjectStore("misCartas", { keyPath: "idPartida", autoIncrement: true });
    }
}

function guardar() {
    var mipartidahtml = document.getElementById("principal").innerHTML;
    variablesGlobales.miObjetoJS = { "mipartida": mipartidahtml };
    crearBD();
    variablesGlobales.conn.onsuccess = function() {
        this.result.transaction("misCartas", "readwrite").objectStore("misCartas").put(variablesGlobales.miObjetoJS);
        document.getElementById("principal").innerHTML = "";
    }
}

function cargar() {

    variablesGlobales.miObjetoJS = { "mipartida": mipartidahtml };
    crearBD();
    variablesGlobales.conn.onsuccess = function() {
        this.result.transaction("misCartas", "readwrite").objectStore("misCartas").get(1).onsuccess = function() {
            document.getElementById("principal").innerHTML = this.result.mipartida;

        };
    };
}

function leersecuencial() {
    crearBD();
    variablesGlobales.conn.onsuccess = function() {
        this.result.transaction("misCartas", "readwrite").objectStore("misCartas").openCursor().onsuccess = function() {
            var miindice = this.result;

            if (miindice) {
                //muestra objeto
                console.log(miindice);
                miindice.continue();

            }

        }
    }
}

function iniciar() {



    var btn = document.getElementById("repartir");
    btn.addEventListener('click', repartir);
    var btn = document.getElementById("barajar");
    btn.addEventListener('click', barajar);
    var guarda = document.getElementById("guardar");
    guarda.addEventListener('click', guardar);
    var carga = document.getElementById("cargar");
    carga.addEventListener('click', leersecuencial);


    for (palo in variablesGlobales.arrayDesc) {
        for (i = 1; i <= 13; i++) {
            carta = new claseCarta(i, palo, variablesGlobales.arrayDesc[palo], palo + i + ".png", "reverso.png");
            variablesGlobales.arrayCartas.push(carta);
        }
    }

}

function barajar() {
    variablesGlobales.arrayCartas.sort(function(a, b) { return 0.5 - Math.random() });

    for (c = 0; c <= 3; c++) {
        document.getElementById("j" + c).innerHTML = "";
    }

    document.getElementById("mesa").innerHTML = "";
}

/* CLASE CARTA */

function claseCarta(valor, palo, descPalo, imganverso, reverso) {
    this.valor = valor;
    this.palo = palo;
    this.descPalo = descPalo;
    this.imganverso = imganverso;
    this.reverso = reverso;
}

/**
 * REPARTIR
 * Reparte 2 cartas a cada jugador y 5 a la mesa
 */
function repartir() {

    for (c = 0; c <= 3; c++) {
        document.getElementById("j" + c).innerHTML = "";
    }

    document.getElementById("mesa").innerHTML = "";

    variablesGlobales.cartasJugadores = variablesGlobales.arrayCartas.slice(0, 8);
    variablesGlobales.cartasMesa = variablesGlobales.arrayCartas.slice(9, 14);

    for (x = 0; x < variablesGlobales.cartasJugadores.length; x++) {
        var num = Math.trunc(x / 2);
        var cartaImg = document.createElement("div");
        var nomImg = variablesGlobales.cartasJugadores[x].imganverso;
        cartaImg.style.backgroundImage = "url(" + "'img/" + nomImg + "')";
        cartaImg.setAttribute("class", "carta");
        document.getElementById("j" + num).appendChild(cartaImg);
    }

    for (i = 0; i < variablesGlobales.cartasMesa.length; i++) {
        var cartaImg = document.createElement("div");
        var nomImg = variablesGlobales.cartasMesa[i].imganverso;
        cartaImg.style.backgroundImage = "url(" + "'img/" + nomImg + "')";
        cartaImg.setAttribute("class", "carta");
        document.getElementById("mesa").appendChild(cartaImg);
    }
}

function animar() {
    var carta = document.getElementById("carta");
    var pos = carta.offsetHeight;
}