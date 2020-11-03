"use strict";
var notificar = document.querySelector('#notificar');
// Event Listeners
notificar.addEventListener('click', function () {
    Notification
        .requestPermission()
        .then(function (resultado) {
        console.log("El resultado es " + resultado);
    });
    var requestNotification = document;
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
// BLOQUE DE FECHAS
System.register("validaciones/fechas", [], function (exports_1, context_1) {
    "use strict";
    var PI, validarTexto;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("PI", PI = 3.15);
            exports_1("validarTexto", validarTexto = 23);
        }
    };
});
System.register("validaciones/textos", [], function (exports_2, context_2) {
    "use strict";
    var validarTexto, validarTexto2;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            exports_2("validarTexto", validarTexto = function (texto) {
                if (texto.length > 3)
                    return true;
                else
                    return false;
            });
            exports_2("validarTexto2", validarTexto2 = function (texto) {
                if (texto.length > 3)
                    return true;
                else
                    return false;
            });
        }
    };
});
//# sourceMappingURL=main.js.map