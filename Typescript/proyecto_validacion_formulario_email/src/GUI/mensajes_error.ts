import { guiInstance } from '../main'
import * as validaciones from '../Logic/validaciones'
export function mostrarMensajesError(error: string) {

    // este if es para que no se pongan mas de un error
    if (document.querySelector('#mensaje-error') == null) {
        const div = document.createElement('div');
        div.id = 'mensaje-error';
        const span = document.createElement('span');
        span.innerHTML = error;
        div.appendChild(span);
        guiInstance.mainElement.insertBefore(div, guiInstance.mainElement.children[0]);

        guiInstance.boton_enviar.style.backgroundColor = '#BDFBC4;';
        guiInstance.color = '#BDFBC4';
        guiInstance.cursor = 'not-allowed';
        validaciones.setBotonEnviarIsEnabled(false);
    } else {
        document.querySelector('#mensaje-error span').innerHTML = error;
    }
}
export function removerMensajesError() {
    if (document.querySelector('#mensaje-error') != null) {
        document.querySelector('#mensaje-error').remove();
    }

}


