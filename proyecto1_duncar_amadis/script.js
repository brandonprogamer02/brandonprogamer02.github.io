// variables globales

const guardar = document.querySelector('#guardar');
const latitud = document.getElementById('latitud');
const longitud = document.getElementById('longitud');
const fecha = document.getElementById('fecha');
const tipoViolacion = document.getElementById('tipo-violacion');
const correo = document.getElementById('correo');
const comentario = document.getElementById('comentario');

// eventos
guardar.addEventListener('click',() => {

    
/*
    console.log(`latitud : ${latitud.value} , longitud: ${longitud.value}, 
    fecha: ${fecha.value}, tipo de violacion: ${tipoViolacion.value}, correo: ${correo.value}
    ,comentario: ${comentario.value} `);*/
    let array = [latitud,longitud,fecha,tipoViolacion,correo,comentario];
    
    localStorage.setItem('persona1',array);
    
    console.log('los valores del array son:')


   

    /* REAL EJEMPLO DEL METODO FOREACH QUE ES SOLO DEL ARRAY DEL TEAM TRUCKY
    array2.forEach(function(valor,indice) 
    {
        console.log(`indice: ${indice}, valor: ${valor}`)
    });
    */


    //const s = () => { console.log('dfd');}// array functions
    /*
    function nombreFuncion() // funcion normal
    {
        console.log('hola');
    }
    */
    //localStorage.setItem();
    
});

// funciones




