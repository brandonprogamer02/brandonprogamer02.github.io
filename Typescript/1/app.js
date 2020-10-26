"use strict";
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
//# sourceMappingURL=app.js.map