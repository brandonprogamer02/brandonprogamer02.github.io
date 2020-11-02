System.register("GUI/mensajes_error", ["main", "Logic/validaciones"], function (exports_1, context_1) {
    "use strict";
    var main_1, validaciones;
    var __moduleName = context_1 && context_1.id;
    function mostrarMensajesError(error) {
        // este if es para que no se pongan mas de un error
        if (document.querySelector('#mensaje-error') == null) {
            var div = document.createElement('div');
            div.id = 'mensaje-error';
            var span = document.createElement('span');
            span.innerHTML = error;
            div.appendChild(span);
            main_1.guiInstance.mainElement.insertBefore(div, main_1.guiInstance.mainElement.children[0]);
            main_1.guiInstance.boton_enviar.style.backgroundColor = '#BDFBC4;';
            main_1.guiInstance.color = '#BDFBC4';
            main_1.guiInstance.cursor = 'not-allowed';
            validaciones.setBotonEnviarIsEnabled(false);
        }
        else {
            document.querySelector('#mensaje-error span').innerHTML = error;
        }
    }
    exports_1("mostrarMensajesError", mostrarMensajesError);
    function removerMensajesError() {
        if (document.querySelector('#mensaje-error') != null) {
            document.querySelector('#mensaje-error').remove();
        }
    }
    exports_1("removerMensajesError", removerMensajesError);
    return {
        setters: [
            function (main_1_1) {
                main_1 = main_1_1;
            },
            function (validaciones_1) {
                validaciones = validaciones_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("Logic/validaciones", ["main", "GUI/mensajes_error"], function (exports_2, context_2) {
    "use strict";
    var main_2, mensajes_error, validacionCantidadCaracteresPara, validacionCantidadCaracteresAsunto, validacionCantidadCaracteresMensaje, validacionEmail, botonEnviarIsEnabled, setBotonEnviarIsEnabled;
    var __moduleName = context_2 && context_2.id;
    function validarCampos(e) {
        if (e.target.id == 'para') // validacion para el textarea para
         {
            validarCamposPara(e);
        }
        //----------------------------------------------------------------------------------------------
        else if (e.target.id == 'asunto') //validacion para el textarea asunto
         {
            validarCampoAsunto(e);
        }
        //----------------------------------------------------------------------------------------------
        else if (e.target.id == 'mensaje') // validacion para el textarea mensaje
         {
            validarCampoMensaje(e);
        }
        //------------------------------------------------------------------------------------------------
        if (validacionCantidadCaracteresPara
            && validacionCantidadCaracteresAsunto
            && validacionCantidadCaracteresMensaje
            && validacionEmail) // validar todo
         {
            //boton_enviar.setAttribute('disabled','false');
            main_2.guiInstance.cursor = 'pointer';
            main_2.guiInstance.color = '#32DB40';
            // boton_enviar.style = 'background-color: #32DB40; color: white';
            main_2.guiInstance.boton_enviar.style.backgroundColor = '#32DB40';
            main_2.guiInstance.boton_enviar.style.color = 'white';
            console.log('entro en validacion correctas!');
            exports_2("botonEnviarIsEnabled", botonEnviarIsEnabled = true);
        }
    }
    exports_2("validarCampos", validarCampos);
    function validarCamposPara(e) {
        if (e.target.value.length > 5) // validamos que cantidad de caracteres sea superior a 5
         {
            validacionCantidadCaracteresPara = true;
            e.target.style = 'border: 1.6px solid green';
            // validamos que sea un email valido
            if (validar_email(e.target.value) == true) {
                validacionEmail = true;
                e.target.style = 'border: 1.6px solid green';
                mensajes_error.removerMensajesError();
            }
            else {
                validacionEmail = false;
                e.target.style = 'border: 1.6px solid red';
                mensajes_error.mostrarMensajesError('EL EMAIL NO ES VALIDO');
            }
        }
        else {
            e.target.style = 'border: 1.6px solid red';
            validacionCantidadCaracteresPara
                = false;
            mensajes_error.mostrarMensajesError('LA LONGITUD DEL EMAIL DEBE SER MAYOR A 6');
        }
    }
    function validarCampoAsunto(e) {
        if (e.target.value.length > 5) // validamos que cantidad de caracteres sea superior a 5
         {
            validacionCantidadCaracteresAsunto = true;
            e.target.style = 'border: 1.6px solid green';
            mensajes_error.removerMensajesError();
        }
        else {
            e.target.style = 'border: 1.6px solid red';
            validacionCantidadCaracteresAsunto = false;
            mensajes_error.mostrarMensajesError('LA LONGITUD DEL ASUNTO DEBE SER MAYOR A 6');
        }
    }
    function validarCampoMensaje(e) {
        if (e.target.value.length > 10) // validamos que cantidad de caracteres sea superior a 10
         {
            validacionCantidadCaracteresMensaje
                = true;
            e.target.style = 'border: 1.6px solid green';
            mensajes_error.removerMensajesError();
        }
        else {
            e.target.style = 'border: 1.6px solid red';
            validacionCantidadCaracteresMensaje
                = false;
            mensajes_error.mostrarMensajesError('LA LONGITUD DEL MENSAJE DEBE SER MAYOR A 10');
        }
    }
    function validar_email(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    return {
        setters: [
            function (main_2_1) {
                main_2 = main_2_1;
            },
            function (mensajes_error_1) {
                mensajes_error = mensajes_error_1;
            }
        ],
        execute: function () {
            exports_2("botonEnviarIsEnabled", botonEnviarIsEnabled = false);
            exports_2("setBotonEnviarIsEnabled", setBotonEnviarIsEnabled = function (value) { exports_2("botonEnviarIsEnabled", botonEnviarIsEnabled = value); });
        }
    };
});
System.register("GUI/Gui", ["Logic/validaciones"], function (exports_3, context_3) {
    "use strict";
    var validaciones_2, Gui;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (validaciones_2_1) {
                validaciones_2 = validaciones_2_1;
            }
        ],
        execute: function () {
            Gui = /** @class */ (function () {
                function Gui() {
                    this.textarea_para = document.querySelector('#para');
                    this.textarea_asunto = document.querySelector('#asunto');
                    this.textarea_mensaje = document.querySelector('#mensaje');
                    this.boton_enviar = document.querySelector('#enviar');
                    this.mainElement = document.querySelector('main');
                    this.initEvents();
                }
                Gui.prototype.initEvents = function () {
                    var _this = this;
                    this.boton_enviar.addEventListener('mouseover', function () {
                        //boton_enviar.style= `cursor: ${cursor}; background: ${color}; color: white`;
                        _this.boton_enviar.style.cursor = _this.cursor;
                        _this.boton_enviar.style.background = _this.color;
                        _this.boton_enviar.style.color = 'white';
                    });
                    this.boton_enviar.addEventListener('click', function () {
                        if (validaciones_2.botonEnviarIsEnabled) {
                            alert('EMAI ENVIADO!');
                        }
                    });
                    this.textarea_para.addEventListener('blur', validaciones_2.validarCampos);
                    this.textarea_asunto.addEventListener('blur', validaciones_2.validarCampos);
                    this.textarea_mensaje.addEventListener('blur', validaciones_2.validarCampos);
                };
                return Gui;
            }());
            exports_3("Gui", Gui);
        }
    };
});
System.register("main", ["GUI/Gui"], function (exports_4, context_4) {
    "use strict";
    var Gui_1, guiInstance;
    var __moduleName = context_4 && context_4.id;
    function main() {
        exports_4("guiInstance", guiInstance = new Gui_1.Gui());
    }
    return {
        setters: [
            function (Gui_1_1) {
                Gui_1 = Gui_1_1;
            }
        ],
        execute: function () {
            main();
        }
    };
});
//# sourceMappingURL=main.js.map