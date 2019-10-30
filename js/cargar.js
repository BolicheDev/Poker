'use strict'

window.onload = iniciar;

var cartas = [];

for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 13; j++) {
        cartas.push(i + "" + j);
    }
}

cartas.sort(function() { return Math.random() - 0.5 });

function iniciar() {
    crearDivs();
    repartir_cartas();
    document.getElementById("contenedorJuego").style.display = "none";
    document.getElementById("botonLogin").addEventListener("click", function() {
        cambiar();
    })
}

function cambiar() {
    document.getElementById("contenedor").style.display = "none";
    document.getElementById("contenedorJuego").style.display = "grid";
}

function crearDivs() {
    var contenedor = document.getElementById("contenedorJuego");
    for (var i = 1; i < 9; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "jugador" + " " + "fondo_color_verde" + " " + "displayJugadores");
        div.style.gridArea = "j" + i;
        div.setAttribute("id", "j" + i);
        contenedor.appendChild(div);
        /* ------------------------- */
        var hijo = document.createElement("div");
        hijo.setAttribute("class", "puesto");
        div.appendChild(hijo);
        /* ------------------------- */
        for (let j = 1; j < 3; j++) {
            hijo = document.createElement("div");
            hijo.setAttribute("class", "carta" + j);
            hijo.setAttribute("id", "carta" + j + "j" + i);
            div.appendChild(hijo);
        }
        /* ------------------------- */
        hijo = document.createElement("div");
        hijo.setAttribute("class", "check1");
        div.appendChild(hijo);
        hijo.innerHTML = "<i class='far fa-star fa-lg'></i>";
        /*hijo.innerHTML = "<i class='fas fa-star fa-lg'></i>";*/
        /* ------------------------- */
        hijo = document.createElement("div");
        hijo.setAttribute("class", "check2");
        div.appendChild(hijo);
        hijo.innerHTML = "<i class='fas fa-star fa-lg'></i>";
        /*hijo.innerHTML = "<i class='fas fa-star fa-lg'></i>";*/
    }
    var div = document.createElement("div");
    div.setAttribute("class", "mesa");
    contenedor.appendChild(div);
    /* ------------------------- */
    var div2 = document.createElement("div");
    div2.setAttribute("class", "mesaInterior" + " " + "fondo_color_verde");
    div.appendChild(div2);
    /* ------------------------- */
    for (let i = 1; i < 53; i++) {
        var hijo = document.createElement("div");
        hijo.setAttribute("class", "mazo");
        hijo.setAttribute("id", "mazo" + i);
        div2.appendChild(hijo);
    }
    /*var hijo = document.createElement("div");
    hijo.setAttribute("class", "mazo");
    div2.appendChild(hijo);*/
    /*for (let i = 1; i < 6; i++) {
        var hijo = document.createElement("div");
        hijo.setAttribute("class", "cartasMesa");
        hijo.setAttribute("id", "cartaMesa" + i);
        div2.appendChild(hijo);
    }*/
    /* ------------------------- */
    div = document.createElement("div");
    div.setAttribute("class", "apostar" + " " + "fondo_color_verde");
    contenedor.appendChild(div);
    /* ------------------------- */
    for (var i = 1; i <= 2; i++) {
        var hijo = document.createElement("div");
        hijo.setAttribute("class", "cartaPropia" + i);
        hijo.setAttribute("id", "cartaPropia" + i);
        div.appendChild(hijo);
    }
    /* ------------------------- */
    var hijo = document.createElement("div");
    hijo.setAttribute("class", "botonesApuestas");
    div.appendChild(hijo);
    /* ------------------------- */
    var hijo2 = document.createElement("input");
    hijo2.setAttribute("type", "range");
    hijo2.setAttribute("min", "0");
    hijo2.setAttribute("max", "100");
    hijo2.setAttribute("class", "barra");
    hijo2.setAttribute("value", "0");
    hijo2.setAttribute("id", "barra");
    hijo2.setAttribute("onchange", "saberValor()");
    hijo.appendChild(hijo2);
    hijo.innerHTML += "<h3 id='valorBarra'> 0 </h3>";
    /* ------------------------- */
    hijo2 = document.createElement("button");
    hijo2.setAttribute("class", "subir");
    hijo2.setAttribute("id", "subir");
    hijo.appendChild(hijo2);
    hijo2.innerHTML = "Subir";
    /* ------------------------- */
    hijo2 = document.createElement("button");
    hijo2.setAttribute("class", "pasar");
    hijo2.setAttribute("id", "pasar");
    hijo.appendChild(hijo2);
    hijo2.innerHTML = "Pasar";
    /* ------------------------- */
    hijo2 = document.createElement("button");
    hijo2.setAttribute("class", "retiro");
    hijo2.setAttribute("id", "retiro");
    hijo.appendChild(hijo2);
    hijo2.innerHTML = "Retiro";
    /* ------------------------- */
}

function repartir_cartas() {
    var x = document.getElementById("carta1j1").clientWidth;
    var y = document.getElementById("carta1j1").clientHeight;
    console.log(x + "  " + y);
}

function saberValor() {
    var barra = document.getElementById("barra");
    var valor = document.getElementById("valorBarra");

    valor.innerHTML = barra.value;

    barra.oninput = function() {
        valor.innerHTML = this.value;
    }
}