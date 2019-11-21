'use strict'

var arr_jugadores = [];

function activar_jugada() {
    console.log("Jugada activada");
    /* Clonamos el array */
    var arr = arrGlo.comprobante.slice();
    /* Creamos matriz y variables */
    var matriz = [
        []
    ];
    var rep_x = [],
        rep_y = [],
        cont = [];
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

    /* Recorremos los 8 jugadores */
    for (let i = 0; i < 8; i++) {
        /* Limpiamos la matriz */
        limpiar_matriz(matriz);
        /* Guardamos la carta alta, recodamos que el AS es el que mas vale (en mi caso tiene valor 1) */
        /* Inicializamos la carta alta a 0 para no tener problemas de valores */
        let carta_alta = 0;
        /* Meter elementos en la matriz */
        cartas_jugador[i].forEach(element => {
            matriz[element.palo][element.numero] = 1;
            /* Sobre escribimos el valor de la carta alta */
            if (element.valor == 1) {
                carta_alta = 1;
            } else if (element.valor > carta_alta && carta_alta != 1) {
                carta_alta = element.valor;
            }
        });
        /* Añadir a la matriz las cartas de la mesa */
        mesa.forEach(element => {
            matriz[element.palo][element.numero] = 1;
        });
        /* Meter cartas para saber, pareja, trio, doble pareja, poker, o full */
        for (let j = 0; j < 13; j++) {
            if (matriz[0][j] == 1 || matriz[1][j] == 1 || matriz[2][j] == 1 || matriz[3][j] == 1) {
                rep_y[j] = Number(matriz[0][j] + matriz[1][j] + matriz[2][j] + matriz[3][j]);
            } else {
                rep_y[j] = 0;
            }
        }
        /* Para saber si es escalera normal y escalera de color */
        let esc_real = false;
        let color = false;
        for (let j = 0; j < 4; j++) {
            rep_x[j] = 0;
            for (let h = 0; h < 13; h++) {
                if (matriz[j][h] == 1) {
                    rep_x[j] += 1;
                }
            }
            /* Guardar para saber si mas tarde comprobar si es escalera de color */
            /* Comprobar si es escalera real */
            if (matriz[j].lastIndexOf(1) - matriz[j].indexOf(1) >= 4 && matriz[j].lastIndexOf(1) - matriz[j].indexOf(1) <= 6 && rep_x[j] >= 5) {
                cont[j] = true;
            } else if (matriz[j].lastIndexOf(1) - matriz[j].indexOf(1) == 12 && rep_x[j] >= 5) {
                cont[j] = true;
                esc_real = true;
            } else if (rep_x[j] >= 5) {
                color = true;
            } else {
                cont[j] = false;
            }
        }
        /* Saber si es escalera simple */
        let escalera = saber_escalera(rep_y);

        /* Contar parejas, trios, y full */
        let parejas = 0;
        let trios = 0;
        let poker = 0;
        for (let j = 0; j < 13; j++) {
            switch (rep_y[j]) {
                case 2:
                    parejas++;
                    break;
                case 3:
                    trios++;
                    break;
                case 4:
                    poker++;
                    break;
            }
        }
        /* Pasar limpio saber si es escalera color */
        let esc_color = saber_esc_color(cont);

        arr_jugadores[i] = [parejas, trios, poker, i, esc_real, carta_alta, color, escalera, esc_color];
    }
}

function limpiar_matriz(matriz) {
    for (let j = 0; j < 4; j++) {
        matriz[j] = [];
        for (let h = 0; h < 13; h++) {
            matriz[j][h] = 0;
        }
    }
}

function saber_esc_color(arr) {
    let esc_color = false;
    arr.forEach(element => {
        if (element) {
            esc_color = true;
        }
    })
    return esc_color;
}

function saber_escalera(rep_y) {
    let escalera = false;
    let seguidos = 0;
    for (let j = 0; j < 13; j++) {
        if (rep_y[j] == 1) {
            seguidos++;
            if (seguidos == 5) {
                escalera = true;
            }
        } else {
            seguidos = 0;
        }
    }
    return escalera;
}

function saber_ganador() {
    var ganador = [null, -1, 0];
    var empate = false;
    arr_jugadores.forEach(jugador => {
        let puntos = 0;
        /* Si es pareja, le damos valor de 2 */
        /* Si es doble pareja, le damos valor de 3 */
        switch (jugador[0]) {
            case 1:
                puntos = 2;
                break;
            case 2:
            case 3:
                puntos = 3;
                break;
        }
        /* Si es trio, le damos valor de 4 */
        if (jugador[1] != 0) {
            puntos = 4
        }
        /* Si es escalera, le damos valor de 5 */
        if (jugador[7] == true) {
            puntos = 5;
        }
        /* Si es color, le damos valor de 6 */
        if (jugador[6] == true) {
            puntos = 6;
        }
        /* Si es un full, le damos valor de 7 */
        if ((jugador[0] == 1 || jugador[0] == 2) && jugador[1] != 0) {
            puntos = 7;
        }
        /* Si es poker, le damos valor de 8 */
        if (jugador[2] == 1) {
            puntos = 8;
        }
        /* Si es escalera de color, le damos valor de 9 */
        if (jugador[8] == true) {
            puntos = 9;
        }
        /* Si es escalera real, le damos valor de 10 */
        if (jugador[4] == true && jugador[8] == true) {
            puntos = 10;
        }
        /* Comprobamos ganador y si hay empate miramos carta alta */
        if (ganador[1] < puntos) {
            ganador[0] = jugador;
            ganador[1] = puntos;
            ganador[2] = jugador[5];
            empate = false;
        } else if (ganador[1] == puntos) {
            if (ganador[2] < jugador[5] || (jugador[5] == 1 && ganador[2] != 1)) {
                ganador[0] = jugador;
                ganador[1] = puntos;
                ganador[2] = jugador[5];
                empate = false;
            } else if (ganador[2] == jugador[5]) {
                empate = true;
            }
        }
    });
    if (empate == true) {
        alert("Hay un empate");
    } else {
        alert("El ganador es el jugador " + Number(ganador[0][3] + 1));
    }
}