type heroe = {
    nombre:string,
    poderes: string[]
    getNombre:() => string
}

const flash: heroe = {
    nombre:'Barry Allen',
    poderes:['Viajar en el tiempo','Correr rapido'],
    getNombre: () => {
        return '';
    }
}
let vari:any = ():any =>{};

console.log(typeof vari)
const f = (...data:string[] ): string | number=>{
    return data.join('');
}

console.log(f('hola','amigos','como','estan?'));
