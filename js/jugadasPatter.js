'use strict'

var jugadas = {
    'patrones': [/(.*[2])/, /(.*[3])/, /(.*[4])/, /(.*[2])(.*(3))/, /(.*[1]){5}/, ],
    'puntos': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    'comprobar': function() {

    }
}

function activeGamePatter() {
    console.log("Jugada activada by patter");
    /* Clonamos el array */
    var arr = arrGlo.comprobante.slice();
    /* Creamos matriz y variables */
    var matriz = [
        []
    ];
    var linea = [];
    var rep_x = [],
        rep_y = [];
    /* Añadimos valores a los jugadores y a la mesa */
    var cartas_jugador = [
        [arr[0], arr[8]],
        [arr[1], arr[9]],
        [arr[2], arr[10]],
        [arr[3], arr[11]],
        [arr[4], arr[12]],
        [arr[5], arr[13]],
        [arr[6], arr[14]],
        [arr[7], arr[15]]
    ];
    var mesa = [arr[16], arr[17], arr[18], arr[19], arr[20]];

    for (let i = 0; i < 8; i++) {
        limpiar_matriz(matriz);
        linea = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let carta_alta = 0;

        cartas_jugador[i].forEach(element => {
            linea[Number(element.valor) - 1] += 1;
        });

        mesa.forEach(element => {
            linea[Number(element.valor) - 1] += 1;
        });
        console.log(linea);
    }
}