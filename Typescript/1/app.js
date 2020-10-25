"use strict";
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
