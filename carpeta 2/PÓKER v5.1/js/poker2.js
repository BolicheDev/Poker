/**
 * Poker v5.1
 * Sigue con GRID
 * Macros (Media Query) para hacer la página responsive
 * Modificada la estructura y el diseño general
 * IndexedDB
 * Funciones:
 *      iniciar()
 *      repartir()
 *      barajar()
 */

var arrayCartas = [];
var arrayDesc = {C:"Corazones",D:"Diamantes",T:"Tréboles",P:"Picas"};
var cartasJugadores=[];
var cartasMesa=[];

window.onload=iniciar;

function iniciar() {
    var mibase = {};
    mibase.indexedDB=window.indexedDB;
    mibase.idBKeyRange=window.idBKeyRange;
    mibase.idBTransaction=window.idBKeyTransaction;
    var carretera = mibase.indexedDB.open("BaseIndexada");

    var btn = document.getElementById("repartir");
    btn.addEventListener('click', repartir);
    var btn = document.getElementById("barajar");
    btn.addEventListener('click', barajar);

    for(palo in arrayDesc) {
        for(i = 1; i <= 13; i++) {
            carta = new claseCarta(i,palo,arrayDesc[palo],palo+i+".png","reverso.png");
            arrayCartas.push(carta);
        }
    }

}

function barajar() {
    arrayCartas.sort(function(a,b) {return 0.5 - Math.random() });

    for(c=0;c<=3;c++) {
        document.getElementById("j"+c).innerHTML = "";
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

    for(c=0;c<=3;c++) {
        document.getElementById("j"+c).innerHTML = "";
    }

    document.getElementById("mesa").innerHTML = "";
    
    cartasJugadores = arrayCartas.slice(0,8);
    cartasMesa = arrayCartas.slice(9,14);

    for(x=0;x<cartasJugadores.length;x++) {
        var num = Math.trunc(x/2);
        var cartaImg = document.createElement("div");
        var nomImg = cartasJugadores[x].imganverso;
        cartaImg.style.backgroundImage = "url("+"'img/"+nomImg+"')";
        cartaImg.setAttribute("class", "carta");
        document.getElementById("j"+num).appendChild(cartaImg);
    }
    
    for(i=0;i<cartasMesa.length;i++) {
        var cartaImg = document.createElement("div");
        var nomImg = cartasMesa[i].imganverso;
        cartaImg.style.backgroundImage = "url("+"'img/"+nomImg+"')";
        cartaImg.setAttribute("class", "carta");
        document.getElementById("mesa").appendChild(cartaImg);
    }
}

