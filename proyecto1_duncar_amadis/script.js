// variables globales

const guardar = document.querySelector('#guardar');
const imprimir = document.querySelector('#boton-imprimir-info');
let lima = '2';
let cedula;
let correo;
let escuela;
let foto;
let descripcionEquipo;
let nombre;
let apellido;
let fechaNac;
let foto2x2;
let sexo;
let MAESTROS = JSON.parse(localStorage.getItem('maestros')) || localStorage.setItem('maestros', '[]');

//--EVENTS LISTENERS-----------------------------------------------------------------------------------------

// evento al cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
    drawTableDataLocalStorage();
    addColorEventRows();
});

// evento click guardar maestro
guardar.addEventListener('click', async () => {
    cedula = document.getElementById('cedula').value;

    // validaciones de cedula
    if (cedula.trim() === '') { // validacion para cuando la deja vacia
        alert('no puedes introducir una cedula vacia')
        return;
    }

    let f = await getData(cedula);

    if (f.ok == false) // validacion para cuando la cedula es invalida
    {
        alert('cedula invalida');
        return;
    }
    const { Nombres, Apellido1, Apellido2, FechaNacimiento, foto, IdSexo } = f;

    correo = document.getElementById('correo').value;
    escuela = document.getElementById('escuela').value;
    fotoEquipo = document.getElementById('cargar-imagen').value;
    descripcionEquipo = document.getElementById('descripcion-equipo').value;

    const maestro = {
        cedula: cedula,
        nombre: Nombres,
        apellido: `${Apellido1} ${Apellido2}`,
        fechaNacimiento: FechaNacimiento,
        foto2x2: foto,
        sexo: IdSexo,
        correo: correo,
        decripcion: descripcionEquipo,
        foto: fotoEquipo,
        escuela: escuela,
        seleccionado: false
    };
    console.log('this is the teacher object');
    console.log(maestro)

    addLocalStorage(maestro);
    drawTableDataLocalStorage();

});


imprimir.addEventListener('click', () => {

    let f = Array.from(document.querySelectorAll('table tr')).filter((value, indice) => indice != 0);

    // eliminamos el primer elemento que nos devuelve
    let posicionEnQueTaElElemento = null;
    // con este bucle obtenemos el indice del elemento seleccionado
    f.forEach((valor, indice) => {
        if (valor.style.background == "cornflowerblue") {
            posicionEnQueTaElElemento = indice;
            //console.log('el indice dentro de la function es ' + indice);
            return;
        }
    });

    // validacion de elemento seleccionado
    if (posicionEnQueTaElElemento == null) {
        alert('DEBES SELECCIONAR UN MAESTRO PARA IMPRIMIR SUS DATOS');
        return;
    }

    // obtenemos el objeto del local storage con el indice que encontramos
    let objetoDataSeleccionado = MAESTROS[posicionEnQueTaElElemento];

    console.log(objetoDataSeleccionado);

    //quitar estilo de seleccionado a todos los elementos
    f.forEach((valor, indice) => {
        valor.style = "";
    });

    console.log(posicionEnQueTaElElemento);
    console.log(MAESTROS);
    // esto es pa que se le quite seleccionado a todos los objetos del local storage
    MAESTROS.forEach(element => {
        element.seleccionado = false;
    });
    MAESTROS[posicionEnQueTaElElemento].seleccionado = true;

    localStorage.setItem('maestros', JSON.stringify(MAESTROS));
    abrirNuevoTab('imprimir.html');

});

//--FUNCTIONS----------------------------------------------------------------------------------------------------


function abrirNuevoTab(url) {
    // Abrir nuevo tab
    let win = window.open(url, '_blank');
    // Cambiar el foco al nuevo tab (punto opcional)
    win.focus();
}

const getData = async (cedula) => {
    let url = `https://api.adamix.net/apec/cedula/${cedula}`;
    let res = await fetch(url);
    let json = await res.json();
    return json;
}


function addLocalStorage(objeto) {
    try {
        MAESTROS.push(objeto);

    } catch (TypeError) {
        // capturamos error de cuando es el primer elemento del local storage
        MAESTROS = new Array();
        MAESTROS.push(objeto);
    }
    localStorage.setItem('maestros', JSON.stringify(MAESTROS));


}

function drawTableDataLocalStorage() {
    if (MAESTROS != undefined) {// condicion para la primera vez que se cree el array en local storage

        let html = `<thead>
        <th scope="col">Maestros </th>
    </thead>`;
        MAESTROS.forEach(element => {
            //en cada vuelta de bucle del array MAESTROS le agregamos una table row con el nombre de los profesores
            html +=
                `<tr>
        <td><span>${element.nombre}</span></td>
        </tr>`
        });
        //a la tabla le agregamos el string de los elemnentos html
        document.querySelector('table').innerHTML = html;
        document.querySelector('table').children;
        addColorEventRows(); // evento para que se le anada el evento de color al nuevo elemento 
    }
}

function eliminarReporte(id) {

    const data = MAESTROS.filter((r, i) => r.id != id);
    MAESTROS = MAESTROS.concat(reporte);

    localStorage.setItem('reportes', JSON.stringify(MAESTROS));
    showData();

}

function addColorEventRows() {

    let registros = document.querySelectorAll('tr');
    Array.from(registros).forEach((i, x) => {

        if (x == 0) { // condicional para que no seleccione el primer elemento que es el titulo
            return;
        };
        i.addEventListener('click', () => {

            // antes de poner el color al seleccionado, se le quita el color a todos los registros
            for (let ix of registros) {
                ix.style = "";
            }
            // y luego se pone
            //console.log(i.children[0].textContent);
            i.style.background = "cornflowerblue";
            i.style.color = "white";

        });

    });
}