System.register("validaciones/fechas", [], function (exports_1, context_1) {
    "use strict";
    var PI, validarFecha;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            // BLOQUE DE FECHAS
            exports_1("PI", PI = 3.1416);
            exports_1("validarFecha", validarFecha = function (fecha) {
                if (isNaN(fecha.valueOf())) {
                    return false;
                }
                return true;
            });
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
System.register("main", ["validaciones/fechas", "validaciones/textos"], function (exports_3, context_3) {
    "use strict";
    var fechas_1, fechas_2, textos, main;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (fechas_1_1) {
                fechas_1 = fechas_1_1;
                fechas_2 = fechas_1_1;
            },
            function (textos_1) {
                textos = textos_1;
            }
        ],
        execute: function () {
            console.log(fechas_1.PI);
            console.log('hola');
            main = function () {
                //console.log(Validaciones.validarTexto('ho'));
                console.log(fechas_2.validarFecha(new Date()));
                console.log(textos.validarTexto('holapeople'));
                console.log(textos.validarTexto2('holapeople'));
            };
            main();
        }
    };
});
//# sourceMappingURL=main.js.map