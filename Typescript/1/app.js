"use strict";
var Human = /** @class */ (function () {
    function Human(nombre) {
        this.nombre = nombre;
    }
    Human.prototype.getNombre = function () { return this.nombre; };
    return Human;
}());
var arrowFunction = function (humano) {
    console.log('el nombre del humano es ' + humano.getNombre());
};
arrowFunction(new Human('jorge'));
