<?php

$con = new mysqli("localhost", "root", "", "agendapersonal");

if ($con->connect_errno) {
    die('No se pudo conectar:' . mysql_error());
}

$query = "SELECT * FROM contactos";

if (!$result = $con->query($query)) {
    die('Consulta no válida: ' . mysql_error());
}

$con->close();

$arr = array();

while ($objeto = $result->fetch_assoc()) {
    $arr[] = $objeto;
}

if ($result->num_rows > 0) {
    print_r(json_encode($arr));
} else {
    print_r(json_encode(["No hay datos"]));
}
