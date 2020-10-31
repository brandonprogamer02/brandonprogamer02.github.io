"use strict";
// mere cabra
var flash = {
    nombre: 'Barry Allen',
    poderes: ['Viajar en el tiempo', 'Correr rapido'],
    getNombre: function () {
        return '';
    }
};
var vari = function () { };
console.log(typeof vari);
var f = function () {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    return data.join('');
};
console.log(f('hola', 'amigos', 'como', 'estan?'));
var Human = /** @class */ (function () {
    function Human(nombre) {
        this.nombre = nombre;
    }
    Human.prototype.getNombre = function () { return this.nombre; };
    ;
    Human.prototype.setNombre = function (nombre) { this.nombre = nombre; };
    return Human;
}());
var funcion = function (humano) {
    console.log("El nombre es " + humano.getNombre());
};
new Human('El Pepe').getNombre();
// el pepe 11
//# sourceMappingURL=app.js.map