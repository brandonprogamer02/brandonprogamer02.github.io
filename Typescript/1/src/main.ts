// BLOQUE DE MAIN
import { PI } from "./validaciones/fechas"
import {validarFecha} from "./validaciones/fechas"
import * as textos from "./validaciones/textos"

console.log(PI);
console.log('hola');
const main = (): void => {
    //console.log(Validaciones.validarTexto('ho'));
    console.log(validarFecha(new Date()));
    console.log(textos.validarTexto('holapeople'));
    console.log(textos.validarTexto2('holapeople'));

    

}
main();

