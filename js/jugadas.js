'use strict'

function saber_ganador() {
    var arr = arrGlo.comprobante;
    var matriz = [
        []
    ];
    /*var matriz_aux = [
        []
    ];*/
    var jugadores = [],
        rep_x = [],
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

    for (let i = 0; i < 1; i++) {
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
        for (let j = 0; j < 4; j++) {
            rep_x[j] = 0;
            for (let h = 0; h < 13; h++) {
                if (matriz[j][h] == 1) {
                    rep_x[j] += 1;
                }
            }
            if (matriz[j].lastIndexOf(1) - matriz[j].indexOf(1) == 4) {
                cont[j] = true;
            } else if (matriz[j].lastIndexOf(1) - matriz[j].indexOf(1) == 12) {
                cont[j] = true;
            } else {
                cont[j] = false;
            }
        }

    }
}

/*function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}*/