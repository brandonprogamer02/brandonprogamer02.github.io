//=====================================================================================================================
// HOTEL: ESTRUCTURA DE DATOS 
// Contiene los datos referentes a la administrsacion del hotel 
//=====================================================================================================================

// Matriz que simula una clase de tipo Cliente.
var matriz_clientes = []; 

// Matriz (6x5) que simulauna clase de tipo Habitaciones.
// los campos de la matriz son; numero de habitacion, estado, cliente asignado, tipo de habitacion y precio por noche.
var matriz_habitaciones = [[1, "LIBRE", "NONE", "NORMAL", 1000],
                           [2, "LIBRE", "NONE", "NORMAL", 1000], 
                           [3, "LIBRE", "NONE", "NORMAL", 1000],
                           [4, "LIBRE", "NONE", "DOBLE", 1500], 
                           [5, "LIBRE", "NONE", "SUITE", 3000]]; 

// Matriz que simula una clase de tipo Hotel
var matriz_hotel = [matriz_habitaciones, matriz_clientes]; 

// Almacena el balance general del hotel
var balance_general = 0; 

// Almacena los clientes que no han sido favturados
var deudores = []; // Almacena los clientes que no han sido favturados


//=====================================================================================================================
// FUNCIONES
//=====================================================================================================================

function existe_cliente(cedula, matriz_clientes){

    // Retorna true si existe un cliente con la cedula que se le pasa como parametro a la funcion
    for (var i = 0; i < matriz_clientes.length; i++){
        if (cedula == matriz_clientes[i][1]){
            return true;
        }
    }
    return false;
}


function habitacion_libre(num_habitacion, matriz_habitaciones){

    // Comprueba si una habitacion determinada esta libre u ocupada
    if (matriz_habitaciones[num_habitacion-1][1] == "LIBRE"){
        return true;
    }
    return false;
}


function nuevo_cliente(nombre, cedula, telefono, dias_alojamiento, num_habitacion, matriz_clientes, matriz_habitaciones){

    const fullName = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const alojamiento = document.getElementById('alojamiento').value;
    const habitacion = document.getElementById('habitacion').value;
    const cedula = document.getElementById('cedula').value;
    /* Simula un objeto de la clase cliente:
       Si no existe el cliente, crea un nuevo vector con los datos suministraos del cliente y lo
       guarda en la matriz de clientes
    */
    // determinamos la deuda de lcliente
    var balance = dias_alojamiento * matriz_habitaciones[num_habitacion-1][4];

    // asigna una habitacion libre a un cliente
    if(!existe_cliente(cedula, matriz_clientes) && habitacion_libre(num_habitacion, matriz_habitaciones)){
        matriz_clientes.push(new Array (nombre = fullName, cedula , telefono, dias_alojamiento = alojamiento ? alojamiento : 0 , num_habitacion = habitacion, "PENDIENTE", balance ));
        matriz_habitaciones[num_habitacion-1][1] = "OCUPADO";
        matriz_habitaciones[num_habitacion-1][2] = nombre;

    } else if(existe_cliente(cedula, matriz_clientes)){
        alert("Ya existe un cliente con cedula: "+cedula);
      
    } else if(!habitacion_libre(num_habitacion, matriz_habitaciones) || num_habitacion > 5){
        alert("La habitacion numero "+num_habitacion+" esta ocupada o no existe");
    }
}


function buscar_cliente(cedula, matriz_clientes){

    // busca un cliente por su cedula en la matriz de clientes
    for (let i = 0; i < matriz_clientes.length; i++){
        if (matriz_clientes[i][1] == cedula){
            return matriz_clientes[i];

        } else {
            return alert("El cliente con cedula "+cedula+" no existe");
        }
    }
}


function menu_edicion(){

    // Despliega el menu de educion en un prompt
    opcion = parseInt(prompt("**MENU PRINCIPAL** \n \
    1)Editar nombre de usuario \n 2)Editar telefono \n \
    3)Editar dias de alojamiento \n \n Elija una opcion: "));

    return opcion;
}


function editar_cliente(opcion, cedula, matriz_clientes, matriz_habitaciones){

    // Permite editar los campos nombre, telefono, dias de alojamiento
    if (existe_cliente(cedula, matriz_clientes)){
        
        switch(opcion){
            
            case 1:
                nombre = prompt("Introduzca el nuevo nombre: ")
                for (let i = 0; i < matriz_clientes.length; i++){
                    if (matriz_clientes[i][1] == cedula){
                        matriz_clientes[i][0] = nombre;
                    }
                }
                break;

            case 2:
                telefono = prompt("Introduzca el nuevo telefono: ")
                for (let i = 0; i < matriz_clientes.length; i++){
                    if (matriz_clientes[i][0] == cedula){
                        matriz_clientes[i][2] = telefono;
                    }
                }
                break;

            case 3:
                dias_alojamiento = prompt("Introduzca los dias de alojamiento: ")
                for (let i = 0; i < matriz_clientes.length; i++){
                    if (matriz_clientes[i][0] == cedula){
                        matriz_clientes[i][3] = telefono;
                    }
                }
                break;
        }
    } else {
        alert("El cliente introducido no existe")
    }
}


