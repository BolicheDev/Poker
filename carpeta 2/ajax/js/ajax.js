$(function() {

    $("#mostrarPaises").click(muestraPais);

});

function muestraPais() {
    $.ajax({
        url: 'php/compra.php',
        type: 'GET',
        dataType: 'json',
        success: function(resultado) {
            alert(resultado);
            console.log(resultado);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("error " + jqXHR.status + " " + errorThrown);
        }
    });
}