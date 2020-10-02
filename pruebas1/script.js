

function sumador( e )
{
    let result = 0
    e.forEach(element => 
        {
        result+= parseInt(element)
        });
        return "el resultado es:" + result

}





let nombre = "Pedro"
let edad = "18"
let pais = "RD"

let f = `${nombre} tiene ${edad} de edad y vive en ${pais}!`

let arrayNumeros = [12,11,10]

let objeto = 
    {
        nombre: "Chico Billy",
        edad: 18,
        pais: "pr"
    }



let realString = prompt("Introduce los numeros en coma separaos")
realString = String(realString)


let arrayRecibidor = []
let formandoNumber = ''
let x = 0
for (let index = 0; index < realString.length; index++) 
{
    let letra = String(realString.charAt(index))
    if(letra == ",") 
    {
        arrayRecibidor[x] = formandoNumber
        formandoNumber = "";
        x = x +1
        
    }
    else 
    {
        if(index == realString.length -1 )
        {
            formandoNumber += letra
            arrayRecibidor[x] = formandoNumber
        }else
        { 
        formandoNumber =  formandoNumber + letra
      
        }
    }
   
}/*
arrayRecibidor.forEach(element => {
    console.log("* " + element)
});*/

for(const f in arrayRecibidor)
    {
        console.log(arrayRecibidor[f]);
    }

for(const f of arrayRecibidor)
    {
        console.log(f)
    }
//alert("tu resultado es: " + sumador(arrayRecibidor))