function estado_ocupacion(matriz_habitaciones){
    
    // Lista todas las habitaciones y el estado de ocupacion
    var count = 0
    for (let i = 0; i < matriz_habitaciones.length; i++){
        if(matriz_habitaciones[i][1] == "OCUPADO"){
            count ++;
        }
    }
    estado_ocupacion = (count/5)*100;
    return estado_ocupacion;
}


function listar_habitaciones(matriz_habitaciones){

    // Lista todas las habitaciones del hotel
    document.write("estado de habitaciones: <br>");
    for (let i = 0; i < matriz_habitaciones.length; i++){
        document.write("numero de habitacion: "+matriz_habitaciones[i][0]+"<br>");
        document.write("estado : "+matriz_habitaciones[i][1]+"<br>");
        document.write("cliente asignado: "+matriz_habitaciones[i][2]+"<br>");
        document.write("tipo: "+matriz_habitaciones[i][3]+"<br>");
        document.write("precio por noche: "+matriz_habitaciones[i][4]+"$<br>");
        document.write("<br>");
    }
}


function listar_clientes(matriz_clientes){

    // Lista los clientes del hotel
    document.write("estado de clientes: <br>");
    for (let i = 0; i < matriz_clientes.length; i++){
        document.write("nombre: "+matriz_clientes[i][0]+"<br>");
        document.write("cedula: "+matriz_clientes[i][1]+"<br>");
        document.write("telefono: "+matriz_clientes[i][2]+"<br>");
        document.write("dias de alojamiento: "+matriz_clientes[i][3]+"<br>");
        document.write("numero de habitacion: "+matriz_clientes[i][4]+"<br>");
        document.write("estado de pago: "+matriz_clientes[i][5]+"<br>");
        document.write("balance: -"+matriz_clientes[i][6]+"<br>");
    }
}


function facturar_cliente(cedula, matriz_clientes, matriz_habitaciones, balance_general){

    //Factura a un cliente cancelara su deuda y dejara libre la habitacion
    if (existe_cliente(cedula, matriz_clientes)){
        for (let i = 0; i < matriz_clientes.length; i++){
            if (matriz_clientes[i][1] == cedula){

                // Libera habitacion
                var numH = matriz_clientes[i][4];
                matriz_habitaciones[numH-1][1] = "LIBRE"
                matriz_habitaciones[numH-1][2] = "NONE"

                // cobra la deuda y actualiza el balance
                balance_general += matriz_clientes[i][6];
                matriz_clientes[i][5] = "PAGADO";
                matriz_clientes[i][4] = "NONE";
            }
        }

    } else {
        alert("El cliente introducido no existe");
    }
}


function eliminar_cilente(cedula){

    // Elimina a un cliente del registro del hotel, solo si el cliente ha pagado
    if (existe_cliente(cedula, matriz_clientes)){
        for (let i = 0; i < matriz_clientes.length; i++){
            if (matriz_clientes[i][1] == cedula){
                if(matriz_clientes[i][5] == "FACTURADO"){
                    matriz_clientes.splice(i, 1);
                } else {
                    alert("El cliente introducido no ha sido facturado");
                }
            }
        }

    } else {
        alert("El cliente introducido no existe");
    }
}


function obtener_cedula(nombre){

    // Devuelve la cedula de un cliente a partir de su nombre
    var cedula = 0;
    for (let i = 0; i < matriz_clientes.length; i++){
        if (matriz_clientes[i][0] == nombre){
            cedula = matriz_clientes[i][1];
        } else {
            alert("No existe cliente con nombre "+nombre);
        }
    }
    return cedula;
}



//=====================================================================================================================
// TEST
//=====================================================================================================================




/*
for (let i = 0; i < 2; i++){

    var nombre = prompt("nombre: ");
    var cedula = prompt("cedula: ");
    var telefono = prompt("telefono: ");
    var dias_alojamiento = parseInt(prompt("dias_alojamiento: "));
    var num_habitacion = parseInt(prompt("num_habitacion: "));

    nuevo_cliente(nombre, cedula, telefono, dias_alojamiento, num_habitacion, matriz_clientes, matriz_habitaciones)
}

document.write("estado de habitaciones: <br>")
for (let i = 0; i < matriz_habitaciones.length; i++){
    document.write("numero de habitacion: "+matriz_habitaciones[i][0]+"<br>")
    document.write("estado : "+matriz_habitaciones[i][1]+"<br>")
    document.write("cliente asignado: "+matriz_habitaciones[i][2]+"<br>")
    document.write("tipo: "+matriz_habitaciones[i][3]+"<br>")
    document.write("precio por noche: "+matriz_habitaciones[i][4]+"$<br>")
    document.write("<br>")
}
document.write("<br>")
document.write("estado de clientes: <br>")
for (let i = 0; i < matriz_clientes.length; i++){
    document.write("nombre: "+matriz_clientes[i][0]+"<br>")
    document.write("cedula: "+matriz_clientes[i][1]+"<br>")
    document.write("telefono: "+matriz_clientes[i][2]+"<br>")
    document.write("dias de alojamiento: "+matriz_clientes[i][3]+"<br>")
    document.write("numero de habitacion: "+matriz_clientes[i][4]+"<br>")
    document.write("estado de pago: "+matriz_clientes[i][5]+"<br>")
    document.write("balance: -"+matriz_clientes[i][6]+"<br>")
}
*/