'use strict'

window.onload = iniciar;

var cartas = [];

var arrGlo = {
    "miBd": {},
    "conn": "",
    "cartas": []
}

var tablas = {
    "usuarios": "Usuarios",
    "partidas": "Partidas",
    "cartas": "Cartas",
    "jugadas": "Jugadas"
}

for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 13; j++) {
        arrGlo.cartas.push(i + "" + j);
    }
}

cartas.sort(function() { return Math.random() - 0.5 });

function iniciar() {
    crearDivs();
    //document.getElementById("contenedorJuego").style.display = "none";
    cambiar();
    document.getElementById("botonLogin").addEventListener("click", cambiar);
    document.getElementById("botonRegistro").addEventListener("click", crearUsuario);
    crearBD();
    repartir_visual();
}

function cambiar() {
    document.getElementById("contenedor").style.display = "none";
    document.getElementById("contenedorJuego").style.display = "grid";
}

function repartir_cartas() {
    var x = document.getElementById("carta1j1").clientWidth;
    var y = document.getElementById("carta1j1").clientHeight;
}

function saberValor() {
    var barra = document.getElementById("barra");
    var valor = document.getElementById("valorBarra");

    valor.innerHTML = barra.value;

    barra.oninput = function() {
        valor.innerHTML = this.value;
    }
}

function repartir_visual() {
    var num_carta_repartir = 50;
    for (let i = 1; i < 3; i++) {
        for (let j = 1; j < 9; j++) {
            let carta = document.getElementById("mazo" + num_carta_repartir);
            let lugar_carta = document.getElementById("carta" + i + "j" + j);

            carta.style.position = "absolute";

            carta.style.width = lugar_carta.clientWidth + "px";
            carta.style.height = lugar_carta.clientHeight + "px";

            carta.style.top = lugar_carta.offsetTop + "px";
            carta.style.left = lugar_carta.offsetLeft + "px";
            num_carta_repartir--;
        }
    }
}

function crearUsuario() {
    var fallo = document.getElementById("fallo");
    var texto = "";

    var nombre = document.getElementById("usuarioInput").value;
    var contraseña = document.getElementById("passwordRegistro1").value;
    var contraseñaRep = document.getElementById("passwordRegistro2").value;

    if (contraseña == contraseñaRep) {
        if (contraseña.length >= 4 && nombre.length >= 4) {
            var obj = { "Nombre": nombre, "contraseña": contraseña };
            añadir(obj, tablas.usuarios);
            texto += "<h3> Usuario creado correctamente </h3>";
            document.getElementById("usuarioInput").innerHTML = "";
        } else {
            texto += "<h3> Tiene que tener minimo 4 caracteres la contraseña y el nombre </h3>";
        }
    } else {
        texto += "<h3> Contraseñas no coinciden </h3>";
    }

    fallo.innerHTML = texto;
    document.getElementById("passwordRegistro1").innerHTML = "";
    document.getElementById("passwordRegistro2").innerHTML = "";
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
    for (let i = 1; i < 51; i++) {
        var hijo = document.createElement("div");
        hijo.setAttribute("class", "mazo");
        hijo.setAttribute("id", "mazo" + i);
        div2.appendChild(hijo);
    }
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