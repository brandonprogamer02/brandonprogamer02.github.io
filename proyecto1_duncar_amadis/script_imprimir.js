let MAESTROS = JSON.parse(localStorage.getItem('maestros'));
let objeto;

MAESTROS.forEach(element => {
    if(element.seleccionado == true)
    {
        console.log(element.seleccionado);
        objeto = element;
    }
});

console.log(objeto);
let infoMaestro= document.querySelectorAll('table tr')[2].children;
//console.log(infoMaestro[0].children[0].textContent);
infoMaestro[0].children[0].textContent = objeto.cedula;
infoMaestro[1].children[0].textContent = objeto.nombre;
infoMaestro[2].children[0].textContent = objeto.apellido;
infoMaestro[3].children[0].textContent = objeto.fechaNacimiento;
infoMaestro[4].children[0].textContent = objeto.foto2x2;
infoMaestro[5].children[0].textContent = objeto.sexo;
infoMaestro[6].children[0].textContent = objeto.descripcion;
infoMaestro[7].children[0].textContent = objeto.foto;
infoMaestro[8].children[0].textContent = objeto.escuela;



