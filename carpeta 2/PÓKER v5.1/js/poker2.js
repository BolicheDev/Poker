var arrayCartas = [];
var arrayDesc = { C: "Corazones", D: "Diamantes", T: "Tréboles", P: "Picas" };
var cartasJugadores = [];
var cartasMesa = [];

window.onload = iniciar;

function iniciar() {
    var mibase = {};
    mibase.indexedDB = window.indexedDB;
    mibase.idBKeyRange = window.idBKeyRange;
    mibase.idBTransaction = window.idBKeyTransaction;
    var carretera = mibase.indexedDB.open("BaseIndexada");

    var btn = document.getElementById("repartir");
    btn.addEventListener('click', repartir);
    var btn = document.getElementById("barajar");
    btn.addEventListener('click', barajar);

    for (palo in arrayDesc) {
        for (i = 1; i <= 13; i++) {
            carta = new claseCarta(i, palo, arrayDesc[palo], palo + i + ".png", "reverso.png");
            arrayCartas.push(carta);
        }
    }

}