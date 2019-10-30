'use strict'

var arrGlo = {
    "nombre": "",
    "contraseña": "",
    "contraseñaRep": "",
    "imagen": "",
    "miBd": {},
}

arrGlo.miBd.indexedDB = window.indexedDB;
arrGlo.miBd.IDBKeyRange = window.IDBKeyRange;
arrGlo.miBd.IDBKeyTransaction = window.IDBKeyTransaction;

var conexion;

window.onload = iniciar;

function iniciar() {
    document.getElementById("botonCrear").addEventListener("click", crearUsuario);
    document.getElementById("fichero").addEventListener("change", guardar_foto);
    crear_base_datos();
}

function crearUsuario() {
    var fallo = document.getElementById("fallo");
    var texto = "";

    var nombre = document.getElementById("usuarioInput").value;
    var contraseña = document.getElementById("password1").value;
    var contraseñaRep = document.getElementById("password2").value;
    if (contraseña == contraseñaRep) {
        if (contraseña.length >= 4 && nombre.length >= 4) {
            if (arrGlo.imagen != null) {
                var obj = { "Nombre": nombre, "contraseña": contraseña, "imagen": arrGlo.imagen };
                añadir(obj);
                texto += "<h1> Usuario creado correctamente </h1>";
            } else {
                texto += "<h1> Tienes que añadir una imagen </h1>";
            }
        } else {
            texto += "<h1> Tiene que tener minimo 4 caracteres la contraseña y el nombre </h1>";
        }
    } else {
        texto += "<h1> Contraseñas no coinciden </h1>";
    }
    fallo.innerHTML = texto;
}

function crear_base_datos() {
    conexion = arrGlo.miBd.indexedDB.open("CSW2");

    conexion.onupgradeneeded = function() {
        var almacen_Usuario =
            this.result.createObjectStore("Usuarios", { keyPath: "id_Usuario", autoIncrement: true });
        var almacen_Contactos =
            this.result.createObjectStore("Contactos", { keyPath: "id_Contactos", autoIncrement: true });
    };
}

function añadir(obj) {
    conexion = arrGlo.miBd.indexedDB.open("CSW2");

    conexion.onsuccess = function(e) {
        e.currentTarget.result.transaction("Usuarios", "readwrite").objectStore("Usuarios").add(obj);
    };
}

function guardar_foto() {
    var x = document.getElementById("fichero");

    var reader = new FileReader();
    reader.onload = function() {
        arrGlo.imagen = reader.result;
    };
    reader.readAsDataURL(x.files[0]);

}