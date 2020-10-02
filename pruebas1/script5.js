// destructuring de objetos
const persona1 = {
    nombre: 'juan',
    edad: 12,
    estudios:{
        educacion_superior: [
            'ITLA',
            'INTEC'
        ],
        anos_estudios: 5
    },
    email: 'juanchoelpillo@gmail.com'
}
let f = {nombre, edad,estudios:{educacion_superior}} = persona1;
let array = {estudios:{educacion_superior}} = persona1;
console.log(`${nombre} tiene ${edad} anos de edad e hizo sus estudios en ${educacion_superior}`);
console.log(`El array es:`);
console.log(educacion_superior);

// destructuring de arrays

let array2 = [10,20,30,40,50];
array2 = array2.map((element) => element +20);
let values = [uno,dos,tres,cuatro,cinco] = array2;
console.log(uno,dos,tres,cuatro,cinco);

// creando objeto mediando poo

const objeto = new Object();
objeto.nombre = 'Maryland';
objeto.edad = 12;
delete objeto;

//console.log(objeto);

// usando objetos como si fueran clases
/*
const producto = {
    nombre: 'leche',
    precio: 60,
    disponible: true
}*/

function Producto(nombre,precio)
{
    this.nombre = nombre,
    this.precio = precio
}

let producto1 = new Producto('Nintendo 3ds',4500);
console.log(producto1);

//-------------------------------------------------
// traversing javascript
const body = document.querySelector('body').children;
console.log(body);
