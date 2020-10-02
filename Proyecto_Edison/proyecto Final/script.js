// function para buscar clientes
function buscarClientes() {

    /// obtengo el valor del input de buscar
    const cliente = document.getElementById('buscarCliente').value.toLowerCase();
    // obtengo todos los clientes
    const clientDataAll = JSON.parse(localStorage.getItem('clientData')) ? JSON.parse(localStorage.getItem('clientData')) : [];
    // expresion  para que la busquedad pueda hacerse con las iniciales de los nombres
    const regex = new RegExp(`^${cliente}`, 'i');
    /// hago el filter aqui y lo comparo con la expresion.
    const clientesResult = clientDataAll.filter((e, i) => regex.test(e.nombre));
    /// y aqui muestro el resultado de la busqueda
    document.getElementById('bodyDeTablaResult').innerHTML =
        ` 
        <thead>
        <tr>
            <th scope="col">nombre</th>
            <th scope="col">cedula</th>
            <th scope="col">alojamientos</th>
            <th scope="col">habitacion</th>
            <th scope="col">configuracion</th>
        </tr>
    </thead>
    <tbody >
          `  +
        clientesResult.map((cliente, index) => {
            return (
                `  <tr>
            <td> ${cliente.nombre}</td>
            <td>${cliente.cedula}</td>
            <td>${cliente.alojamiento}</td>
            <td>${cliente.habitacion}</td>
            <td>
            <button class="btn btn-secondary" onclick="editClient(${cliente.cedula})"> editar</button>
            </td>
        </tr> 
                </tbody> `
            );
        });
};

// function para agregar cliente
function addClient() {
    /// obteniendo valor de los input por id , guardadas en constantes , 
    const fullName = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const alojamiento = document.getElementById('alojamiento').value;
    const habitacion = document.getElementById('habitacion').value;
    const cedula = document.getElementById('cedula').value;
    const id = new Date().getTime();
    const botonDeCrear = document.getElementById('botonDeCrear');

    // Obteniendo los datos del localstorage , lo valido con una condicion;  si JSON.parse(localStorage.getItem('clientData')) existe es igual a JSON.parse(localStorage.getItem('clientData')) de lo contrario sera un array vacio.
    const clientDataAll = JSON.parse(localStorage.getItem('clientData')) ? JSON.parse(localStorage.getItem('clientData')) : [];
    // si el boton dice editar usuario , lllamara la funcion de guardar los editado
    if (botonDeCrear.innerHTML === 'editar usuario') {
        // llamando la funcion de guardar lo editado
        saveEdit(fullName, telefono, alojamiento, habitacion, cedula);

    } else {

        /// validando que los input contengan existan , o sea que tengan datos.
        if (fullName, telefono, alojamiento, habitacion, cedula) {

            /// comparando la habitacion que eligio el usuario con la que ya estan en uso. 
            var validateHabitacion = clientDataAll.find((e, i) => e.habitacion === habitacion);

            // !validateHabitacion 
            const validateCedula = clientDataAll.find((e, i) => e.cedula === cedula);
            // si existe  validateHabitacion... ? la habitacion no esta disponible de lo contrario si esta disponible,
            if (validateHabitacion || validateCedula) {
                validateCedula && alert('la cedula que inserto ya esta registrada');
                validateHabitacion && alert('la habitacion que eligio no esta disponible');
            } else {
                /// guardando los datos del usuario en un JSON. 
                const clientData = {
                    id: id,
                    nombre: fullName,
                    cedula: cedula,
                    telefono: telefono,
                    alojamiento: alojamiento,
                    habitacion: habitacion,
                };
                // aqui junto los datos obtenido previo con los demas que tengo en el localstorage (hago una concatenacion).
                const addDataFull = [...clientDataAll, clientData];
                // aqui los inserto en el localStorage.
                localStorage.setItem('clientData', JSON.stringify(addDataFull));
                alert('cliente agregado correctamente');
                location.reload(true);
            };
        } else {
            alert('por favor llenar los campos restantes');
        };
    };
};

