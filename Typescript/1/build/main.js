"use strict";
// BLOQUE DE FECHAS
System.register("validaciones/fechas", [], function (exports_1, context_1) {
    "use strict";
    var PI;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("PI", PI = 3.15);
        }
    };
});
// BLOQUE DE MAIN
System.register("main", ["validaciones/fechas"], function (exports_2, context_2) {
    "use strict";
    var fechas_1;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (fechas_1_1) {
                fechas_1 = fechas_1_1;
            }
        ],
        execute: function () {
            console.log(fechas_1.PI);
        }
    };
});
// function consola(constructor: Function) {
//     console.log(constructor)
// }
// @consola
// class Villano{
//     constructor(public nombre:string){
//         console.log('yo estoy volando!!')
//     }
//     volando():void {
//         console.log('yo estoy volando 2 !!')
//     }
//     protected volar:boolean = false;
// }
// export function funcionGenerica<T>(args: T){
//     return args;
// }
// export class Fraccion {
//     public constructor(protected _numerador:number,protected _denominador:number){
//     }
//     public get numerador():number { return this._numerador}
//     public get denominador():number { return this._denominador}
//     public set numerador(numerador:number) { this._numerador = numerador }
//     public set denominador(denominador:number) { 
//         if(denominador < 1){
//             console.log(new Error('EL DENOMINADOR DEBE SER MAYOR A 0'))
//             return;
//         }   
//         this._denominador = denominador
//     }
// }
// export const validarTexto = (texto:string):boolean =>{
//     if(texto.length > 3) return true;
//     else return false;
// }
// export const validarTexto2 = (texto:string):boolean =>{
//     if(texto.length > 3) return true;
//     else return false;
// }
//# sourceMappingURL=main.js.map