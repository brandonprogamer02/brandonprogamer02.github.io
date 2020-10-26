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