// funcion para editar el usuario. 
function editClient(cedula) {
    // const clientDataAll = JSON.parse(localStorage.getItem('clientData')) ;
    const clientDataAll = JSON.parse(localStorage.getItem('clientData'));
    const userDatatype = clientDataAll.filter((e, i) => e.cedula == cedula);
    const userData = userDatatype[0];

    // devolviendo a los input los valores del cliente
    document.getElementById('nombre').value = userData.nombre;
    document.getElementById('telefono').value = userData.telefono;
    document.getElementById('alojamiento').value = userData.alojamiento;
    document.getElementById('habitacion').value = userData.habitacion;
    document.getElementById('cedula').value = userData.cedula;
    // guardando el ID  del cliente para obtenerlo en la function de saveEdit
    localStorage.setItem('id', userData.id);

    // obteniendo el boton de crear cliente 
    const botonDeCrear = document.getElementById('botonDeCrear');
    //dandole el valor de editar usuario
    botonDeCrear.innerHTML = 'editar usuario';
};

//function para guardar lo editado 
function saveEdit(fullName, telefono, alojamiento, habitacion, cedula) {

    /// los datos actualizados del cliente
    const clientData = {
        id: JSON.parse(localStorage.getItem('id')),
        nombre: fullName,
        cedula: cedula,
        telefono: telefono,
        alojamiento: alojamiento,
        habitacion: habitacion,
    };

    // obteniendo todos los clientes del localStorage
    const clientDataAll = JSON.parse(localStorage.getItem('clientData'));

    // verificando si la habitacion que escogio el cliente nuevamente esta disponible
    const validateHabitacion = clientDataAll.find((e, i) => e.habitacion === clientData.habitacion);

    for (let i = 0; i < clientDataAll.length; i++) {
        // buscando el dato del cliente que se desea editar
        if (clientData.id == clientDataAll[i].id) {
            // validando si la habitacion que escogio el cliente esta disponible o si encogio la misma.
            // si escogio la misma o una diferente que este disponible ? se actualizaran sus datos : de lo contrario no
            if (!validateHabitacion || clientDataAll[i].habitacion === clientData.habitacion) {
                // actualizando datos
                clientDataAll[i].nombre = clientData.nombre, clientDataAll[i].cedula = clientData.cedula,
                    clientDataAll[i].alojamiento = clientData.alojamiento, clientDataAll[i].habitacion = clientData.habitacion;
                // insertando los datos al localstorage
                localStorage.setItem('clientData', JSON.stringify(clientDataAll));
                //actualizando la pagina para mostrar los datos
                location.reload(true);
            } else {
                alert('la habitacion que eligio no esta disponible');
            };
        };
    };
};


// function para eliminar cliente, recibiendo el index(la posicion en la que se encuentra en el array) del cliente que desea eliminar. 
function deleteClient(index) {

    // aqui le pregunto que si realmente desea eliminar ell cliente
    if (window.confirm('quieres eliminar este cliente?')) {
        // aqui obtengo los datos de todos los cliente
        const clientDataAll = JSON.parse(localStorage.getItem('clientData')) ? JSON.parse(localStorage.getItem('clientData')) : [];

        // aqui uso el metodo filter...  y digo que me retorne todo los cliente con el index difere al del parametro que es el index del cliente que desean eliminar
        let filterClient = clientDataAll.filter((e, i) => {
            return index !== i;
            // return cliente.cedulacedula !== e.c;
        });
        // aqui inserto de nuevo a los clientes al localStorage
        localStorage.setItem('clientData', JSON.stringify(filterClient));
        // para recargar la pagina  y se actualizen los datos
        location.reload(true);
    } else return null;
};


/// obteniendo el body de la tabla de cliente
const bodyTable = document.getElementById('bodyDeTabla');
//obteniendo los datos del cliente y validandolo a la vez
const clientDataAll = JSON.parse(localStorage.getItem('clientData')) ? JSON.parse(localStorage.getItem('clientData')) : [];
/// mostrando datos en pantalla. 
bodyTable.innerHTML = clientDataAll.map((cliente, index) => {
    return (
        ` <tr>
        <td> ${cliente.nombre}</td>
        <td>${cliente.cedula}</td>
        <td>${cliente.alojamiento}</td>
        <td>${cliente.habitacion}</td>
        <td>
            <button class="btn btn-secondary" onclick="editClient(${cliente.cedula})"> editar</button>
            <button class="btn btn-secondary"  onclick="deleteClient(${index})"> eliminar</button>
        </td>
    </tr> `
    );
});


