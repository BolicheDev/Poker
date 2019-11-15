'use strict'

var arr_jugadores = [];

function activar_jugada() {
    var arr = arrGlo.comprobante;
    var matriz = [
        []
    ];
    /*var matriz_aux = [
        []
    ];*/
    var rep_x = [],
        rep_y = [],
        cont = [];
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
        /* Limpiamos la matriz */
        for (let j = 0; j < 4; j++) {
            matriz[j] = [];
            //matriz_aux[j] = [];
            for (let h = 0; h < 13; h++) {
                matriz[j][h] = 0;
                //matriz_aux[j][h] = 0;
            }
        }
        /* Meter elementos en la matriz */
        cartas_jugador[i].forEach(element => {
            matriz[element.palo][element.numero] = 1;
            //matriz_aux[element.palo][element.numero] = Number(element.palo + 1);
        });
        mesa.forEach(element => {
            matriz[element.palo][element.numero] = 1;
            //matriz_aux[element.palo][element.numero] = Number(element.valor + 1);
        });
        /* Meter cartas para saber, pareja, trio, doble pareja, poker, o full */
        for (let j = 0; j < 13; j++) {
            if (matriz[0][j] == 1 || matriz[1][j] == 1 || matriz[2][j] == 1 || matriz[3][j] == 1) {
                rep_y[j] = Number(matriz[0][j] + matriz[1][j] + matriz[2][j] + matriz[3][j]);
            } else {
                rep_y[j] = 0;
            }
        }
        /* Para saber si es escalera normal */
        let esc_real = false;
        for (let j = 0; j < 4; j++) {
            rep_x[j] = 0;
            for (let h = 0; h < 13; h++) {
                if (matriz[j][h] == 1) {
                    rep_x[j] += 1;
                }
            }
            if (matriz[j].lastIndexOf(1) - matriz[j].indexOf(1) >= 4 && matriz[j].lastIndexOf(1) - matriz[j].indexOf(1) <= 6 && rep_x[j] >= 5) {
                cont[j] = true;
            } else if (matriz[j].lastIndexOf(1) - matriz[j].indexOf(1) == 12 && rep_x[j] >= 5) {
                cont[j] = true;
                esc_real = true;
            } else {
                cont[j] = false;
            }
        }
        let parejas = 0;
        let trios = 0;
        let full = 0;
        for (let j = 0; j < 13; j++) {
            switch (rep_y[j]) {
                case 2:
                    parejas++;
                    break;
                case 3:
                    trios++;
                    break;
                case 4:
                    full++;
                    break;
            }
        }
        arr_jugadores[i] = [parejas, trios, full, i];
    }
}

function saber_ganador() {
    var ganador = [null, 0];
    var puntos = 0;
    arr_jugadores.forEach(jugador => {
        switch (jugador[0]) {
            case 1:
                puntos = 2;
                break;
            case 2:
                puntos = 3;
                break;
        }
        if (jugador[1] != 0) {
            puntos = 4
        }
        if ((jugador[0] == 2 || jugador[0] == 3) && jugador[1] != 0) {
            puntos = 7;
        }
        if (jugador[2] == 1) {
            puntos = 8;
        }
        if (ganador[1] < puntos) {
            ganador[0] = jugador;
            ganador[1] = puntos;
        }
    });
    console.log("El ganador es el jugador " + Number(ganador[0][3] + 1));
}

/*function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}*/