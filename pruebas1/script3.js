let numeros = [10,20,30,40,50,60];
let palabras = ["pc","JavaScript","mouse","automovil"]

// METODOS DE UN ARRAY 

//[.sort] coje una funcion como parametro que es la que sigue como modelo
// los ordena de menor a mayor cuando implementamos el algoritmo a -b y
// de Mayor a Menor con el algoritmo b - a 
// [DEVUELVE EL PROPIO ARRAY]
console.log("Array ordenado de mayor a menor: \n" + numeros.sort((a,b) => b -a)); 
console.log("---------------------------------------------------------")

// [.forEach] aplicau directamente al array; acepta una funcion
// que puede tener 3 parametros: el primero hace referencia al valor,el segundo
// al indice, y el tercerc a todos los elementos del array
// SOLO LECTURA ES DECIR NO SE PUEDE POR EJEMPLO COPIAR SU CONTENIDO EN OTRO ARRAY
// para eso podriamos usar un .map
palabras.forEach((numero,indice,allValues) => console.log(`El indice ${indice} contiene el valor ${numero} `));
console.log("---------------------------------------------------------")
// [.some] devuelve true si se cumple la condicion almenos una vez;
// lo que hace es recorrer el array utilizando como referencia de cada
// vuelta la palabra que pongamos antes del =>
console.log(palabras.some((palabra) => palabra.length > 2));
console.log("---------------------------------------------------------")
// [.every] funciona de manera similar al .some la unica diferencia es 
// que devuelve true si se cumplen la condicion siempre
console.log(palabras.every((palabra) => palabra.length > 3));
console.log("---------------------------------------------------------")

// [.map]se usar para poder crear otro array a partir de otro
// siguiendo un patron

let numeros2= numeros.map( (numero) => numero +3 )
console.log(numeros2);
console.log("-----------------------------------------------------------");

// [.filter] funciona de forma similar al .map per este los copia si 
// el patron que le pongamos es verdadero
let numeros3= numeros.filter((numero) => numero > 20);
console.log('se imprimira lo nuevo cabrones\n' +numeros3);
console.log("-----------------------------------------------------------");

// uso del spreat operator
// copiando un array a otro 
let usuarios = ["Juan","China","Jaime"];
let newUsuarios = ["Ashley","Brandon"];
usuarios.push(...newUsuarios); // uso del spreat operator pa copiar un array a otro
console.log(usuarios);
// hallando max de un array facilmente
const numeros10 = [100,30,110,400];
console.log(Math.max(...numeros,...numeros10));
console.log("-----------------------------------------------------------")
