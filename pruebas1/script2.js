/*
*Enunciado del ejercicio:
*Crea una clase Libro
*La clase libro tendrá título, autor, año y género.
*Crea un método que devuelva toda la información del libro
*Pide 3 libros y guárdalos en un array
*Los libros se introducirán al arrancar el programa pidiendo los datos con prompt.
*Validar que los campos no se introduzcan vacíos
*Validar que el año sea un número y que tenga 4 dígitos
*Validar que el género sea: aventuras, terror o fantasía
*Crea una función que muestre todos los libros
*Crea una función que muestre los autores ordenados alfabéticamente
*Crea una función que pida un género y muestre la información de los libros 
que pertenezcan a ese género usando un el método que devuelve la información

*/

class Libro
{
    constructor(titulo, autor, ano, genero)
    {
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
        this.genero = genero;
    }
    
    toString()
    {
        return `EL libro ${this.titulo} fue escrito por ${this.autor} en el ano de 
        ${this.ano} y pertenece al genero de ${this.genero}`;
    }
}
function getComas(texto)
{
    let array = [];
    for(const letra in texto)
    {
        if(texto[letra] == ",")
        {
            array.push(parseInt(letra)); 
        }
    }
    return array;
}

function getDataPrompt(texto)
{
    let array =  getComas(texto) // array almacena las posiciones donde esta la ','
    let arrayFinal = [];

    for( var i = 0; i < array.length + 1 ; i++ )
    {
        
        if(i == 0)
        {
            arrayFinal.push(texto.substring(0,array[i]));
            continue;
            
        }
        if(i == array.length )
        {
            
            arrayFinal.push(texto.substring((array[i -1 ] +1) ,texto.length  ))
            
            continue;
        }
        
        arrayFinal.push(texto.substring(array[i -1] +1  ,array[i]))
        
    }
    
    return arrayFinal
}
function isNumeric(value)
{
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function validarNumero(dato) // String
{
    // validar dato numerico
    let numerico = isNumeric(dato);
    let cuatroDigitos = false;
    // validar cuatro digitos
    if(dato.length == 4)
    {
        cuatroDigitos = true;
    }else alert("El ano que introduciste ni tiene 4 digitos cabron!");

    if(numerico == false) alert("No has introducido un numero");
    //---------------------------
    
    if(cuatroDigitos && numerico) return true;
    
    else return false;
}
function validarCampoVacio(campo ) // String
{
    let cantidadVacios = 0;
    for(const f of campo)
    {
        if(f == " ")
        {
            cantidadVacios ++;
        }
    }
    if(cantidadVacios == campo.length) return true;
    else
    { 
        return false;
    }
}
function validarCamposVacios(datos) // parametro tipo array
{
    for(const fe in datos)
    {
        let validacion = validarCampoVacio(datos[fe]);
        if(validacion )
        {
            alert("hay un campo vacio");
            switch(fe)
            {
                case '0': console.log(`Dejaste el campo titulo vacio`);
                
                case '1': console.log(`Dejaste el campo autor vacio`);
                
                case '2': console.log(`Dejaste el campo ano vacio`);
                
                case '3': console.log(`Dejaste el campo genero vacio`);
                 
                return true;
                
            }
            
        }else if(fe == datos.length -1)
        {
            console.log("no hay campos vacios");
            return false;
        }
    }
}
function validarGenero(datos) // String // posicion del array datos
{
    datos = datos.trim();

    switch(datos)
    {
        // aventutas, terror , fantasias
        case "aventuras": console.log("El genero es fantasias"); return true;
        case "terror": console.log("el genero es terror"); return true;
        case "fantasias": console.log("el genero es fantasias"); return true;
        default: alert("El genero que introduciste no es aventuras, terror, fantasias"); return false;
    }
}
function validarTodo(array_datos)
{
    let estaVacio  =validarCamposVacios(array_datos) 
    let validacionNumeros = validarNumero(array_datos[2]);
    let validacionGenero = validarGenero(array_datos[3]);
    console.log(`esta vacio es ${estaVacio}, validacioNumeros es ${validacionNumeros}
    , validacionGenero es ${validacionGenero} !!`);
    if(estaVacio == false && validacionNumeros && validacionGenero)
    {
        return true;
    } else return false;
}
//------------ MAIN -----------------------------------------------------------

let entrada =prompt('Introduce el titulo, autor, ano y genero de tu libro');
let datos = getDataPrompt(entrada);

//let objeto1 = new Libro(datos[0],datos[1],datos[2],datos[3]);
if(validarTodo(datos))
{
    alert("Libro ingresado correctamente!");
}













