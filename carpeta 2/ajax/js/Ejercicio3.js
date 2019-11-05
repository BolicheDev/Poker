var csw2 = {};
var datosP = { dni: "", apellidos1: "", apellidos2: "", nombre: "", edad: "" };
var notas = { dawec: "", diw: "", daw: "", dawes: "", EIE: "", dniAlumno: "" };
var conexion, indice, almacen;
var arrayAlumno = [];
var arrayNotas = [];
var miArrayIndice = ["dawec", "diw", "daw", "dawes", "EIE"];

function crearBaseDatos() {

    csw2.indexedDB = window.indexedDB;
    csw2.IDBKeyRange = window.IDBKeyRange;
    csw2.IDBKeyTransaction = window.IDBKeyTransaction;

    conexion = csw2.indexedDB.open("CSW2");
    conexion.onupgradeneeded = function(e) {

        var datos = e.currentTarget.result.createObjectStore("datosp", { keyPath: "dni" });
        //datos.createIndex("dDatos", "dni", {unique: true });
        var notas = e.currentTarget.result.createObjectStore("notas", { KeyPath: "clave", autoIncrement: true });
        notas.createIndex("dNotas", "dniAlumno", { unique: true });
    };

}

//window.onload es para que se ejecute antes el html que el js
window.onload = iniciar;

function iniciar() {
    crearBaseDatos();
    document.getElementById("contenido").style.visibility = "hidden";
    document.getElementById("Altas").addEventListener("click", darDeAlta);
    document.getElementById("contenidoAs").style.visibility = "hidden";
    document.getElementById("Listados").addEventListener("click", mostrarListado);
    document.getElementById("guardar").addEventListener("click", guardarDatosAlumno);
}

function leerDNI() {
    conexion.onsuccess = function(e) {
        e.currentTarget.result.transaction("datosp", "readwrite").objectStore("datosp").index("dDatos").get("dni");
    }
}

function guardarDatosAlumno() {

    conexion = csw2.indexedDB.open("CSW2");
    var nombreHtml = document.getElementById("nombre").value;
    var dniHtml = document.getElementById("dni").value;
    var apellido1Html = document.getElementById("apellido1").value;
    var apellido2Html = document.getElementById("apellido2").value;
    var edadHtml = document.getElementById("edad").value;

    var diwHtml = parseInt(document.getElementById("diw").value);
    var dawHtml = parseInt(document.getElementById("daw").value);
    var dawesHtml = parseInt(document.getElementById("dawes").value);
    var dawecHtml = parseInt(document.getElementById("dawec").value);
    var eieHtml = parseInt(document.getElementById("eie").value);
    if (dniHtml != "") {
        notas = { dawec: dawecHtml, diw: diwHtml, daw: dawHtml, dawes: dawesHtml, EIE: eieHtml, dniAlumno: dniHtml };
        datosP = { dni: dniHtml, apellidos1: apellido1Html, apellidos2: apellido2Html, nombre: nombreHtml, edad: edadHtml };

        conexion.onsuccess = function(e) {
            e.currentTarget.result.transaction("datosp", "readwrite").objectStore("datosp").put(datosP);
            e.currentTarget.result.transaction("notas", "readwrite").objectStore("notas").put(notas);
            diwHtml = document.getElementById("diw").value = "";
            dawHtml = document.getElementById("daw").value = "";
            dawesHtml = document.getElementById("dawes").value = "";
            dawecHtml = document.getElementById("dawec").value = "";
            eieHtml = document.getElementById("eie").value = "";
            nombreHtml = document.getElementById("nombre").value = "";
            dniHtml = document.getElementById("dni").value = "";
            apellido1Html = document.getElementById("apellido1").value = "";
            apellido2Html = document.getElementById("apellido2").value = "";
            edadHtml = document.getElementById("edad").value = "";
        };
    } else {
        alert("Debes introducir los datos");
    }
}
/*
function cargarAlumno(){
    conexion = csw2.indexedDB.open("CSW2");
    conexion.onsuccess=function(e){
        var guardarTransaccion = e.currentTarget.result.transaction("datosp","readonly");
        var almacen = guardarTransaccion.objectStore("datosp");
        var indice = almacen.index("dDatos");
        arrayAlumno=[];
        indice.openCursor().onsuccess = function(e){
            var continuador = e.target.result;
            
            if(continuador){
                arrayAlumno.push(continuador.value);
                continuador.continue();
                
            }
            
        }
        
    }    
}
*/

function cargarNotas() {


    conexion = csw2.indexedDB.open("CSW2");
    conexion.onsuccess = function(e) {

        var guardarTransaccion2 = e.currentTarget.result.transaction(["notas"], "readonly");
        var almacen2 = guardarTransaccion2.objectStore("notas");
        var indice2 = almacen2.index("dNotas");
        indice2.openCursor().onsuccess = function(e) {
            var continuador2 = e.target.result; //Puntero que lee registro por registro.

            if (continuador2) {
                for (var i = 0; i < miArrayIndice.length; i++) {
                    var asignatura = miArrayIndice[i];

                    //console.log(continuador2.value[asignatura]);
                    //console.log(asignatura+"1");
                    if (continuador2.value[asignatura] < 5) {
                        //console.log(asignatura+"1");

                        valor = sacarDatosDeSuspensos(asignatura);
                        document.getElementById(asignatura + "1").innerHTML = document.getElementById(asignatura + "1").innerHTML + (ev1.currentTarget.result.nombre + " suspenso " + asignatura + " " + continuador2.value.dniAlumno);
                        console.log("iterador2" + asignatura);
                    } else {
                        //console.log("aprobado");
                    }

                }
                continuador2.continue(); //Esto es lo que dice que siga leyendo los demás registros. 
            }
        }
    }
}

function sacarDatosDeSuspensos(as) {
    conexion1 = csw2.indexedDB.open("CSW2");

    conexion1.onsuccess = function(ev) {

        ev.currentTarget.result.transaction("datosp", "readwrite").objectStore("datosp").get(continuador2.value.dniAlumno).onsuccess = function(ev1) {
            //alert(ev1.currentTarget.result.nombre); 
            /*document.getElementById("diw1").innerHTML=document.getElementById("diw1").innerHTML+(ev1.currentTarget.result.nombre+" suspenso "+asignatura+" "+continuador2.value.dniAlumno);*/
            return ev1.currentTarget.result.nombre;
            console.log("iterador2" + as);
        }
        console.log("iterador1" + asignatura);
    }
}

function darDeAlta() {
    document.getElementById("contenido").style.visibility = "visible";
    document.getElementById("contenidoAs").style.visibility = "hidden";
}

function mostrarListado() {
    document.getElementById("contenidoAs").style.visibility = "visible";
    document.getElementById("contenido").style.visibility = "hidden";

    //cargarAlumno();
    cargarNotas();

}