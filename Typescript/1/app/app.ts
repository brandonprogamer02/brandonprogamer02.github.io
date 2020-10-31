// mere cabra

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

class Human {
    private nombre:string;
    constructor(nombre:string){
        this.nombre = nombre
    }
    getNombre():string{return this.nombre};
    setNombre(nombre:string):void {this.nombre = nombre}
    
}
const funcion = (humano:Human):void =>{
    console.log(`El nombre es ${humano.getNombre()}`);
}

new Human('El Pepe').getNombre()
// el pepe 11

