// Event Listeners

// evento enter / agregar pensamiento a la lista 

document.addEventListener('keypress', evt => {
    if (evt.keyCode == 13) addDataLocalStorage();
});

// evento anadir pensamiento al local storage
document.querySelector('#respaldo input').addEventListener('click', addDataLocalStorage);

// evento cargar pensamientos 
document.addEventListener('DOMContentLoaded', () => { updateList(); });

// evento para borrar y actualizar un pensamiento
document.querySelector('#lista ul').addEventListener('click', evt => {
    if (evt.target.className == 'boton-borrar') {
        //let id_pensamiento = evt.target.parentNode.id;
        let id_pensamiento = evt.target.parentElement.getAttribute('id');
        console.log(`El ID de este elemento es: ${evt.target.parentElement.getAttribute('id')}`);
        deleteDataLocalStorage(id_pensamiento);
    }
    else if (evt.target.className == 'boton-modificar') {
        let id_pensamiento = evt.target.parentElement.getAttribute('id');
        let texto_pensamiento = document.querySelector('#respaldo textarea').value;
        updateDataLocalStorage(id_pensamiento, texto_pensamiento);
    }
});

// Functions
function addDataLocalStorage() {
    const boton_anadir_value = document.querySelector('#respaldo textarea').value;

    let dataArray = getDataLocalStorage(); // datos del local storage

    if (dataArray[0] == '') {
        dataArray[0] = boton_anadir_value;
    } else {
        dataArray.push(boton_anadir_value);
    }

    localStorage.setItem('pensamientos', JSON.stringify(dataArray));

    updateList();
}

function getDataLocalStorage() {
    let arrayData = JSON.parse(localStorage.getItem('pensamientos'));
    //arrayData = new Array(arrayData);

    if (arrayData == null) // si esta vacio se crea el array en el local storage y se retorna
    {
        localStorage.setItem('pensamientos', '[]');
        return new Array();
    } else { // en caso contrario se se returna el contenido del array
        return arrayData;
    }

}
function deleteDataLocalStorage(id_pensamiento) {
    let pensamientos = document.querySelectorAll('#lista ul li'); // obtenemos la lista con los pensamientos

    pensamientos = Array.from(pensamientos);

    // removemos el pensamiento
    pensamientos.forEach((element, index) => {
        if (element.getAttribute('id') == id_pensamiento) {
            console.log('el indice: ' + index);
            pensamientos.splice(index, 1);
        }
    });
    // ahora cojemos lo que nos interesa que es el texto
    let a_introducir = new Array();
    pensamientos.forEach((element, index) => {
        a_introducir.push(element.children[0].innerHTML);
    });

    localStorage.setItem('pensamientos', JSON.stringify(a_introducir));
    updateList(); // actualizamos la lista

}
function updateDataLocalStorage(id_pensamiento, texto) {
    let lista_pensamientos = document.querySelectorAll('#lista ul li');
    console.log('se entro');
    lista_pensamientos = Array.from(lista_pensamientos);
    // iteramos la lista_pensamientos para actualizar el pensamiento
    lista_pensamientos.forEach((element, index) => {
        if (element.getAttribute('id') == id_pensamiento) {

            element.children[0].innerHTML = texto;
        }
        // ahora lo actualizamos en el local storage
        let lista_array = new Array();

        lista_pensamientos.forEach( (element,index) =>
        {
            lista_array.push(element.children[0].innerHTML);
        }
        );
        
        localStorage.setItem('pensamientos', JSON.stringify(lista_array));
        updateList(); // actualizamos la lista
        
    });

}




function updateList() {

    // antes de actualizar borramos el anterior contenido de la lista
    if (localStorage.getItem('pensamientos') != null) {
        let lista = document.querySelectorAll('#lista ul li');
        for (let f of lista) {
            f.remove();
        }
    }

    let array_datos = getDataLocalStorage();

    // recorremos los datos de los pensamientos para formar los nodos y meterlos en el html en cada vuelta

    array_datos.forEach((element, vuelta) => {

        // creamos los elementos, nodos y los vamos agregando al html

        let li = document.createElement('li');

        let span = document.createElement('span');
        span.innerHTML = element;

        let input_boton_borrar = document.createElement('input');
        input_boton_borrar.type = 'button'; input_boton_borrar.value = 'X'; input_boton_borrar.className = 'boton-borrar';

        let input_boton_modificar = document.createElement('input');
        input_boton_modificar.type = 'button'; input_boton_modificar.className = 'boton-modificar';

        li.appendChild(span);
        li.appendChild(input_boton_borrar);
        li.appendChild(input_boton_modificar);

        document.querySelector('#lista ul').appendChild(li);
        // asignamos ID a los pensamientos
        let lista_pensamientos = document.querySelectorAll('#lista ul li');
        lista_pensamientos[vuelta].setAttribute('id', vuelta);

        // limpiamos el textarea
        document.querySelector('#respaldo textarea').value = '';
    });

}








