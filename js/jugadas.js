'use strict'

function saber_ganador() {
    var arr = arrGlo.comprobante;
    var matriz = [
        []
    ];
    var jugadores = [],
        rep_x = [],
        rep_y = [];
    var cont_0, cont_1, cont_2, cont_3;
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
        /* ----- */
        for (let j = 0; j < 4; j++) {
            matriz[j] = [];
            for (let h = 0; h < 13; h++) {
                matriz[j][h] = 0;
            }
        }
        /* ----- */
        cartas_jugador[i].forEach(element => {
            var x = Number(element.imagen.substr(0, 0));
            var y = Number(element.imagen.substr(1));
            matriz[x][y] = 1;
        });
        console.log(matriz);
    }
}