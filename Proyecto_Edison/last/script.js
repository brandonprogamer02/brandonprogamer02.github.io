//  VARIABLES DEL CLIENTE
var fullName;
var telefono;
var alojamiento;
var habitacion;
var cedula;
var id;
var costoPorDias = 1500;
// PRESUPUESTO DE LA EMPRESA
var presupuesto = 0  ; 

// TODOS LO CLIENTES 
var clientDataAll = JSON.parse(localStorage.getItem('clientData')) || [];

// MOSTRAR EN PANTALLA LOS CLIENTES
showClient();
// MOSTRAR PRESUPUESTO EN PANTALLA
showPresupuesto();


// BUSCAR CLIENTES
function buscarClientes() {
    const cliente = document.getElementById('buscarCliente').value.toLowerCase();
    const regex = new RegExp(`^${cliente}`, 'i');
    const clientesResult = clientDataAll.filter((e, i) => regex.test(e.nombre));
    document.getElementById('bodyDeTablaResult').innerHTML =
        `  
        <thead>
        <tr>
            <th scope="col">nombre</th>
            <th scope="col">cedula</th>
            <th scope="col">alojamientos</th>
            <th scope="col">habitacion</th>
            <th scope="col">precio</th>
        </tr>
    </thead>
    <tbody >
        `   +
        clientesResult.map((cliente, index) => {
            return (
                ` <tr>
            <td> ${cliente.nombre}</td>
            <td>${cliente.cedula}</td>
            <td>${cliente.alojamiento}</td>
            <td>${cliente.habitacion}</td>
            <td>$${cliente.acomulado}</td>
            <td>
            </td>
        </tr> 
        `+
                '</tbody>'
            );
        });
};

// AGREGANDO CLIENTES
function addingClient(fullName, telefono, alojamiento, habitacion, cedula, costoPorDias) {
    if (fullName, telefono, alojamiento, habitacion, cedula) {
        var validateHabitacion = clientDataAll.find((e, i) => e.habitacion === habitacion);
        const validateCedula = clientDataAll.find((e, i) => e.cedula === cedula);
        if (validateHabitacion || validateCedula) {
            validateCedula && alert('la cedula que inserto ya esta registrada');
            validateHabitacion && alert('la habitacion que eligio no esta disponible');
        } else {
            const clientData = {
                id: id,
                nombre: fullName,
                cedula: cedula,
                telefono: telefono,
                alojamiento: alojamiento,
                habitacion: habitacion,
                acomulado: costoPorDias * alojamiento,
            };
            const addDataFull = [...clientDataAll, clientData];
            localStorage.setItem('clientData', JSON.stringify(addDataFull));
            clientDataAll = JSON.parse(localStorage.getItem('clientData'));
            showClient();
            document.getElementById('nombre').value = '';
            document.getElementById('telefono').value = Number;
            document.getElementById('alojamiento').value = 1;
            document.getElementById('habitacion').value = 1;
            document.getElementById('cedula').value = Number;
        };
    } else {
        alert('por favor llenar los campos restantes');
    };
};
// FUNCION PARA DEFINIR SI SE QUIERE AGREGAR USUARIO O EDITAR USUARIO
function addClient() {
    fullName = document.getElementById('nombre').value;
    telefono = document.getElementById('telefono').value;
    alojamiento = document.getElementById('alojamiento').value;
    habitacion = document.getElementById('habitacion').value;
    cedula = document.getElementById('cedula').value;
    id = new Date().getTime();
    const botonDeCrear = document.getElementById('botonDeCrear');
    costoPorDias = 1500;

    if (botonDeCrear.innerHTML === 'editar usuario') {
        saveEdit(fullName, telefono, alojamiento, habitacion, cedula, costoPorDias);
    } else {
        addingClient(fullName, telefono, alojamiento, habitacion, cedula, costoPorDias);
    };
};

/* FUNCION PARA QUE DEFINIR QUE EL ADMIN QUIERE EDITAR UN CLIENTE POR DEFAULT ESTA 
DEFINIDO PARA AGREGAR CLIENTE */
function editClient(cedula) {
    const userDatatype = clientDataAll.filter((e, i) => e.cedula == cedula);
    const userData = userDatatype[0];
    document.getElementById('nombre').value = userData.nombre;
    document.getElementById('telefono').value = userData.telefono;
    document.getElementById('alojamiento').value = userData.alojamiento;
    document.getElementById('habitacion').value = userData.habitacion;
    document.getElementById('cedula').value = userData.cedula;
    localStorage.setItem('id', userData.id);
    const botonDeCrear = document.getElementById('botonDeCrear');
    botonDeCrear.innerHTML = 'editar usuario';
};

