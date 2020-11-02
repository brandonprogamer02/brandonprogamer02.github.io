import { guiInstance } from '../main'
import * as mensajes_error from '../GUI/mensajes_error'
let validacionCantidadCaracteresPara: boolean;
let validacionCantidadCaracteresAsunto: boolean;
let validacionCantidadCaracteresMensaje: boolean;
let validacionEmail: boolean;
export let botonEnviarIsEnabled: boolean = false;
export const setBotonEnviarIsEnabled = (value: boolean):void => { botonEnviarIsEnabled = value }

export function validarCampos(e: any) {
    if (e.target.id == 'para')// validacion para el textarea para
    {
        validarCamposPara(e);
    }
    //----------------------------------------------------------------------------------------------
    else if (e.target.id == 'asunto') //validacion para el textarea asunto
    {
        validarCampoAsunto(e)
    }
    //----------------------------------------------------------------------------------------------
    else if (e.target.id == 'mensaje') // validacion para el textarea mensaje
    {
        validarCampoMensaje(e)
    }
    //------------------------------------------------------------------------------------------------
    if (validacionCantidadCaracteresPara
        && validacionCantidadCaracteresAsunto
        && validacionCantidadCaracteresMensaje
        && validacionEmail) // validar todo
    {
        //boton_enviar.setAttribute('disabled','false');
        guiInstance.cursor = 'pointer';
        guiInstance.color = '#32DB40';
        // boton_enviar.style = 'background-color: #32DB40; color: white';
        guiInstance.boton_enviar.style.backgroundColor = '#32DB40';
        guiInstance.boton_enviar.style.color = 'white';

        console.log('entro en validacion correctas!');
        botonEnviarIsEnabled = true;

    }
}

function validarCamposPara(e: any) {
    if (e.target.value.length > 5) // validamos que cantidad de caracteres sea superior a 5
    {
        validacionCantidadCaracteresPara = true;
        e.target.style = 'border: 1.6px solid green';
        // validamos que sea un email valido
        if (validar_email(e.target.value) == true) {
            validacionEmail = true;
            e.target.style = 'border: 1.6px solid green';
            mensajes_error.removerMensajesError();

        } else {
            validacionEmail = false;
            e.target.style = 'border: 1.6px solid red';
            mensajes_error.mostrarMensajesError('EL EMAIL NO ES VALIDO');
        }

    } else {
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
    } else {
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
    } else {
        e.target.style = 'border: 1.6px solid red';
        validacionCantidadCaracteresMensaje
            = false;
        mensajes_error.mostrarMensajesError('LA LONGITUD DEL MENSAJE DEBE SER MAYOR A 10');
    }
}
function validar_email(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

