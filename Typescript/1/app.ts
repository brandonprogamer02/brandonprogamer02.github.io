class Human{
    private nombre:string;
    constructor(nombre:string)
    {
        this.nombre = nombre;
        
    }
    
    
    public getNombre():string { return this.nombre }
 
}
const arrowFunction = (humano:Human) =>{
    console.log('el nombre del humano es ' + humano.getNombre())
}
 
arrowFunction(new Human('jorge'))