// FUNCION PARA GUARDAR LO EDITADO
function saveEdit(fullName, telefono, alojamiento, habitacion, cedula, costoPorDias) {
    const clientData = {
        id: JSON.parse(localStorage.getItem('id')),
        nombre: fullName,
        cedula: cedula,
        telefono: telefono,
        alojamiento: alojamiento,
        habitacion: habitacion,
        acomulado: alojamiento * costoPorDias,
    };

    const validateHabitacion = clientDataAll.find((e, i) => e.habitacion === clientData.habitacion);
    const validateCedula = clientDataAll.find((e, i) => e.cedula === clientData.cedula);

    for (let i = 0; i < clientDataAll.length; i++) {
        if (clientData.id == clientDataAll[i].id) {
            if (!validateHabitacion || clientDataAll[i].habitacion === clientData.habitacion) {
                if (clientDataAll[i].cedula == clientData.cedula || !validateCedula) {
                    clientDataAll[i].nombre = clientData.nombre, clientDataAll[i].cedula = clientData.cedula,
                        clientDataAll[i].alojamiento = clientData.alojamiento, clientDataAll[i].habitacion = clientData.habitacion
                    clientDataAll[i].acomulado = alojamiento * costoPorDias;
                    localStorage.setItem('clientData', JSON.stringify(clientDataAll));
                    showClient();
                    document.getElementById('nombre').value = '';
                    document.getElementById('telefono').value = Number;
                    document.getElementById('alojamiento').value = 1;
                    document.getElementById('habitacion').value = 1;
                    document.getElementById('cedula').value = Number;
                } else {
                    alert('la cedula que inserto ya esta registrada');
                };
            } else {
                alert('la habitacion que eligio no esta disponible');
            };
        };
    };
};

//ELIMINAR CLIENTE
function deleteClient(index) {
    if (window.confirm('quieres eliminar este cliente?')) {
        let filterClient = clientDataAll.filter((e, i) => {
            return index !== i;
        });
        localStorage.setItem('clientData', JSON.stringify(filterClient));
        clientDataAll = JSON.parse(localStorage.getItem('clientData'));
        showClient();
    } else return null;
};


//FUNCION FACTURAR 
function facture( index) {
    if (confirm("Cobrar al cliente")) {
        for (let i = 0; i < clientDataAll.length; i++) {
            if ( clientDataAll[index] === clientDataAll[i] ) {
                presupuesto = presupuesto + clientDataAll[i].acomulado;  
                clientDataAll[i].acomulado = 'PAGADO';

            };
        };
        localStorage.setItem('presupuesto', JSON.stringify(presupuesto));
        localStorage.setItem('clientData', JSON.stringify(clientDataAll));
        clientDataAll = JSON.parse(localStorage.getItem('clientData'));
        showPresupuesto();
        showClient();
    };
};

//FUNCION PARA MOSTRAR PRESUPUESTO
function showPresupuesto(){
    presupuesto = JSON.parse(localStorage.getItem('presupuesto')) || 0 ;
   const p =  document.getElementById('presupuesto')  ; 
   p.innerHTML  = `El presupuesto de la empresa es <strong class='text-danger'> ${presupuesto} </strong>`;
};

// FUNCTION PARA MOSTRAR CLIENTES EN PANTALLA
function showClient() {
    const bodyTable = document.getElementById('bodyDeTabla');
    bodyTable.innerHTML = clientDataAll.map((cliente, index) => {
        return (
            ` <tr>
            <td> <p class='mb-0 text-truncate'>  ${cliente.nombre} </p></td>
            <td>${cliente.cedula}</td>
            <td>${cliente.alojamiento == 1 ? cliente.alojamiento + ' dia' : cliente.alojamiento + ' dias'} </td>
            <td>${cliente.habitacion}</td>
            <td>${cliente.acomulado == 'PAGADO' ? cliente.acomulado : '$'+cliente.acomulado}</td>
            <td class='d-flex'>
                <button class="btn btn-secondary mr-1" onclick="editClient(${cliente.cedula})"> editar</button>
                <button class="btn btn-secondary mr-1"  onclick="deleteClient(${index})"> eliminar</button>
                <button class=${ cliente.acomulado === 'PAGADO' ? 'd-none' : "btn-success "  } onclick="facture(${index})"> Facturar</button>
            </td>
        </tr> `
        );
    });

};